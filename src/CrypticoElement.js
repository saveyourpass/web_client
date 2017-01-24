import React from 'react'


class CrypticoElement extends React.Component {
    constructor() {
        super();
        this.generateKeys = this.generateKeys.bind(this);
    }
    generateKeys(){
        var cryptico = require('cryptico');
        var PassPhrase = "The Moon is a Harsh Mistress."; // The passphrase used to repeatably generate this RSA key.
        var Bits = 1024; // The length of the RSA key, in bits.

        var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
        var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);
        console.log(' publicKey: ', MattsPublicKeyString);

        var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
        var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);
        console.log(' PlainText: ', PlainText);
        console.log('EncryptionResult: ', EncryptionResult);

        var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
        console.log('PlainText:', DecryptionResult.plaintext);
        console.log(DecryptionResult);
    }

    render() {
        return (
            <div>
                <h1>cryptico</h1>
                <button onClick={this.generateKeys}>But</button>
            </div>
        )
    }
}

export default CrypticoElement