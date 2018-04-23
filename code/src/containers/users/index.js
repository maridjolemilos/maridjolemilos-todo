import React from 'react';

import fetch from 'cross-fetch'





class Users extends React.Component {
constructor(props) {
    super(props);
    this.state = {user: []};
  }



  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user);
     this.setState({ user:user });
  })
  .catch(err => {
    console.error(err);
  });
  }
    render() {

  return <p><pre>  { JSON.stringify(this.state.user, null, 2) }</pre> </p>
    }
}

export default Users;

