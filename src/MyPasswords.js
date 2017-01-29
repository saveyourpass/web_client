/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'

class MyPasswords extends React.Component{
    constructor(){
        super();
        this.state = {
            passwords: [],
            decryptedPassword: "ehehehe"
        }
    }

    componentDidMount(){
        this.setState({
            passwords: [{"key": "tomek1", "value":"mistrz1"}, {"key": "tomek2", "value":"mistrz2"}, {"key": "tomek3", "value":"mistrz3"}]
        })
    }

    render(){

        let rowsGiver = [];

        for (let prop in this.state.passwords) {
            let car = this.state.passwords[prop];
            rowsGiver.push(
                <option key={car.key} value = {car.value}>{car.key}</option> );
        }

        return(
            <div>
                <center><h1>My passwords</h1></center>
                <center><h>Choose password to decrypt: </h><select>{rowsGiver}</select></center>
                <p><center>Type password to RSA key: <input type="password"/></center></p>
                <center><button>Decrypt</button></center>
                <p><center>Decrypted Password: </center></p>
                <center><textarea type="text" value={this.state.decryptedPassword}/></center>
            </div>
        )
    }
}

export default MyPasswords