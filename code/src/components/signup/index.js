import React from 'react';
import {  Link  } from "react-router-dom";
import Email from '../email';
import Button from '../button';
import Password from '../password';
import Modal from 'react-modal';
import firebase from '../../firebase/firebase';
import './index.css';
import myImage from '../../avatar.png';


const Signup = (props) => {
       return (
          <div id="main1">   <Main1/></div>
        )
  };

class Main1 extends React.Component {
      constructor(props) {
      super(props);
      this.state = {user: {}, psw: [], username: [], email:[], modalIsOpen: true, errormodalIsOpen:false, hostExists:false};
      this.onFormSubmit=this.onFormSubmit.bind(this)
      this.closeModal = this.closeModal.bind(this);
    }

componentDidUpdate(prevProps, prevState){
     //  if(this.state.hostExists===true) {
     //  const json=JSON.stringify(this.state.email);
     //   const json1=JSON.stringify(this.state.psw);
     //  localStorage.setItem('email', json);
     //   localStorage.setItem('psw', json1);
     //  console.log("saving data");
     // }

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
      let username=e.target.elements.username.value;
      this.setState({ psw:pass, username:username });
       // this.setState({ hostExists:true });

     // fetch(`https://cors-anywhere.herokuapp.com/https://api.trumail.io/v1/{format}/${email}`)
     // .then(
     //    response => response.json()
     //  )
     // .then(
     //    myJson => {
     //        console.log(myJson, "ppppp")
     //        this.setState({ user:myJson });
     //        if (myJson.hostExists===false ) {
     //        this.setState({ errormodalIsOpen:true });
     //          }
     //         this.setState({ hostExists:true });
     //
     //            console.log(this.state.hostExists)
     //            console.log(this.state.psw)
     //    }
     //  )
     //  .catch(
     //    error => console.error(error)
     //  );
   if (/\S+@\S+\.\S+/.test(email))
   {  this.setState({ hostExists:true });}

   else { this.setState({ errormodalIsOpen:true });}


      const database = firebase.database();
      database.ref('registered').push({
         username: username,
         email: email,
         password: pass

      });


}



 render() {

     return(
       <div>
          <p id="par">Create your Back Office Account</p>
          {/* <p>Fill in the appropriate fields to register</p> */}
          <div className="imgcontainer">
          <img src={myImage} alt="Avatar" className="avatar"></img>
          </div>

       <form onSubmit={this.onFormSubmit}>
        <label for="username"><b>Username</b></label>
       <input id="inp" type="text" placeholder="Enter Username" pattern=".{8,}" name="username"/>
          <label for="email"><b>Email</b></label>
          <Email />
          <label for="psw"><b>Password</b></label>
          <Password />
          <Button />
       </form>
       {this.state.hostExists  && this.state.psw && this.state.username ?

      <Modal
      className="modalApp"
      isOpen={this.state.modalIsOpen}
      ariaHideApp={false}
      contentLabel="Example Modal">

        <div >
          <h1 className="Center">Welcome: {this.state.username}! You are registered now!</h1>
            <div className="Center">
          <h1><Link to="/" >Sign in to continue</Link></h1>
              </div>
        </div>
      </Modal>

      : <Modal
        className="modalApp"
        isOpen={this.state.errormodalIsOpen}
        ariaHideApp={false}
        contentLabel="Example Modal">
          <div className="Center">
            <h1>Plase enter valid email to sign in!</h1>
            <button  onClick={this.closeModal}>close</button>
          </div>
      </Modal>
       }
       </div>
       );
       }
}



export default Signup;
