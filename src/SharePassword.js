/**
 * Created by tomek on 28/01/17.
 */
import React from 'react'
import * as axios from "axios";

class SharePassword extends React.Component{
    constructor(){
        super();
        this.changeUsername = this.changeUsername.bind(this);
        this.getUserKeys = this.getUserKeys.bind(this);
        this.encryptAndSend = this.encryptAndSend.bind(this);
        this.server = axios.create({baseURL: "http://localhost:8080/"});
        this.state = {
            publicKeys: [],
            encryptedPassword:'',
            userToShare: '',
            hehe: []
        }
    }

    changeUsername(event){
        this.setState({userToShare: event.target.value});
    }

    componentDidMount(){
        var username = JSON.parse(sessionStorage.getItem("currentUser")).key;
        var keyname = JSON.parse(localStorage.getItem("CurrentPrivateKey")).deviceName;
        //console.log("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/publicKeys");
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };
        this.server.get("http://localhost:8080/api/user/"+username+"/keys/"+keyname+"/passwords",
            config
        ).then(
            response => this.setState({publicKeys: response.data})
        )
    }

    getUserKeys(){
        var config = {
            headers: {'X-AUTH' : JSON.parse(sessionStorage.getItem("token")).token}
        };

        this.server.get("http://localhost:8080/api/user/"+this.state.userToShare+"/keys",
            config
        ).then(
            response => this.encryptAndSend(response.data, this.state.userToShare)
        )
    }

    encryptAndSend(data, username){
        for (let index in data){
            console.log(data[index]);
        }
    }

    render(){

        let rowsGiver = [];
        rowsGiver.push(<option key={"key"} value = {"value"}>...</option>)

        for (let prop in this.state.publicKeys) {
            let pass = this.state.publicKeys[prop];
            rowsGiver.push(
                <option key={pass.password.name} value = {pass.data}>{pass.password.name}</option> );
        }

        //console.log(this.state.publicKeys);

        return(
            <div>
                <center><h1>Share Password</h1></center>
                <center><h>Choose password to share: </h><select>{rowsGiver}</select></center>
                <center>Type password to RSA key: <input type="password"/></center>
                <center>Type username to share: <input type="text" onChange={this.changeUsername}/></center>
                <center><button onClick={this.getUserKeys}>Share</button></center>
            </div>
        )
    }
}

export default SharePassword