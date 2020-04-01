import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
import "./ErrorPage.css";

const ErrorPage = () => (
    <div className="error-page-wrapper">
        <Header className="forbidden-access-header" as='h2' icon>
            <Icon name='settings' />
                Access forbidden!
            <Header.Subheader>
                Oops. You are not allowed to view this page unless you login.
            </Header.Subheader>
        </Header>
        <Button
            primary
            content="Go to Login Page"
            labelPosition="left"
            icon="reply"
            as={Link} 
            to="/"
        />
    </div>
);

export default ErrorPage;