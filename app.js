import ReactDOM from 'react-dom';
import React from 'react';
import Element from './src/MainView'
import MyAccount from './src/MyAccount'
import CrypticoElement from './src/CrypticoElement'
import {Router, Route, IndexRoute, browserHistory} from "react-router";


ReactDOM.render(
  <Router history = {browserHistory}>
      <Route path ='/' component={Element}/>
      <Route path = "/account" component = {MyAccount}/>
      <Route path = "/test" component = {CrypticoElement}/>
  </Router>, document.getElementById('app')
);