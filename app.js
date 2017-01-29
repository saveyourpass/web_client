import ReactDOM from 'react-dom';
import React from 'react';
import Element from './src/MainView'
import MyAccount from './src/MyAccount'
import CrypticoElement from './src/CrypticoElement'
import MyPasswords from  './src/MyPasswords'
import {Router, Route, IndexRoute, browserHistory} from "react-router";


ReactDOM.render(
  <Router history = {browserHistory}>
      <Route path ='/' component={Element}/>
      <Route path = "/account" component = {MyAccount}/>
      <Route path = "/test" component = {MyPasswords}/>
  </Router>, document.getElementById('app')
);