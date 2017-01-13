import React from 'react'
import Nowy from './Nowy'

export default class Element extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div>
              <center><h1>SaveYour(P)ass</h1></center>
              <center><h2>Created by</h2></center>
              <center><h>Adam Piekarczyk & Tomasz Sułecki</h></center>
              <center><h1></h1></center>
              <center><h>Please Log in</h></center>
              <center><h1></h1></center>
              <Nowy/>
          </div>
    );
  }
}