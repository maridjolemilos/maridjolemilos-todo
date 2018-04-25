import React from 'react';
import './index.css';

class Email extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: []};
    }

render() {
      return(
      <div><input type="email" placeholder="Enter Email" name="email" onChange={this.onEmailChange}/> </div>);
      }
}


export default Email;
