import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './config/Routes';

import '../public/styles/style.less';

ReactDOM.render(
    <Routes />,
    document.getElementById('app')
);