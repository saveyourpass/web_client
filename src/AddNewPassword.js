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
            password : 'tomek',
            passwordConf : '',
            users : []
        }
    }
    componentDidMount(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.get("http://localhost:8080/api/user/"+username+"/keys",
            config
        ).then(response => this.setState({users: response.data}))
    }
    // getUserKeys(){
    //     var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
    //     var config = {
    //         headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
    //     };
    //     this.server.get("http://localhost:8080/api/user/"+username+"/keys",
    //         config
    //     ).then(function (response) {
    //         var keys = response.data;
    //         console.log(keys);
    //         for( let pub in keys){//kazdy klucz zostanie wyjety, nastepnie kodowanie i odeslanie
    //             console.log(keys[pub].data);
    //             console.log(JSON.parse((JSON.parse(localStorage.getItem("CurrentPrivateKey"))).pubKey));
    //             var forge = require('node-forge');
    //             var rsa = forge.pki.rsa;
    //             var pki = forge.pki;
    //
    //             var publicKey = pki.publicKeyFromPem(keys[pub].data);
    //             var encryptedData =  publicKey.encrypt("tomek");
    //             this.server.post("http://localhost:8080/api/user/"+username+"/"+this.state.passwordName+"/uploadEncrypted?shareWith="+username+"&keyname="+keys[pub].name, {
    //                     data: encryptedData},
    //                 config
    //             )
    //         }
    //     });
    // }
    share(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var config = {
                    headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
                };
        for( let pub in this.state.users){//kazdy klucz zostanie wyjety, nastepnie kodowanie i odeslanie
            console.log(this.state.users[pub].data);
            console.log(JSON.parse((JSON.parse(localStorage.getItem("CurrentPrivateKey"))).pubKey));
            var forge = require('node-forge');
            var rsa = forge.pki.rsa;
            var pki = forge.pki;

            var publicKey = pki.publicKeyFromPem(this.state.users[pub].data);
            var encryptedData =  publicKey.encrypt(this.state.password);
            var costam = forge.util.encode64(encryptedData);
            this.server.post("http://localhost:8080/api/user/"+username+"/passwords/"+this.state.passwordName+"/uploadEncrypted?shareWith="+username+"&keyname="+this.state.users[pub].name, {
                    data: costam},
                config
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