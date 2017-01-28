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
        var forge = require('node-forge');
        var rsa = forge.pki.rsa;
        var pki = forge.pki;
        var encryptedPrivKey = this.state.keyString;

        try{
            var privateKey  = pki.decryptRsaPrivateKey(encryptedPrivKey, this.state.password);
        }catch (e){
            alert("Text file or given password is incorrect.");
        }
        console.log(forge.pki.privateKeyToPem(privateKey));
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