/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import {
    App,
    Home,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
} from './components';
import styles from '../../css/normalize.css'; // eslint-disable-line no-unused-vars

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/demo1" component={Demo1} />
    <Route path="/demo2" component={Demo2} />
    <Route path="/demo3" component={Demo3} />
    <Route path="/demo4" component={Demo4} />
    <IndexRoute component={Home} />
  </Route>
</Router>, document.getElementById('app')); // eslint-disable-line no-undef
