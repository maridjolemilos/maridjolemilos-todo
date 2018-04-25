import React from 'react';
import Modal from 'react-modal';
import fetch from 'cross-fetch'
import './index.css';
import firebase from '../../firebase/firebase';

class Signed extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: [], email:[], selected:"", fire: "",headAdmin: "",
                  owner:"", id:"",  modalIsOpen: false, username:""};
    this.onDelete=this.onDelete.bind(this)
    this.onAdd=this.onAdd.bind(this)
    this.openModal=this.openModal.bind(this)
    this.closeModal=this.closeModal.bind(this)

  }


onDelete(e) {
    e.preventDefault();
    if(!e.target.elements.num.value){

        return;
    }
    let num=e.target.elements.num.value;
    console.log(num);
    let array = this.state.user;
    let num1=num-1;
    console.log(num1);
    array.splice(num1,1);
    console.log(array);
    this.setState({user: array});
    console.log(this.state.user)
    e.target.elements.num.value="";
    }

onAdd(e) {
    e.preventDefault();
    if(!e.target.elements.title.value || !e.target.elements.completed.value ){
       return;
    }
    let title=e.target.elements.title.value;
    let completed=JSON.parse(e.target.elements.completed.value);
    let array = this.state.user;
    let newelement={ title:title, completed:completed }
    this.setState({user:[...array, newelement]});
   /*console.log(this.state.user)*/
    e.target.elements.title.value="";
    e.target.elements.completed.value="";
    }



componentWillMount() {

     }
componentDidMount() {






    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(
        response => response.json()
    )
    .then(
        myJson => {
            console.log(myJson)
     let js=myJson;

     this.setState({ user:js });
        }
    )
    .catch(
        error => console.error(error)
    );




  const database = firebase.database();


database.ref('currentUser').on('value', (snapshot) => {
// const val = snapshot.val();
const arrayUsers = [];
snapshot.forEach((childSnapshot) => {
   arrayUsers.push({
     id: childSnapshot.key,
     ...childSnapshot.val()
   });
 })
console.log(arrayUsers, "arraz")

const xnumber=localStorage.getItem('xnum');
let pire=JSON.parse(xnumber);
console.log(pire)
this.setState({ fire: pire });
console.log(this.state.fire);

let results = arrayUsers.find(function (obj) { return (obj.x === pire); });
console.log(results)
if (results) {
 this.setState({ id:results.id, headAdmin:results.headAdmin,owner:results.owner,
                 email:results.email, username:results.username });
 console.log(this.state.id,'to je to')
}
})
}

componentWillUnmount(){
  const time=new Date().toLocaleString()
  const database = firebase.database();
  database.ref(`currentUser/${this.state.id}`).set({ });

  database.ref(`history/${this.state.fire}`).update({
  timeOfLogout: time
  });

}


openModal() {
  this.setState({ modalIsOpen:true });
}
 closeModal() {
   this.setState({ modalIsOpen:false });
 }




render() {
    let rows = [];

    for(let i = 0; i < this.state.user.length; i++){
                    const us = this.state.user[i];
                    const tr = <TableRow key={us.id} id={i+1} title={us.title}
                     completed={JSON.stringify(us.completed)} email={this.state.email} headAdmin={this.state.headAdmin} />
                    rows.push(tr);
                }

    return(<div id="users">
       <p>Welcome: <span style={{color: '#f78757'}}> {this.state.username}, ({this.state.email})</span></p>
       {this.state.owner &&
      <button onClick={this.openModal}>Edit admin list</button>}
              <Modal
              className="modal"
              isOpen={this.state.modalIsOpen}
              ariaHideApp={false}
              contentLabel="Example Modal">
                <div className="Center">



                    <div >
              <div className="Center">
              <button  className="close-button" onClick={this.closeModal}>close list</button>
              </div>
               <Adminlist  registered={this.state.registered}/>

               </div>
                </div>
             </Modal>
        {this.state.headAdmin &&
        <div className="scroll">
       <form onSubmit={this.onDelete} >
       <input type="number" placeholder="id" min="1" max={this.state.user.length} name="num"/>
       <button >Delete</button>
       </form>

       <br/>
       <form onSubmit={this.onAdd} >
       <input type="text" placeholder="title" name="title"/>
       <input type="text" placeholder="completed" name="completed"/>
       <button >Add</button>
       </form>
       </div>
     }

                     <table id="tab">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>task</th>
                                <th>completed</th>
                                {this.state.headAdmin &&
                                 <th>click on button to edit task</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <br/>
                    <br/>




      </div>
      );
      }

}

export default Signed;





class TableRow extends React.Component {

    constructor(props) {
       super(props);
       this.state = {selected:"", color: 'black', modalIsOpen: true, editConfirmed: false,
                     id:"", title: "", completed: "", wordColor:'black', value: ""
                     };
       this.isSelected=this.isSelected.bind(this)
       this.onEdit=this.onEdit.bind(this)
       this.closeModal=this.closeModal.bind(this)
       this.editTask=this.editTask.bind(this)

       this.handleChange = this.handleChange.bind(this);

      }


isSelected() {
    if (this.state.selected==="") {
       this.setState({ selected: '#d6d6d6', color: 'white' });
       }
    else {this.setState({ selected: "", color: 'black' });}
   }
onEdit(){
  this.setState({ editConfirmed:true });
  console.log(this.state.editConfirmed)
}

 closeModal() {
    this.setState({editConfirmed: false});
  }

editTask(e){
e.preventDefault();

 if(!e.target.elements.title.value || !this.state.value ){
   this.closeModal()
 }
else {
    let title=e.target.elements.title.value;
      // let completed=e.target.elements.completed.value.toLowerCase();
      let completed = this.state.value;
      console.log(this.state.value)
    if(completed==="true") {
    this.setState({title: title, completed: completed, wordColor:'blue'})
    this.closeModal()
         }
    else{
      this.setState({title: title, completed: completed, wordColor:'red'})
      this.closeModal()
      }

  }
}



componentDidMount() {
  if (this.props.completed==='true') {
this.setState({title: this.props.title, completed: this.props.completed, wordColor:'blue'});
      }
  else{
    this.setState({title: this.props.title, completed: this.props.completed, wordColor:'red'});
    }


}


handleChange(event) {
     this.setState({value: event.target.value});
   }

render() {

     return(  <tr onClick={this.isSelected}
       style={{backgroundColor: this.state.selected, color: this.state.color}}

       >
                    <td>{this.props.id}</td>
                    <td>{this.state.title}</td>
      <td  style={{ fontSize:'16px', fontStyle: 'italic', color:this.state.wordColor}}

         >{JSON.stringify(this.state.completed)}</td>

                     {this.props.headAdmin &&

                    <td style={{backgroundColor: 'white'}}><button onClick={this.onEdit} >Edit</button></td>}


               {this.state.editConfirmed===true &&
                 <Modal
        className="editmodal"
       isOpen={this.state.modalIsOpen}
       ariaHideApp={false}
       contentLabel="Example Modal">
        <div className="Center">


    {/* <form onSubmit={this.editTask} >
       <input type="text" placeholder="title" name="title"/>
       <input type="text" placeholder="true or false" name="completed"/>



       <button >Edit task</button>
       </form> */}
      <div>task id: {this.props.id}
      <form onSubmit={this.editTask}>
      <input type="text" placeholder="task" name="title"/>
      <label>

        <select value={this.state.value} onChange={this.handleChange}>
          <option value="">completed</option>
          <option value="true">yes</option>
          <option value="false">no</option>

        </select>
      </label>
      <input type="submit" value="Confirm" />
     </form>
      </div>





             </div>
        </Modal>


      }

         </tr>
              );
         }


}



class Adminlist extends React.Component {
  constructor(props) {
  super(props);
   this.state = {registered:[], id:"", email:""}
}

componentDidMount(){
  const database = firebase.database();
   database.ref('registered').on('value', (snapshot) => {
    const val = snapshot.val();




    console.log(val)


    const arrayUsers = [];
    snapshot.forEach((childSnapshot) => {
       arrayUsers.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
       });
     })
       console.log(arrayUsers)
      this.setState({registered: arrayUsers, id:arrayUsers.id, email:arrayUsers.email});
          // console.log(this.state.id)

  })
}

  render(){
    let rows=[];
    let reg=this.state.registered;
    console.log(reg)
      for(let i = 0; i < reg.length; i++) {
      const us = reg[i];


      const tr=<User key={us.id} id={us.id} headAdmin={us.headAdmin} email={us.email} username={us.username}/>
        rows.push(tr);
      }
  console.log(rows)

return(
<div>
  <table >
     <thead>
         <tr>
             <th>Username</th>
             <th>Email</th>
             <th>Admin</th>
             <th>Edit Admin</th>
         </tr>
     </thead>
     <tbody>
         {rows}
     </tbody>
 </table>
</div>)






    }
}

// const User = (props) => {
class User extends React.Component {
  constructor(props) {
  super(props);
   this.state = {value:"", id:"", email:""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {

   event.preventDefault();
   let id=this.props.id;
   let value=this.state.value;
   console.log(id)
    const database = firebase.database();
   if (this.state.value==="yes") {

    database.ref('registered/'+id).update({headAdmin: value});
        }
    else if (this.state.value==="no") {
      database.ref('registered/'+id+'/headAdmin').set({});
    }


 }

handleChange(event) {
     this.setState({value: event.target.value});
   }
   render() {
    return (
         <tr>
         <td>{this.props.username}</td>
         <td>{this.props.email}</td>
         <td className="center">{this.props.headAdmin}</td>
         <td><form onSubmit={this.handleSubmit}>
        <label>

          <select value={this.state.value} onChange={this.handleChange}>
            <option value=""></option>
            <option value="yes">yes</option>
            <option value="no">no</option>

          </select>
        </label>
        <input type="submit" value="Confirm" />
      </form></td>

          </tr>
    )
  }
}
