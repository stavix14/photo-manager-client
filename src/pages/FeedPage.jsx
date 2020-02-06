import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react'
import CardDisplay from "../cards/CardDisplay";
import api from "../api";

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
        const { username } = this.props.location.state;

        if (username) {
            const imagePosts = await api.getImages();
            this.setState({ imagePosts });
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
        console.log(errors);

        this.setState({ errors: {...errors, id} });
        if(Object.keys(errors).length === 0) {
            const { username } = this.props.location.state;
            const postComment = {...data, id, username};
            const response = await this.submitFormData(postComment);

            if (response.success) {
                const imagePosts = await api.getImages();
                this.setState({ imagePosts,
                    data: {comment: "", rating: 0}
                });
            }
        }
        
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
        console.log(imagePosts[1]);

        if (!imagePosts.length) {
            return (
                <React.Fragment>
                    <Button
                    primary
                    as={Link} 
                    to={{pathname: '/upload',
                        state: {
                            username: this.props.location.state.username
                        }
                    }}
                >
                    Upload picture
                </Button>
                    <Header>No pictures for you! Upload one above and enjoy the new Instagram!</Header>
                </React.Fragment>
            )
        }
        return(
            <div>
                {/* icon for button */}
                    <Button
                    primary
                    as={Link} 
                    to={{pathname: '/upload',
                        state: {
                            username: this.props.location.state.username
                        }
                    }}
                >
                    Upload picture
                </Button>
                {imagePosts.map(post => 
                    <CardDisplay
                        key={post._id} 
                        id={post._id}
                        location={post.location}
                        date={post.date}
                        description={post.description}
                        tags={post.tags}
                        comments={post.comments}
                        ratings={post.rating}
                        username={post.username}
                        imageName={post.imageName}
                        inputData={data}
                        errors={errors}
                        onSubmit={() => this.onSubmit(data, post._id)}
                        onChange={this.onChange}
                        onRate={this.onRate}
                    />)}
            </div>
        );
    };
}

export default FeedPage;