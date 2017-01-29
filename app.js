import ReactDOM from 'react-dom';
import React from 'react';
import Element from './src/MainView'
import MyAccount from './src/MyAccount'
import Register from './src/Register'
import MyPasswords from  './src/MyPasswords'
import {Router, Route, IndexRoute, browserHistory} from "react-router";


ReactDOM.render(
  <Router history = {browserHistory}>
      <Route path ='/' component={Element}/>
      <Route path = "/account" component = {MyAccount}/>
      <Route path = "/test" component = {MyPasswords}/>
      <Route path = '/register' component = {Register}/>
  </Router>, document.getElementById('app')
);