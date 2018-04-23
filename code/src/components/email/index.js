import React from 'react';

class Email extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: []};
    }

render() {
      return(
      <div><input type="email" placeholder="email" name="email" onChange={this.onEmailChange}/> </div>);
      }
}


export default Email;
