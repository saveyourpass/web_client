/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'
import * as axios from "axios";

class SharePassword extends React.Component{
    constructor(){
        super();
        this.setUsername = this.setUsername.bind(this);
        this.getUserKeys = this.getUserKeys.bind(this);
        this.encryptAndSend = this.encryptAndSend.bind(this);
        this.setPassToRsa = this.setPassToRsa.bind(this);
        this.setEncryptedPassword = this.setEncryptedPassword.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            passwords: [],
            encryptedPassword:'',
            userToShare: '',
            passToRsaKey: ''
        }
    }

    setPassToRsa(event){
        this.setState({passToRsaKey: event.target.value});
    }

    setEncryptedPassword(event){
        this.setState({encryptedPassword: event.target.value});
    }

    setUsername(event){
        this.setState({userToShare: event.target.value});
    }

    componentDidMount(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var keyname = JSON.parse(localStorage.getItem("CurrentPrivateKey")).deviceName;
        //console.log("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/publicKeys");
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.get("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/passwords",
            config
        ).then(
            response => this.setState({passwords: response.data})
        )
    }

    getUserKeys(){
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };

        this.server.get("http://localhost:8080/api/user/"+this.state.userToShare+"/keys",
            config
        ).then(
            response => this.encryptAndSend(response.data, this.state.userToShare)
        )
    }

    encryptAndSend(data, username){
        console.log(JSON.parse(this.state.encryptedPassword));
        var passToShare = JSON.parse(this.state.encryptedPassword);

        var forge = require('node-forge');
        var pki = forge.pki;
        var util = forge.util;
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };

        var pemPrivateKey = JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).privKey);
        var privateKey = pki.decryptRsaPrivateKey(pemPrivateKey, this.state.passToRsaKey);
        var decodedFrom64PasswordFromServer = util.decode64(passToShare.data);

        var decryptedPass = privateKey.decrypt(decodedFrom64PasswordFromServer);
        console.log(decryptedPass);

        for (let index in data){
            console.log(data[index]);
            var publicKey = pki.publicKeyFromPem(data[index].data);
            var encryptedData =  publicKey.encrypt(decryptedPass);
            var encodedEncryptedPassword = forge.util.encode64(encryptedData);
            this.server.post("http://localhost:8080/api/user/"+JSON.parse(sessionStorage.getItem("currentUser")).key+"/passwords/"+passToShare.password.name+"/uploadEncrypted?shareWith="+this.state.userToShare+"&keyname="+data[index].name, {
                    data: encodedEncryptedPassword},
                config
            )
        }
    }

    render(){

        let rowsGiver = [];
        rowsGiver.push(<option key={"key"} value = {"value"}>...</option>)

        for (let prop in this.state.passwords) {
            let pass = this.state.passwords[prop];
            rowsGiver.push(
                <option key={pass.password.name} value = {JSON.stringify(pass)}>{pass.password.name}</option> );
        }

        //console.log(this.state.publicKeys);

        return(
            <div>
                <center><h1>Share Password</h1></center>
                <center><h>Choose password to share: </h><select onChange={this.setEncryptedPassword}>{rowsGiver}</select></center>
                <center>Type password to RSA key: <input type="password" onChange={this.setPassToRsa}/></center>
                <center>Type username to share: <input type="text" onChange={this.setUsername}/></center>
                <center><button onClick={this.getUserKeys}>Share</button></center>
            </div>
        )
    }
}

export default SharePassword