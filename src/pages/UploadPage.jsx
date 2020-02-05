import React from 'react';
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
        const errors = this.validate(data);
        let formData = new FormData();
        let response;

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            Object.keys(data).map(key => {
                if (key === "selectedImage") {
                    formData.append("imageName", "pm-image-" + Date.now());
                }
                formData.append(key, data[key]);
            });
            this.setState({ loading: true });

            response = await this.submitFormData(formData);

            if (Object.keys(this.state.errors).length === 0) {
                this.setState({ loading: false });

                //Do confirmation message that everything was fine
                //after submit make a button to redirect to feed page
                //take the username from the router and pass it to the database alongside the rest of the data
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
                <UploadForm
                    formValues={data}
                    errors={errors}
                    loading={loading}
                    onChange={this.onChange}
                    addTags={this.addTags}
                    onImageSelect={this.onImageSelect}
                    onSubmit={() => this.onSubmit(data)} //after submit make a button to redirect to feed page

                />
                <Chip tags={data.tags} />
            </React.Fragment>
        );
    }
}

export default UploadPage;