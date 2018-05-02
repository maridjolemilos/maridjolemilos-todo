/*import React from 'react';
import {  Link } from "react-router-dom";
import Email from '../email';
import Button from '../button';
import Password from '../password';
import Modal from 'react-modal';
import './index.css';


const Signin = (props) => {
    return (
           <div id="main">   <Main/></div>
    )
};

class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: {}, psw: [], email:[], modalIsOpen: true, errormodalIsOpen:false, regMail: [],
    regPass:[], confirm: false }; 
    console.log(this.state.user);
    this.onFormSubmit=this.onFormSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this);
   
  }

componentDidMount() {
  const json=localStorage.getItem('email');
  const json1=localStorage.getItem('psw');
   const jreg=localStorage.getItem('regreg');
   const jpas=localStorage.getItem('paspas');
 
 const ail=JSON.parse(jreg)
    const ass=JSON.parse(jpas)


    const newMail=JSON.parse(json)
    const newPass=JSON.parse(json1)
   
 this.setState({regMail:[...ail, newMail]});
 this.setState({regPass:[...ass, newPass]});
  

 
   console.log(this.state.regMail);
}  

componentWillUnmount(){
 const all=JSON.stringify(this.state.regMail)
  localStorage.setItem('regreg', all);
      const all1=JSON.stringify(this.state.regPass)
      localStorage.setItem('paspas', all1);
}

componentDidUpdate(prevProps, prevState){
    if(prevState.email !==this.state.email) {
    const json=JSON.stringify(this.state.email);
    const json1=JSON.stringify(this.state.psw);
    console.log(json1);
    localStorage.setItem('email', json);
    localStorage.setItem('psw', json1);
    console.log("saving data");
   const all=JSON.stringify(this.state.regMail)
  localStorage.setItem('regreg', all);
      const all1=JSON.stringify(this.state.regPass)
      localStorage.setItem('paspas', all1);
    

     }
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

  if (this.state.regMail.includes(email) && this.state.regPass.includes(pass)) {
    this.setState({ confirm:true });
  }
  else {
    this.setState({ errormodalIsOpen:true });
  }
 



   
   

}





 render() {
 


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
            
           <h1>You need to confirm your password to access the list of clients!<Link to="/signed" >Click here to continue</Link></h1>
          
            
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








export default Signin;



*/