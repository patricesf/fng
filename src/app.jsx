require("../styl/app.styl");

import React from 'react';
import {history} from 'react-router/lib/HashHistory.js';
import {Router, Route, Link, Redirect } from 'react-router';

import Home from './Home';

React.render((
    <Router history={history}>
        <Route path="/" component={Home}/>
  </Router>
), document.getElementById("app"));

