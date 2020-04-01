import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Header, Loader, Message } from "semantic-ui-react";
import CardDisplay from "../cards/CardDisplay";
import ErrorPage from "../pages/ErrorPage";
import api from "../api";
import { sortAscending } from "../utils/utils";
import "./FeedPage.css";

class FeedPage extends React.Component {
  state = {
    data: [],
    imagePosts: [],
    errors: {},
    loading: false
  };

    async componentDidMount() {    
        try {
            this.setState({ loading: true});
            const response = await api.getImages();
            response.imagePosts = response.images; // will change imagePosts with images everywhere
            this.setState({ imagePosts: response.imagePosts });
            this.addInputState(response.imagePosts);
            this.setState({ loading: false});
        }
        catch(err) {
            this.setState({ errors: err.response.data.errors, loading: false });
        }
    };

  // first parameter is no use here, but the second one is required
  onRate = (e, { rating }, index) => {
    let { data } = this.state;
    data[index] = { ...this.state.data[index], rating };
    this.setState({ data });
  };

  onSubmit = async (data, id) => {
    const errors = this.validate(data.comment);
    this.setState({ errors: { ...errors, id } });

    if (Object.keys(errors).length === 0) {
      const username = sessionStorage.getItem("username");
      const postComment = { ...data, id, username };

      try {
        const response = await api.postComment(postComment);
        const { imagePosts } = this.state;

        imagePosts.forEach(post => {
          if (post._id === response.id) {
            post.comments = [...post.comments, response.newComment];
            post.rating = [...post.rating, response.newRating];
          }
        });
        this.setState({ imagePosts });
      } catch (err) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  };

  onSort = (e, { value }) => {
    let sortedPosts;

    if (value) {
      sortedPosts = this.state.imagePosts
        .slice()
        .sort((a, b) => sortAscending(a, b, "date"))
        .reverse();
    } else {
      sortedPosts = this.state.imagePosts
        .slice()
        .sort((a, b) => sortAscending(a, b, "location"));
    }
    this.setState({ imagePosts: sortedPosts });
  };

  addInputState = imagePosts => {
    if (imagePosts.length > 0) {
      imagePosts.forEach(() => {
        this.setState(prevState => ({
          data: [...prevState.data, { comment: "", rating: 0 }]
        }));
      });
    }
  };

  validate = comment => {
    const errors = {};

    if (!comment.trim()) {
      errors.comment = "You cannot post an empty comment!";
    }

    return errors;
  };

    render() {
        const { data, imagePosts, errors, loading } = this.state;
        const sortOptions = [
            {
                key: "location",
                text: "By Location",
                value: 0
            },
            {
                key: "date",
                text: "By Date",
                value: 1
            }
        ];

        if (!sessionStorage.token) {
            return <ErrorPage />
        }
        if (errors.global) {
            return (<Message 
                negative
                header="Something went wrong"
                content={errors.global}
            />);
        }
        if (loading) {
            return <Loader active />
        }
        if (!imagePosts.length) {
            return (
                <div className="no-images-wrapper">
                    <Header>No pictures for you! Upload one above and enjoy the new Instagram!</Header>
                    <Button 
                        primary
                        as={Link}
                        to='/upload'
                        content="Upload a picture"
                        labelPosition="left"
                        icon="reply"
                    />
                </div>
            )
        }
        return(
            <div className="feed-page-wrapper">
                <div className="button-wrapper">
                    <Button 
                        primary
                        as={Link}
                        to='/upload'
                        content="Upload a picture"
                        labelPosition="left"
                        icon="reply"
                        floated='right'
                    />
                    <Dropdown
                        text='Filter Posts'
                        icon='filter'
                        floating
                        labeled
                        button
                        options={sortOptions}
                        onChange={this.onSort}
                        className='icon'
                    />
                </div>
                    {imagePosts.map((post, index) => {
                        return (<CardDisplay
                            key={post._id} 
                            id={post._id}
                            data={post}
                            inputData={data[index]}
                            errors={errors}
                            onSubmit={() => this.onSubmit(data[index], post._id)}
                            onChange={e => this.onChange(e, index)}
                            onRate={(e, data) => this.onRate(e, data, index)}
                        />)}
                    )}
            </div>
        );
    };
}

export default FeedPage;
