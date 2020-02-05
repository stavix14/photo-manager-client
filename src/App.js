import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import UploadPage from "./pages/UploadPage";

const App = () => (
    <div className="ui container">
        <Route path="/" exact component={LoginPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/upload" exact component={UploadPage} />
    </div>
);

export default App;
