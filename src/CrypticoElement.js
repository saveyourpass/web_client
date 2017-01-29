import React from 'react'
import * as axios from "axios";



class CrypticoElement extends React.Component {
    constructor() {
        super();
        this.setPassword = this.setPassword.bind(this);
        this.generateKeys = this.generateKeys.bind(this);
        this.changeLength = this.changeLength.bind(this);
        this.validateChange = this.validateChange.bind(this);
        this.setDeviceName = this.setDeviceName.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.key = null;
        this.pubKey = null;
        this.state = {
            password : null,
            passwordConfirm : null,
            keyLength : 512,
            validate : "",
            deviceName : ""
        }
    }
    setPassword(event){
        this.setState({password: event.target.value})
    }
    setDeviceName(event){
        this.setState({deviceName: event.target.value})
    }
    changeLength(event){
        this.setState({keyLength: event.target.value})
    }
    validateChange(event){
        if(this.state.password === event.target.value){
            this.setState({validate: "Same passwords"});
        }else{
            this.setState({validate: "Different passwords"});
        }
        this.setState({passwordConfirm: event.target.value})
    }
    generateKeys(){
        if(this.state.password === this.state.passwordConfirm){
            var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
            var forge = require('node-forge');
            var rsa = forge.pki.rsa;
            var pki = forge.pki;

            var keypair = rsa.generateKeyPair({bits: this.state.keyLength});
            var publicKeyInPemFormat = forge.pki.publicKeyToPem(keypair.publicKey);
            var pubFingerPrint = forge.ssh.getPublicKeyFingerprint(keypair.publicKey, {encoding: 'hex', delimiter: ':'});

            var encryptedPrivateKey = pki.encryptRsaPrivateKey(keypair.privateKey, this.state.password, {legacy: false, algorithm: '3des'});

            var date = new Date().toLocaleDateString();
            var hour = new Date().toLocaleTimeString();

            var object = {
                "date":date,
                "hour":hour,
                "pubKey":JSON.stringify(publicKeyInPemFormat),
                "privKey":JSON.stringify(encryptedPrivateKey),
                "fingerPrint":JSON.stringify(pubFingerPrint),
                "deviceName": this.state.deviceName
            };
            localStorage.setItem("CurrentPrivateKey", JSON.stringify(object));
            alert("Succes, key generated");
            var config = {
                headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
            };
            this.server.post("http://localhost:8080/api/user/"+{username}+"/keys/new", {
                name: this.state.deviceName,
                data: publicKeyInPemFormat},
                config
            ).then(function (response) {
                alert("Key added");
            }).catch(function (error) {
                alert("Error");
            });

            location.reload();
        }else{
            alert("Passwords are different.")
        }
    }

    render() {
        return (
            <div>
                <h1>Generate new keys for this device.</h1>
                <h>Select lenght of RSA key </h><select onChange={this.changeLength}>
                    <option value="512">512</option>
                    <option value="1024">1024</option>
                    <option value="2048">2048</option>
                    <option value="3072">3072</option>
                    <option value="4096">4096</option>
                </select>
                <center><h1></h1></center>
                <h>Name of this device<input type="text" onChange={this.setDeviceName}/></h>
                <center><h1></h1></center>
                <center><h>Type password to RSA key</h><input type="password" onChange={this.setPassword}/></center>
                <h1></h1>
                <h>Confirm password</h><input type="password" onChange={this.validateChange}/>
                <p></p>
                <h>{this.state.validate}</h>
                <p><button onClick={this.generateKeys}>Generate RSA keys</button></p>
            </div>
        )
    }
}

export default CrypticoElement