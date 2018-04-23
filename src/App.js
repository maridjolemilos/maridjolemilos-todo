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
 //    const json=localStorage.getItem('email');
 //    const json1=localStorage.getItem('psw');
 //    const jreg=localStorage.getItem('regreg');
 //    const jpas=localStorage.getItem('paspas');
 //    console.log(json);
 //     console.log(json1);
 //     const ail=JSON.parse(jreg)
 //    const ass=JSON.parse(jpas)
 //    const newMail=JSON.parse(json)
 //    const newPass=JSON.parse(json1)
 //    const email=JSON.parse(json)
 //    const psw=JSON.parse(json1)
 //
 //    this.setState({regMail:[...ail, newMail]});
 // this.setState({regPass:[...ass, newPass]});
 //
 //
 //
 //    this.setState({ email:email });
 //    this.setState({ psw:psw });

    }

   componentWillUnmount(){
 // const all=JSON.stringify(this.state.regMail)
 //  localStorage.setItem('regreg', all);
 //      const all1=JSON.stringify(this.state.regPass)
 //      localStorage.setItem('paspas', all1);
}

componentDidUpdate(prevProps, prevState){
  //   if(prevState.email !==this.state.email) {
  //   const json=JSON.stringify(this.state.email);
  //   const json1=JSON.stringify(this.state.psw);
  //   console.log(json1);
  //   localStorage.setItem('email', json);
  //   localStorage.setItem('psw', json1);
  //   console.log("saving data");
  //  const all=JSON.stringify(this.state.regMail)
  // localStorage.setItem('regreg', all);
  //     const all1=JSON.stringify(this.state.regPass)
  //     localStorage.setItem('paspas', all1);
  //
  //
  //    }
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


    const database = firebase.database();
    database.ref('currentUser').push({
      username: results.username,
      email: results.email,
      password: results.password,
      headAdmin: results.headAdmin ? true : false,
      owner: results.owner ? true : false,
      // authId: results.id,
      x: x

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
      <p>Sign in</p>
      <form onSubmit={this.onFormSubmit}>
        <Email />
        <Password />
        <Button />

      </form>

       {this.state.confirm===true ?

       <Modal
       isOpen={this.state.modalIsOpen}
       ariaHideApp={false}
       contentLabel="Example Modal">
         <div className="Center">

           <h1>Welcome! Click here to continue!</h1>

             <div className="Center">
       <button onClick={this.login}>Open list of tasks</button>
        </div>
         </div>
      </Modal>
      : <Modal
         isOpen={this.state.errormodalIsOpen}
         ariaHideApp={false}
         contentLabel="Example Modal">
           <div className="Center">
             <h1>Your email and password does not match. Try again! </h1>
             <button  onClick={this.closeModal}>close</button>
           </div>
        </Modal>
      }

    </div>
      );

   }

}






export default App;
