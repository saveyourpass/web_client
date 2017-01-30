/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'
import * as axios from "axios";

class MyPasswords extends React.Component{
    constructor(){
        super();
        this.func = this.func.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            passwords: [],
            decryptedPassword: "ehehehe",
            passwords: []
        }
    }
    func(){
        console.log(this.state.passwords);
        //response => this.setState({passwords: response.data})
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
        ).then(function (response) {
            console.log(response.data);
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
                <center>Type password to RSA key: <input type="password"/></center>
                <center><button>Decrypt</button></center>
                <center>Decrypted Password: </center>
                {/*<center><textarea type="text" value={this.state.decryptedPassword}/></center>*/}
                <center><button onClick={this.func}>OK</button></center>
            </div>
        )
    }
}

export default MyPasswords