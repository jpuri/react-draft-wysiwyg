/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import '../css/fonts.css'; // eslint-disable-line no-unused-vars
import '../css/normalize.css'; // eslint-disable-line no-unused-vars
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // eslint-disable-line no-unused-vars
import {
    App,
    Home,
    Demo,
    Docs,
    Author,
} from './components';

ReactDOM.render(<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="/demo" component={Demo} />
    <Route path="/docs" component={Docs} />
    <Route path="/author" component={Author} />
    <IndexRoute component={Home} />
  </Route>
</Router>, document.getElementById('app')); // eslint-disable-line no-undef
