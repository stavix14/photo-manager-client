import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import UploadForm from '../forms/UploadForm';
import Chip from '../miscellaneous/Chip';
import { validateDate, validateImage } from "../utils/validate";
import api from "../api";


class UploadPage extends React.Component {
    state = {
        data: {
            location: '',
            date: '',
            description: '',
            tags: [],
            selectedImage: null
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onImageSelect = e => 
        this.setState({
            data: {...this.state.data,
                selectedImage: e.target.files[0]
            }
        });

    onSubmit = async data => {
        const { username } = this.props.location.state;
        const errors = this.validate(data);
        let formData = new FormData();

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            Object.keys(data).map(key => {
                if (key === "selectedImage") {
                    formData.append("imageName", "pm-image-" + Date.now());
                }
                return formData.append(key, data[key]); //check if works
            });
            formData.append("username", username);
            this.setState({ loading: true });

            const response = await this.submitFormData(formData);

            if (Object.keys(this.state.errors).length === 0) {
                this.setState({ loading: false });

                //Do confirmation message that everything was fine
                //after submit make a button to redirect to feed page
            }

        }
    }

    submitFormData = async formData => {
        try {
            return await api.imageForm(formData);
            }
        catch (err) {
            this.setState({ errors: err.response.data.errors, loading: false })
        }
    }

    addTags = e => {
        const tag = e.target.value.trim();

        if (e.key === " " && tag !== "") {
            this.setState({
                data: { ...this.state.data,
                    tags: [...this.state.data.tags, tag]
                }
            });
            e.target.value = "";
        }
    }

    validate = data => {
        const errors = {};
        // eslint-disable-next-line
        const isNum = /^\d+$/i;
        const dateErrors = validateDate(data.date);
        const imageErrors = validateImage(data.selectedImage);

        if (!data.location.trim() || isNum.test(data.location)) {
            errors.location = "Invalid location";  //basic validation
        }
        if(dateErrors) {
            errors.date = dateErrors;
        }
        if (!data.description.trim()) {
            errors.description = "Invalid description"
        }
        if (data.tags.length === 0) {
            errors.tags = "At least 1 tag is required";
        }
        if (imageErrors) {
            errors.selectedImage = imageErrors;
        }

        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;

        return (
            <React.Fragment>
                <Button
                    primary
                    as={Link} 
                    to={{pathname: '/feed',
                        state: {
                            username: this.props.location.state.username
                        }
                    }}
                >
                    Go to Feed
                </Button>
                <UploadForm
                    formValues={data}
                    errors={errors}
                    loading={loading}
                    onChange={this.onChange}
                    addTags={this.addTags}
                    onImageSelect={this.onImageSelect}
                    onSubmit={() => this.onSubmit(data)} //after submit make a button to redirect to feed page

                />
                {data.tags.map((tag, index) => <Chip key={index} tag={tag} /> )}
            </React.Fragment>
        );
    }
}

UploadPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default UploadPage;