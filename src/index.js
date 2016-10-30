/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import '../css/normalize.css'; // eslint-disable-line no-unused-vars
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // eslint-disable-line no-unused-vars
import {
    App,
    Home,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
} from './components';

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/react-draft-wysiwyg/" component={App}>
    <Route path="/demo1" component={Demo1} />
    <Route path="/demo2" component={Demo2} />
    <Route path="/demo3" component={Demo3} />
    <Route path="/demo4" component={Demo4} />
    <IndexRoute component={Home} />
  </Route>
</Router>, document.getElementById('app')); // eslint-disable-line no-undef
