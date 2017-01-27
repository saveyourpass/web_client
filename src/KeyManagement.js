/**
 * Created by tomek on 26/01/17.
 */
import React from 'react'

class KeyManagement extends React.Component{
    constructor(){
        super();
        if(localStorage.getItem("CurrentPrivateKey") === null){
            this.privateKey = "There is no private key on this device. Please generate new keys or restore them from file";
            this.publicKey = "";
            this.timeKey = "";
            this.dateKey = "";
        }else {
            this.privateKey = JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).privKey);
            this.publicKey = JSON.parse(JSON.parse(localStorage.getItem("CurrentPrivateKey")).pubKey);
            this.timeKey = JSON.parse(localStorage.getItem("CurrentPrivateKey")).hour;
            this.dateKey = JSON.parse(localStorage.getItem("CurrentPrivateKey")).date;
        }
        this.textAreaSetup = this.textAreaSetup.bind(this);
        this.textAreaValue = "";
    }

    textAreaSetup(){
        this.textAreaValue = this.privateKey;
        document.getElementById('textArea').value = this.textAreaValue;
    }

    render(){
        return(
            <div>
                <h1>Current Private Key Connected With this device</h1>
                <h5>Created: {this.dateKey} {this.timeKey}</h5>
                <textarea id='textArea' rows="10" cols="63" value="CLICK TO SEE YOUR ENCRYPTED PRIVATE KEY" onClick={this.textAreaSetup} readOnly="dupa" />
                <p><h>You can copy it and save in .txt file on your computer.</h></p>
                <p><h>But remember that only you should have acces to it!</h></p>
                <p><h>You will be able to restore it in the future from file.</h></p>
            </div>
        )
    }
}

export default KeyManagement