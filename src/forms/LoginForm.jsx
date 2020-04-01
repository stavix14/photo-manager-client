import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import "./forms.css";

const LoginForm = ({ email, password, errors, loading, registrationSucceded, onChange }) => (
        <Form className="form-wrapper" loading={loading}>
            {errors.global && (
                <Message 
                    negative
                    header="Something went wrong"
                    content={errors.global}
                />
            )}
            {registrationSucceded && (
                <Message
                    positive
                    header="You have successfully registered!"
                    content="Log in to start enjoying our app!"
                />
            )}
            <Form.Input 
                type="email"
                name="email"
                label="Email"
                placeholder="example@example.com"
                error={errors.email}
                value={email}
                onChange={onChange}
                required
            />
            <Form.Input 
                type="password"
                name="password"
                label="Password"
                placeholder="Here comes your password"
                error={errors.password}
                value={password}
                onChange={onChange}
                required
            />
        </Form>
    );

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    registrationSucceded: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default LoginForm;