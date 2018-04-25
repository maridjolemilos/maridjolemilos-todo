import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Switch, Redirect, withRouter, NavLink } from "react-router-dom";
import Footer from './components/footer';
import Header from './components/header';
import Signup from './components/signup';

import Signed from './components/signed';
import Modal from 'react-modal';
import Email from './components/email';
import Button from './components/button';
import Password from './components/password';
import './index.css';
// import './firebase/firebase';
import firebase from './firebase/firebase.js';
import myImage from './avatar.png';

class App extends Component {
  render() {
    return (
        <div>
            <Router>
                <div>

                   <div id="hh">   <Header/> </div>
                    <br /><br />
                    <div className="navlink">
        <NavLink  exact to="/" activeClassName="selected" >Sign in</NavLink><br/><p>***</p>
        <NavLink to="/signup" activeClassName="selected" >Sign up</NavLink>
                    </div>
                   <AuthButton />
                   <Switch>

                   <Route path="/" exact component={Signin} />
                   <Route path="/signup" component={Signup} />

                   <PrivateRoute path="/signed" component={Signed} />
                   </Switch>
                       {/* <div id="main">   <Main/></div><br />*/}
                   <div id="ff">   <Footer /> </div>

                </div>
            </Router>
        </div>
    );
  }
}




const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
       <div className="Center">
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
       </div>
    ) : (
      <p></p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const Signin = (props) => {
    return (
           <div id="main">   <Login/></div>
    )
};

class Login extends React.Component {
  constructor(props) {
    super(props);
  this.state = {user: {}, redirectToReferrer: false, email:[], psw:[], passconfirmed: false, modalIsOpen: true, errormodalIsOpen:false,
  regMail: [], regPass:[], confirm: false};
  this.confirmPass=this.confirmPass.bind(this)
  this.onFormSubmit=this.onFormSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this);

}
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };


componentDidMount() {
}

componentWillUnmount(){
}

componentDidUpdate(prevProps, prevState){
}

  closeModal() {
    this.setState({errormodalIsOpen: false});
  }

  onFormSubmit(e) {
    e.preventDefault();
    let email=e.target.elements.email.value;
    this.setState({ email:email });
    console.log(email);
    let pass=e.target.elements.psw.value;
    console.log(pass);
    this.setState({ psw:pass });



  const database = firebase.database();
  database.ref('registered').once('value').then((snapshot) => {
   const arrayUsers = [];
   snapshot.forEach((childSnapshot) => {
     arrayUsers.push({
       id: childSnapshot.key,
       ...childSnapshot.val()
     });
   })

console.log(arrayUsers)

let results = arrayUsers.find(function (obj) { return (obj.email === email && obj.password===pass); });
console.log(results)
if (results) {
  this.setState({ confirm:true });
  console.log('poklapa se')

  const x=Math.random().toString(36).substring(7);
  const xx=JSON.stringify(x)
  console.log(xx)
  localStorage.setItem('xnum', xx);
  const time=new Date().toLocaleString()


    const database = firebase.database();
    database.ref('currentUser').push({
      username: results.username,
      email: results.email,
      password: results.password,
      headAdmin: results.headAdmin ? true : false,
      owner: results.owner ? true : false,
      // authId: results.id,
      timeOfLogin: time,
      x: x

    });
    database.ref(`history/${x}`).push({
      username: results.username,
      email: results.email,
      timeOfLogin: time
    });

}


else {
  this.setState({ errormodalIsOpen:true });
  console.log('jok')
}
});
}

 confirmPass(e) {
  e.preventDefault();
    let passVal=e.target.elements.loz.value;
    console.log(passVal)
   if (passVal===this.state.psw) {
    this.setState({ passconfirmed:true });
   }
   e.target.elements.loz.value="";
 }



render() {


    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={{pathname: "/signed"}} />;
    }

    return(
      <div>


      <p id="par">Sign in</p>


      <div className="imgcontainer">
      <img src={myImage} alt="Avatar" className="avatar"></img>
      </div>

      <form onSubmit={this.onFormSubmit}>
        <label for="email"><b>Email</b></label>
        <Email />
        <label for="psw"><b>Password</b></label>
        <Password />
        <Button />


      </form>


       {this.state.confirm===true ? this.login()

      //  <Modal
      //  className="modalApp"
      //  isOpen={this.state.modalIsOpen}
      //  ariaHideApp={false}
      //  contentLabel="Example Modal">
      //    <div >
      //
      //      <h2>You are successfully signed in!</h2>
      //
      //        <div className="Center">
      //  <button className="open-button" onClick={this.login}>Open list of tasks</button>
      //   </div>
      //    </div>
      // </Modal>
      : <Modal
         className="modal"
         isOpen={this.state.errormodalIsOpen}
         ariaHideApp={false}
         contentLabel="Example Modal">
           <div>

             <h2 className="Center">Your email and password does not match.</h2>
              <h2 className="Center">Try again!</h2>

             <div className="Center">
             <button  onClick={this.closeModal}>close</button>
           </div>
           </div>
        </Modal>
      }

    </div>
      );

   }

}






export default App;
