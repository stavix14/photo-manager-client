import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import LoginForm from "../form/LoginForm";
import api from "../api";

class LoginPage extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    
    onSubmit = async (credentials, path, registration) => {
        const errors = this.validate(credentials);
        let response;

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            response = await this.submit(this.state.data, path);

            if (Object.keys(this.state.errors).length === 0) {
                this.props.history.push({
                    pathname: "/feed",
                    state: {
                        username: response.user.email,
                        registration
                    }
                });
            }
        }
    }

    submit = async (credentials, path) => {
        try {
            return await api.auth(credentials, path);
            }
        catch (err) {
            this.setState({ errors: err.response.data.errors, loading: false })
        }
    }

    validate = data => {
        const errors = {};
        // eslint-disable-next-line
        const isEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

        if (!isEmailRegex.test(data.email)) {
            errors.email = "Invalid email addres!";
        }
        if (!data.password) {
            errors.password = "Password field can't be empty!";
        }
        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        const path = ["auth", "register"];

        return (
            <React.Fragment>
                <LoginForm
                    email={data.email}
                    password={data.password}
                    errors={errors}
                    loading={loading}
                    onChange={this.onChange}
                />
                <Button onClick={() => this.onSubmit(data, path[0], false)} color="instagram">Sign In</Button>
                <span>OR</span>
                <Button onClick={() => this.onSubmit(data, path[1], true)}>Sign Up</Button>
            </React.Fragment>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default LoginPage;