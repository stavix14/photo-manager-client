import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";

const App = () => (
    <div className="ui container">
        <Route path="/" exact component={LoginPage} />
        <Route path="/feed" exact component={FeedPage} />
    </div>
);

export default App;
