import ReactDOM from 'react-dom';
import React from 'react';
import Element from './src/MainView'
import MyAccount from './src/MyAccount'
import {Router, Route, IndexRoute, browserHistory} from "react-router";


ReactDOM.render(
  <Router history = {browserHistory}>
      <Route path ='/' component={Element}/>
      <Route path = "/account" component = {MyAccount}/>
  </Router>, document.getElementById('app')
);