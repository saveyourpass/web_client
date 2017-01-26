/**
 * Created by tomek on 26/01/17.
 */
import React from 'react'

class RestoreKey extends React.Component{
    constructor(){
        super();
        this.keyInput = this.keyInput.bind(this);
        this.state = {
            keyString: ""
        }
    }

    keyInput(event){
        this.setState({keyString: event.target.value})
    }

    render(){
        return(
            <div>
                <h1>Restore your key.</h1>
                <h5>Paste here your key.</h5>
                <textarea rows="10" cols="63" onChange={this.keyInput}></textarea>
            </div>
        )
    }
}

export default RestoreKey