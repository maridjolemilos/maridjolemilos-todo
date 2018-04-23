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
  const database = firebase.database();
  database.ref(`currentUser/${this.state.id}`).set({ });

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
       <p>Welcome: {this.state.username}, ({this.state.email})</p>
       {this.state.owner &&
      <button onClick={this.openModal}>Edit admin list</button>}
              <Modal
              isOpen={this.state.modalIsOpen}
              ariaHideApp={false}
              contentLabel="Example Modal">
                <div className="Center">

                  <h1>edit admin list</h1>

                    <div className="Center">
              <button onClick={this.closeModal}>close list</button>
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
                     id:"", title: "", completed: "", wordColor:'black'
                     };
       this.isSelected=this.isSelected.bind(this)
       this.onEdit=this.onEdit.bind(this)
       this.closeModal=this.closeModal.bind(this)
       this.editTask=this.editTask.bind(this)

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

 if(!e.target.elements.title.value || !e.target.elements.completed.value ){
   this.closeModal()
 }
else {
    let title=e.target.elements.title.value;
      let completed=e.target.elements.completed.value.toLowerCase();
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
       isOpen={this.state.modalIsOpen}
       ariaHideApp={false}
       contentLabel="Example Modal">
        <div className="Center">


    <form onSubmit={this.editTask} >
       <input type="text" placeholder="title" name="title"/>
       <input type="text" placeholder="true or false" name="completed"/>



       <button >Edit task</button>
       </form>






             </div>
        </Modal>


      }

         </tr>
              );
         }


}



class Adminlist extends React.Component {

  render(){
    let rows=[];
    let reg=this.props.registered;
    console.log(reg)
    for (const id in reg) {
      console.log(id)

      const tr=<User key={id} id={id}/>
        rows.push(tr);
      }
  console.log(rows)

return(
<div>
  <table >
     <thead>
         <tr>
           <th>id</th>
             <th>email</th>
         </tr>
     </thead>
     <tbody>
         {rows}
     </tbody>
 </table>
</div>)






    }
}

const User = (props) => {
    return (
         <tr>
         <td>{props.id}</td>
         <td>{props.email}</td>
          </tr>
    )
};
