/**
 * Created by tomek on 26/01/17.
 */
import React from 'react'

class RestoreKey extends React.Component{
    constructor(){
        super();
        this.setPassword = this.setPassword.bind(this);
        this.changeLength = this.changeLength.bind(this);
        this.validateChange = this.validateChange.bind(this);
        this.keyInput = this.keyInput.bind(this);
        this.restore = this.restore.bind(this);
        this.cleanTextArea = this.cleanTextArea.bind(this);
        this.clean = "";
        this.state = {
            keyString: "Paste here your private key",
            password : "",
            confirmPassword: "",
            areaText : "x"
        }
    }

    cleanTextArea(){
        document.getElementById('restoreArea').value = this.clean;
        //this.setState({areaText: ""});
    }

    setPassword(event){
        this.setState({password: event.target.value});
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

    restore() {
        //try{
            var forge = require('node-forge');
            var rsa = forge.pki.rsa;
            var encryptedPrivKey = this.state.keyString;
            var keySize = 16;
            var salt = 12345678;
            var key = forge.pkcs5.pbkdf2(this.state.password , salt, 1000, keySize);
            var iv = '1234567887654321';

            var ciphertextHex = forge.util.createBuffer()
            var ciphertext = forge.util.hexToBytes(encryptedPrivKey);
            var input = forge.util.createBuffer(ciphertext);
            var decipher = forge.cipher.createDecipher('AES-CBC', key);
            decipher.start({iv: iv});
            decipher.update(input);
            decipher.finish();
            console.log(decipher.output.toString('utf8'));


            // alert("Success");
            // console.log(key.exportKey('pkcs8'));
            // var pub_key = key.exportKey('pkcs8-public');
            // var priv_key = key.exportKey('pkcs8');
            // var data = new Date().toLocaleDateString();
            // var godzina = new Date().toLocaleTimeString();
            // var ob = {
            //     "date":data,
            //     "hour":godzina,
            //     "pubKey":JSON.stringify(pub_key),
            //     "privKey":JSON.stringify(priv_key),
            // };
            // localStorage.setItem("CurrentPrivateKey", JSON.stringify(ob));
            // location.reload();
        // }catch (e){
        //     alert("Private key uncorrect");
        // }
    }

    keyInput(event){
        this.setState({keyString: event.target.value})
    }

    render(){
        return(
            <div>
                <h1>Restore your key.</h1>
                <textarea id="restoreArea" rows="10" cols="63" value={this.state.keyString} onClick={this.cleanTextArea} onChange={this.keyInput}/>
                <center><h>Type password to RSA key</h><input type="password" onChange={this.setPassword}/></center>
                <h1></h1>
                <h>Confirm password</h><input type="password" onChange={this.validateChange}/>
                <p></p>
                <h>{this.state.validate}</h>
                <p><button onClick={this.restore}>Restore RSA keys</button></p>
                </div>
        )
    }
}

export default RestoreKey