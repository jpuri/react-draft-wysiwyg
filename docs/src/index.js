/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import {
    App,
    Home,
} from './components';
import styles from '../css/normalize.css'; // eslint-disable-line no-unused-vars

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
</Router>, document.getElementById('app')); // eslint-disable-line no-undef
