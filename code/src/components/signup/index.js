import React from 'react';
import {  Link  } from "react-router-dom";
import Email from '../email';
import Button from '../button';
import Password from '../password';
import Modal from 'react-modal';
import firebase from '../../firebase/firebase';


const Signup = (props) => {
       return (
          <div id="main">   <Main1/></div>
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
     //        console.log(myJson)
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
          <p>Create your Back Office Account</p>
          <p>Fill in the appropriate fields to register</p>
       <form onSubmit={this.onFormSubmit}>
       <input type="text" placeholder="username" pattern=".{8,}" name="username"/>
          <Email />
          <Password />
          <Button />
       </form>
       {this.state.hostExists  && this.state.psw && this.state.username ?

      <Modal
      isOpen={this.state.modalIsOpen}
      ariaHideApp={false}
      contentLabel="Example Modal">

        <div className="Center">
          <h1>Welcome: {this.state.username}! You are registered now!<Link to="/" >Sign in to continue</Link></h1>
        </div>
      </Modal>

      : <Modal
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
