import React from 'react'
import {Link} from 'react-router'
import CrypticoElement from './CrypticoElement'


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
                    <center><h>bla bla bla, ehhe</h></center>
                    <center><CrypticoElement/></center>
                </div>
            )
        }
    }
}
export default MyAccount