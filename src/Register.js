import React from 'react'
import * as axios from "axios";
import CrypticoElement from './CrypticoElement'
import {Link} from 'react-router'


class Register extends React.Component{
    constructor(){
        super();
        this.passwordChange = this.passwordChange.bind(this);
        this.password2Change = this.password2Change.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.lengthChange = this.lengthChange.bind(this);
        this.rsaPass = this.rsaPass.bind(this);
        this.rsaPass2 = this.rsaPass2.bind(this);
        this.sendNewUser = this.sendNewUser.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            password : '',
            password2 : '',
            username : ' ',
            length : 512,
            rsaPassword : '',
            rsaPassword2 : ' '
        }
    }
    passwordChange(event){
        this.setState({password: event.target.value})
    }
    password2Change(event){
        this.setState({password2: event.target.value})
    }
    usernameChange(event){
        this.setState({username: event.target.value})
    }
    lengthChange(event){
        this.setState({length: event.target.value})
    }
    rsaPass(event){
        this.setState({rsaPassword: event.target.value})
    }
    rsaPass2(event){
        this.setState({rsaPassword2: event.target.value})
    }
    sendNewUser(){
        sessionStorage.setItem("username" , this.state.username);
        this.server.post("http://localhost:8080/api/user/new", {
            username: this.state.username,
            password: this.state.password
        }).then(function (response) {
            alert("Account created ! ");
        }).catch(function (error) {
            alert("username incorrect");
        });
    }
    render(){
        return(
            <div>
                <center><h1>Register Form</h1></center>
                <center><h1>Your account</h1></center>
                <center><h>Username:</h><input type="text" onChange={this.usernameChange}/></center>
                <center><h>Password:</h><input type="password" onChange={this.passwordChange}/></center>
                <center><h>Confirm password:</h><input type="password" onChange={this.password2Change}/></center>
                <center><button onClick={this.sendNewUser}>Create account</button></center>
                <h1></h1>
                <center><Link to="/">Main Page</Link></center>
            </div>
        )
    }
}

export default Register