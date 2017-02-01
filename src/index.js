import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './config/Routes';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/animate.css/animate.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../public/styles/style.less';

ReactDOM.render(
    <Routes />,
    document.getElementById('app')
);