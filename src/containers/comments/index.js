import React from 'react';

import './Home.css';
import fetch from 'cross-fetch'



class Home extends React.Component {
constructor(props) {
    super(props);
    this.state = {user: []};
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/comments')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user);
    let us=user.slice(1,11);
     this.setState({ user:us });
  })
  .catch(err => {
    console.error(err);
  });
  }
    render() {
  return <p><pre> { JSON.stringify(this.state.user, null, 2) }</pre></p>
    }
}

export default Home;
