import React from 'react'
import * as axios from "axios";

class AddNewPassword extends React.Component{
    constructor(){
        super();
        this.sendNewPassword = this.sendNewPassword.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePass = this.changePass.bind(this);
        this.share = this.share.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            passwordName : "",
            password : "",
            passwordConf : "",
            keys : []
        }
    }
    componentDidMount(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.get("http://localhost:8080/api/user/"+username+"/keys",
            config
        ).then(response => this.setState({keys: response.data}))
    }

    share(){

        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var config = {headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}};

        for( let index in this.state.keys){

            var forge = require('node-forge');
            var pki = forge.pki;

            var publicKey = pki.publicKeyFromPem(this.state.keys[index].data);
            var encryptedData =  publicKey.encrypt(this.state.password);
            var encoded64encryptedData = forge.util.encode64(encryptedData);

            this.server.post("http://localhost:8080/api/user/"+username+"/passwords/"+this.state.passwordName+"/uploadEncrypted?shareWith="+username+"&keyname="+this.state.keys[index].name, {
                    data: encoded64encryptedData}, config
            )
        }
    }

    changeName(event){
        this.setState({passwordName: event.target.value});
    }

    changePass(event){
        this.setState({password: event.target.value});
    }

    sendNewPassword(){

        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.post("http://localhost:8080/api/user/"+username+"/passwords/new", {
                name: this.state.passwordName},
            config
        ).then(function (response) {
            alert("Succes, pass added");
        }).catch(function (error) {
            alert("Error");
        });
    }
    render(){
        return(
            <div>
                <center><h1>Add new password</h1></center>
                <center><h>Password name<input type="text" onChange={this.changeName}/></h></center>
                <center><h>Type password to add<input type="password" onChange={this.changePass}/></h></center>
                <center><button onClick={this.sendNewPassword}>Add</button><button onClick={this.share}>Share with your devices</button></center>
            </div>
        )
    }
}

export default AddNewPassword