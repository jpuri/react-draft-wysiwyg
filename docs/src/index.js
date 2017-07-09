/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import '../css/fonts.css'; // eslint-disable-line no-unused-vars
import '../css/normalize.css'; // eslint-disable-line no-unused-vars
import {
    App,
    Home,
    Demo,
    Docs,
    Author,
} from './components';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // eslint-disable-line no-unused-vars

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/demo" component={Demo} />
    <Route path="/docs" component={Docs} />
    <Route path="/author" component={Author} />
    <IndexRoute component={Home} />
  </Route>
</Router>, document.getElementById('app')); // eslint-disable-line no-undef
