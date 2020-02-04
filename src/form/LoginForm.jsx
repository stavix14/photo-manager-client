import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import InlineError from "../messages/InlineError";

const LoginForm = props => {
    const { email, password, errors, loading, onChange } = props;

    return (
        <Form loading={loading}>
            {errors.global && (
                <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            )}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
            <Form.Field error={!!errors.password}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Here comes your password..."
                    value={password}
                    onChange={onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
        </Form>
    );
};

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default LoginForm;