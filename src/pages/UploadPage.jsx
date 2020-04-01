import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import UploadForm from '../forms/UploadForm';
import Chip from '../miscellaneous/Chip';
import ErrorPage from "./ErrorPage";
import { validateDate, validateImage } from "../utils/validate";
import api from "../api";
import "./UploadPage.css"


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
        errors: {},
        submitSuccess: false,
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
        const username = sessionStorage.getItem("username");
        const errors = this.validate(data);
        let formData = new FormData();

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            Object.keys(data).map(key => {
                if (key === "selectedImage") {
                    formData.append("imageName", "pm-image-" + Date.now());
                }
                formData.append(key, data[key]);
            });
            formData.append("username", username);
            this.setState({ loading: true });

            try {
                await api.imageForm(formData);
                this.setState({ submitSuccess: true, loading: false,
                    data: {location: '', date: '', description: '', tags: [], selectedImage: null} });
            }
            catch (error) {
                this.setState({ errors: error.response.data.errors, loading: false });
            }
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
        const { data, errors, loading, submitSuccess } = this.state;

        if (!sessionStorage.token) {
            return <ErrorPage />
        }
        return (
            <div className="upload-page-wrapper">
                <Button
                    className="go-to-feed"
                    primary
                    as={Link} 
                    to='/feed'
                    content="Go to Feed"
                    labelPosition="left"
                    icon="reply"
                />
                <UploadForm
                    formValues={data}
                    errors={errors}
                    loading={loading}
                    onChange={this.onChange}
                    addTags={this.addTags}
                    onImageSelect={this.onImageSelect}
                    onSubmit={() => this.onSubmit(data)}
                    submitSuccess={submitSuccess}

                />
                {data.tags.map((tag, index) => <Chip key={index} tag={tag} /> )}
            </div>
        );
    }
};

export default UploadPage;