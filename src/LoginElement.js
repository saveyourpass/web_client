import React from 'react'
import * as axios from "axios";
import {Link, browserHistory, push} from 'react-router'


export default class LoginElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "j",
      password: "p"
    };
    this.deleteToken = this.deleteToken.bind(this);
    this.newFunc = this.newFunc.bind(this);
    this.userNameChange = this.userNameChange.bind(this);//deklaracja
    this.passwordChange = this.passwordChange.bind(this);
    this.tryToLogIn = this.tryToLogIn.bind(this);
    this.server = axios.create({baseURL: "http://localhost:8080/"});
  }
  deleteToken(){
      localStorage.setItem("token" , JSON.stringify({"token":""}));
  }
  tryToLogIn(event){
      var usernameToStore = this.state.userName;
    this.server.post("http://localhost:8080/api/user/login", {
        username: this.state.userName,
        password: this.state.password
    }).then(function (response) {
            sessionStorage.setItem("token", JSON.stringify(response.data));
            console.log(JSON.parse(sessionStorage.getItem("token")).token);
            sessionStorage.setItem("currentUser", JSON.stringify({"key" : usernameToStore}));
            browserHistory.push('/account');
    }).catch(function (error) {
        alert("Password or username incorrect");
        sessionStorage.setItem("answer", JSON.stringify(error.status))
    });
  }
  newFunc(event){
      this.server.get("http://localhost:8080/api/user/xyz/", {
          headers: {'X-AUTH' : JSON.parse(localStorage.getItem("token")).token}
      }).then(function (response) {
          console.log(response.data);
          console.log(response.state);
      }).catch(function (error) {
            alert("token nie wazny");
      })
  }
  userNameChange(event){
    this.setState({userName: event.target.value})
  };
  passwordChange(event){
    this.setState({password: event.target.value})
  }
  render(){
    return (
      <div>
        <center><input type="text" placeholder="username" onChange={this.userNameChange}/></center>
        <center><input type="password" placeholder="password" onChange={this.passwordChange}/></center>
        <center><button onClick={this.tryToLogIn}>Submit</button></center>
          <h1/>
          <center><Link to="/register">Register</Link></center>
      </div>
    );
  }
}
