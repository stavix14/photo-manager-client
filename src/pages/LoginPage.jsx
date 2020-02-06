import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import LoginForm from "../forms/LoginForm";
import api from "../api";

class LoginPage extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {},
        registrationSucceded: false, 
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    
    onSubmit = async (credentials, path) => {
        const errors = this.validate(credentials);

        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            const response = await this.submitFormData(this.state.data, path);

            if (response) {
                if (response.registrationSucceded) {
                    this.setState({ registrationSucceded: true, loading: false });
                }
                else {
                    this.props.history.push({
                        pathname: "/feed",
                        state: {
                            username: response.user.email,
                        }
                    });
                }
            }
        }
    }

    submitFormData = async (credentials, path) => {
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
        const { data, errors, loading, registrationSucceded } = this.state;
        const path = ["auth", "register"];

        return (
            <React.Fragment>
                <LoginForm
                    email={data.email}
                    password={data.password}
                    errors={errors}
                    loading={loading}
                    registrationSucceded={registrationSucceded}
                    onChange={this.onChange}
                />
                <div style={{ textAlign: "center", marginTop: "2em"}}>
                    <Button.Group>
                        <Button onClick={() => this.onSubmit(data, path[0])} color="instagram"  labelPosition="left" content="Sign In" icon="sign in" />
                        <Button.Or />
                        <Button onClick={() => this.onSubmit(data, path[1])} positive labelPosition="right" content="Sign Up" icon="angle double up" />
                    </Button.Group>
                </div>
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