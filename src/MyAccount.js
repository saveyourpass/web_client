import React from 'react'
import {Link} from 'react-router'
import CrypticoElement from './CrypticoElement'
import KeyManagement from './KeyManagement.js'
import RestoreKey from './RestoreKey.js'

class MyAccount extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    render(){
        if(sessionStorage.getItem("currentUser")==null){
            return(
                <div>
                    <center><h1>Please log in again!</h1></center>
                    <center><Link to="/">Main Page</Link></center>
                </div>
            )
        }
        else{
            return (
                <div>
                    <center><h1>Welcome {JSON.parse(sessionStorage.getItem("currentUser")).key} !</h1></center>
                    <center><h>Send us 100$!</h></center>
                    <center><CrypticoElement/></center>
                    <center><RestoreKey/></center>
                    <center><KeyManagement/></center>
                </div>
            )
        }
    }
}
export default MyAccount