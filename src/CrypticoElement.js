import React from 'react'
/*
Element generating
*/


class CrypticoElement extends React.Component {
    constructor() {
        super();
        window._crypto = null;
        this.generateKeys = this.generateKeys.bind(this);
        this.changeLength = this.changeLength.bind(this);
        this.state = {
            keyLength : 512
        }
    }
    changeLength(event){
        this.setState({keyLength: event.target.value})
    }
    generateKeys(){
        var NodeRSA = require('node-rsa');
        var key = new NodeRSA({b: this.state.keyLength});
        var pub_key = key.exportKey('pkcs8-public');
        var priv_key = key.exportKey('pkcs8');
        var data = new Date().toLocaleDateString();
        var godzina = new Date().toLocaleTimeString();
        var ob = {
            "date":data,
            "hour":godzina,
            "pubKey":JSON.stringify(pub_key),
            "privKey":JSON.stringify(priv_key),
        };
        localStorage.setItem("CurrentPrivateKey", JSON.stringify(ob));
        console.log(JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).privKey));
        console.log(priv_key);
        var kekeke = new NodeRSA(JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).privKey), 'pkcs8');
        console.log(kekeke.exportKey('pkcs8'));
        location.reload();
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
                <button onClick={this.generateKeys}>Generate RSA keys</button>
            </div>
        )
    }
}

export default CrypticoElement