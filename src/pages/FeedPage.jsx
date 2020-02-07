import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Header, Message } from 'semantic-ui-react'
import CardDisplay from "../cards/CardDisplay";
import ErrorPage from "../pages/ErrorPage";
import api from "../api";
import { sortAscending } from "../utils/utils";

class FeedPage extends React.Component {
    state = {
        data: {
            comment: '',
            rating: 0
        },
        imagePosts : [],
        errors: {}
    };

    async componentDidMount() {
        const username = sessionStorage.getItem("username");
    
        if (username) {
            try {
                const response = await api.getImages();
                this.setState({ imagePosts: response.imagePosts });
            }
            catch(err) {
                this.setState({ errors: err.response.data.errors })
            }
        }
    };

    onChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        })
    }

    // first parameter is no use here, but the second one is required
    onRate = (e, data) => {
        const { rating } = data;

        this.setState({
            data: {...this.state.data, rating }
        });
    }

    // validate data
    onSubmit = async (data, id) => {
        const errors = this.validate(data.comment);

        this.setState({ errors: {...errors, id} });
        if(Object.keys(errors).length === 0) {
            const username = sessionStorage.getItem("username");
            const postComment = {...data, id, username};
            try {
                await this.submitFormData(postComment);

                const response = await api.getImages();
                this.setState({ imagePosts: response.imagePosts,
                    data: {comment: "", rating: 0}
                });
            }
            catch (err) {
                console.error(err); //have to rethink this whole try and catch with the one below
            }
        }
        
    }

    onSort = (e, { value }) => {
        let sortedPosts;

        if (value) {
            sortedPosts = this.state.imagePosts.slice().sort((a, b) => sortAscending(a, b, "date"));
        }
        else {
            sortedPosts = this.state.imagePosts.slice().sort((a, b) => sortAscending(a, b, "location"));
        }
        this.setState({ imagePosts: sortedPosts });
    }

    submitFormData = async postComment => {
        try {
            return await api.postComment(postComment);
            }
        catch (err) {
            this.setState({ errors: err.response.data.errors })
        }
    }

    validate = comment => {
        const errors = {}

        if (!comment.trim()) {
            errors.comment = "You cannot post an empty comment!"
        }

        return errors;
    }

    render() {
        const { data, imagePosts, errors } = this.state;
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
        if (!imagePosts.length) {
            return (
                <React.Fragment>
                    <Button 
                        primary
                        as={Link}
                        to='/upload'
                        content="Upload a picture"
                        labelPosition="left"
                        icon="reply"
                    />
                    <Header>No pictures for you! Upload one above and enjoy the new Instagram!</Header>
                </React.Fragment>
            )
        }
        return(
            <div>
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
                    {imagePosts.map(post => 
                        <CardDisplay
                            key={post._id} 
                            id={post._id}
                            data={post}
                            inputData={data}
                            errors={errors}
                            onSubmit={() => this.onSubmit(data, post._id)}
                            onChange={this.onChange}
                            onRate={this.onRate}
                        />
                    )}
            </div>
        );
    };
}

export default FeedPage;