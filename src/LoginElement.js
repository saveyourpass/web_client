import React from 'react'
import * as axios from "axios";

export default class LoginElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    }
    this.userNameChange = this.userNameChange.bind(this);//deklaracja
    this.passwordChange = this.passwordChange.bind(this);
    this.server = axios.create({baseURL: "http://localhost:8080/"});//Adam tu tak tylko wpisalem zeby cokolwiek było
  }
  sendData(event){
    axios.post("http://localhost:8080/api/user/login", {userName: this.state.userName, password: this.state.password}).then(function (response) {console.log("saved successfully")});;
  }
  userNameChange(event){
    this.setState({userName: event.target.value})//tu se pisze
  }
  passwordChange(event){
    this.setState({password: event.target.value})
  }
  render(){
    return (
      <div>
        <center><input type="text" placeholder="username" onChange={this.userNameChange}/></center>
        <center><input type="password" placeholder="password" onChange={this.passwordChange}/></center>
        <center><button onClick={this.sendData}>Submit</button><button>Clear</button></center>
      </div>
    );
  }
}
