/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'
import * as axios from "axios";

class MyPasswords extends React.Component{
    constructor(){
        super();
        this.decryptPassword = this.decryptPassword.bind(this);
        this.choosePasswordToDecrypt = this.choosePasswordToDecrypt.bind(this);
        this.setPassToRSA = this.setPassToRSA.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            passwords: [],
            decryptedPassword: '',
            passwordToDecrypt: '',
            passwordToRSAKey: ''
        }
    }

    setPassToRSA (event){
        this.setState({passwordToRSAKey: event.target.value});
    }

    choosePasswordToDecrypt(event){
        this.setState({passwordToDecrypt: event.target.value});
    }

    decryptPassword(){
        var forge = require('node-forge');
        var pki = forge.pki;
        var util = forge.util;

        var pemPrivateKey = JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).privKey);
        var privateKey = pki.decryptRsaPrivateKey(pemPrivateKey, this.state.passwordToRSAKey);
        var passToRsa = this.state.passwordToRSAKey;
        var decodedFrom64PasswordFromServer = util.decode64(this.state.passwordToDecrypt);

        var decryptedPassword = privateKey.decrypt(decodedFrom64PasswordFromServer);
        console.log(decryptedPassword);
    }
    componentDidMount(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var keyname = JSON.parse(localStorage.getItem("CurrentPrivateKey")).deviceName;
        //console.log("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/passwords");
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.get("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/passwords",
            config
        ).then(
            response => this.setState({passwords: response.data})
        )
    }

    render(){

        let rowsGiver = [];
        rowsGiver.push(<option key={"key"} value = {"value"}>...</option>)

        for (let prop in this.state.passwords) {
            let pass = this.state.passwords[prop];
            rowsGiver.push(
                <option key={pass.password.name} value = {pass.data}>{pass.password.name}</option> );
        }

        return(
            <div>
                <center><h1>My passwords</h1></center>
                <center><h>Choose password to decrypt: </h><select onChange={this.choosePasswordToDecrypt}>{rowsGiver}</select></center>
                <center>Type password to RSA key: <input type="password" onChange={this.setPassToRSA}/></center>
                <center><button onClick={this.decryptPassword}>Decrypt</button></center>
                <center>Decrypted Password: </center>
                <center><output type="text" value={this.state.decryptedPassword}/></center>
                <center><button onClick={this.decryptPassword}>OK</button></center>
            </div>
        )
    }
}

export default MyPasswords