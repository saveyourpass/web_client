/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'

class SharePassword extends React.Component{
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
                <center><h1>Share Password</h1></center>
                <center><h>Choose password to share: </h><select>{rowsGiver}</select></center>
                <center>Type password to RSA key: <input type="password"/></center>
                <center><button>Decrypt</button></center>
            </div>
        )
    }
}

export default SharePassword