import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';

import LandingPage from '../components/landingPage/LandingPage';

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={LandingPage} />
            </Router>
        )
    }
}

export default Routes