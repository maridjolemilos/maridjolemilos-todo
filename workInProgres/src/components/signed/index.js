import React from 'react';
import Modal from 'react-modal';
import fetch from 'cross-fetch'
import './index.css';
import firebase from '../../firebase/firebase';

class Signed extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: [], email:[], selected:"", fire: "",headAdmin: "", value:"",
                  delmodalIsOpen: false, deleted: [], maxId:"",
                  owner:"", id:"",  modalIsOpen: false, username:"", registered:[], assignee:[]};
    this.onDelete=this.onDelete.bind(this)
    this.onAdd=this.onAdd.bind(this)
    this.openModal=this.openModal.bind(this)
    this.closeModal=this.closeModal.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.delModal=this.delModal.bind(this)
    this.closedelModal=this.closedelModal.bind(this)
  }


onDelete(e) {
    e.preventDefault();
      let array = this.state.user;
    const maxValue = Math.max(...array.map(o => o.id));
    if(!e.target.elements.num.value || e.target.elements.num.value>maxValue){
        e.target.elements.num.value="";
        return;
    }
    let num=e.target.elements.num.value;
    console.log(num);

    let num1=num-1;
    console.log(num1);
    // let ar=this.state.user.length;
    // let index=array[num1].id;
    // console.log(index, 'jaaaaaa');
    // array.splice(num1,1);
    console.log(array);
    // this.setState({user: array});
    // console.log(this.state.user)
    e.target.elements.num.value="";


    // console.log(maxValue)
    // this.setState({ maxId: maxValue });
    // console.log(this.state.maxId, 'IDIDID')


    const result = array.find( obj => obj.id == num);
    console.log(result);
    // this.setState({deleted: result});




const database = firebase.database();
database.ref(`todo/-LBEn_DgH_hZwz_MJR3C/${num1}`).set({ });

const ass=result.assignee ? result.assignee : "";

database.ref(`todo/deleted/${result.id-1}`).update({

        assignee: ass,
        title: result.title,
        completed: result.completed,
        id: result.id,
        userId: 1

});







    }

onAdd(e) {
    e.preventDefault();
    if(!e.target.elements.title.value || !this.state.value ){
       return;
    }
    let title=e.target.elements.title.value;
    let completed=JSON.parse(this.state.value);
    let array = this.state.user;
    // let newelement={ title:title, completed:completed }
let id=this.state.user.length;

    // this.setState({user:[...array, newelement]});
   /*console.log(this.state.user)*/
    e.target.elements.title.value="";
    // e.target.elements.completed.value="";
    const maxValue = Math.max(...array.map(o => o.id));


    const database = firebase.database();
    database.ref(`todo/-LBEn_DgH_hZwz_MJR3C/${maxValue}`).update({

            title: title,
            completed: completed,
            id: maxValue+1,
            userId: 1

    });









    }



componentWillMount() {

     }
componentDidMount() {






    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(
    //     response => response.json()
    // )
    // .then(
    //     myJson => {
    //         console.log(myJson)
    //  let js=myJson;
    //
    //  this.setState({ user:js });
    //  let fb=js.slice(0,20);
    //  const database = firebase.database();
    //  database.ref(`todo`).push(
    //    fb
    //  );
    //
    //     }
    // )
    // .catch(
    //     error => console.error(error)
    // );




  const database = firebase.database();

  database.ref('todo/-LBEn_DgH_hZwz_MJR3C').on('value', (snapshot) => {
  // const val = snapshot.val();
  const arrayU = [];
  snapshot.forEach((childSnapshot) => {
     arrayU.push({
       id: childSnapshot.key,
       ...childSnapshot.val()
     });
   })
  console.log(arrayU, "FIRE")
   this.setState({ user:arrayU });

})




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
                 email:results.email, username:results.username, assignee:results.assignee });
 console.log(this.state.id,'to je to')
}
})


database.ref('registered').on('value', (snapshot) => {
// const val = snapshot.val();
const array = [];
snapshot.forEach((childSnapshot) => {
   array.push({
     id: childSnapshot.key,
     ...childSnapshot.val()
   });
 })
console.log(array, "tu sam")
this.setState({registered:array});
console.log(this.state.registered, "tu sam opet")
})



database.ref('todo/deleted').on('value', (snapshot) => {
// const val = snapshot.val();
const arrayD = [];
snapshot.forEach((childSnapshot) => {
   arrayD.push({
     id: childSnapshot.key,
     ...childSnapshot.val()
   });
 })
console.log(arrayD, "DELETED")
 this.setState({ deleted:arrayD });

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

// componentWillUpdate(nextProps, nextState) {
//
//   const database = firebase.database();
//
//   database.ref('todo/-LB4nLNya2o0Dw1wZRm5').on('value', (snapshot) => {
//   // const val = snapshot.val();
//   const arrayU = [];
//   snapshot.forEach((childSnapshot) => {
//      arrayU.push({
//        id: childSnapshot.key,
//        ...childSnapshot.val()
//      });
//    })
//   console.log(arrayU, "FIRE")
// if(this.state.user !==arrayU) {
//
//
//    this.setState({ user:arrayU });
//     }
//     })
//
// }



openModal() {
  this.setState({ modalIsOpen:true });
}
 closeModal() {
   this.setState({ modalIsOpen:false });
 }

 handleChange(event) {
      this.setState({value: event.target.value});
    }

delModal() {
  this.setState({ delmodalIsOpen:true });
}
closedelModal() {
  this.setState({ delmodalIsOpen:false });
}

render() {
    let rows = [];

    for(let i = 0; i < this.state.user.length; i++){
                    const us = this.state.user[i];
                    const tr = <TableRow key={us.id} id={us.id} title={us.title}
                     completed={JSON.stringify(us.completed)}
                     // completed={us.completed}
                     assignee={us.assignee}
                     email={this.state.email}
                     headAdmin={this.state.headAdmin} registered={this.state.registered} />
                    rows.push(tr);
                }


        let del = [];

          for(let i = 0; i < this.state.deleted.length; i++){
                            const dl = this.state.deleted[i];
                           const rr = <Modalrow key={dl.id} id={dl.id} title={dl.title}
                           completed={JSON.stringify(dl.completed)}
                           assignee={dl.assignee} />

             del.push(rr);
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
             <div id="deltasks">
             <button onClick={this.delModal}>Deleted tasks</button>
              </div>
              <Modal
             className="modal"
             isOpen={this.state.delmodalIsOpen}
             ariaHideApp={false}
             contentLabel="Example Modal">
             <div onClick={this.closedelModal}>

                                    <table className="completed">
                                       <thead>
                                           <tr>
                                               <th >id</th>
                                               <th >task</th>
                                              <th >completed</th>
                                               <th >assignee</th>
                                             </tr>
                                             </thead>
                                             <tbody>
                                                 {del}
                                             </tbody>
                                           </table>

             </div>

              </Modal>





        {this.state.headAdmin &&
        <div className="scroll">
       <form onSubmit={this.onDelete} >
       <input type="number" placeholder="id"   name="num" max={this.state.maxId}/>
       <button >Delete</button>
       </form>

       <br/>
       <form onSubmit={this.onAdd} >
       <input type="text" placeholder="title" name="title"/>
       {/* <input type="text" placeholder="completed" name="completed"/> */}


       <label>

         <select value={this.state.value} onChange={this.handleChange}>
           <option value="">completed</option>
           <option value="true">yes</option>
           <option value="false">no</option>

         </select>
       </label>





       <button >Add</button>
       </form>

       </div>

     }


                     <table className="completed">
                        <thead>
                            <tr>
                                <th >id</th>
                                <th >task</th>

                                <th >completed</th>



                                 <th >assignee</th>




                                {this.state.headAdmin &&

                                 <th >edit task</th>


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
                     id:"", title: "", completed: "", wordColor:'black', value: "", value1: "",
                     assignee: null, detailsModal: false, details: []
                     };
       this.isSelected=this.isSelected.bind(this)
       this.onEdit=this.onEdit.bind(this)
       this.closeModal=this.closeModal.bind(this)
       this.editTask=this.editTask.bind(this)

       this.handleChange = this.handleChange.bind(this);

       this.onDetails=this.onDetails.bind(this)
       this.closeDetails=this.closeDetails.bind(this)

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
  console.log(this.props.registered, "tu sam")
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
      // let complet = this.state.value;
      // let completed=JSON.parse(complet);
      let completed=this.state.value;
      console.log(this.state.value)

      let labelo=e.target.elements.selec.value;
      console.log(labelo, "labelo")


    if(completed==="true") {
    this.setState({title: title, completed: completed, wordColor:'blue', assignee: labelo})

    this.closeModal()
    const database = firebase.database();
    const assignee=this.state.assignee;
    const id=this.props.id;
    const id1=id-1;
    let complet = JSON.parse(completed);
    database.ref(`todo/-LBEn_DgH_hZwz_MJR3C/${id1}`).update({title: title, assignee: labelo, completed:complet });

         }
    else{
      this.setState({title: title, completed: completed, wordColor:'red', assignee:labelo})

      this.closeModal()
        const database = firebase.database();
        const assignee=this.state.assignee;
        const id=this.props.id;
        const id1=id-1;
        let complet = JSON.parse(completed);
      database.ref(`todo/-LBEn_DgH_hZwz_MJR3C/${id1}`).update({title: title, assignee: labelo, completed:complet });
      }



  }


}



componentDidMount() {
  if (this.props.completed==='true') {
this.setState({title: this.props.title,assignee:this.props.assignee, completed: this.props.completed, wordColor:'blue'});
      }
  else{
    this.setState({title: this.props.title,assignee:this.props.assignee, completed: this.props.completed, wordColor:'red'});
    }



}


handleChange(event) {
     this.setState({value: event.target.value});
   }

handleChangecom(event) {
    this.setState({value1: event.target.value});
}

onDetails() {
  if (!this.state.assignee){
     this.closeDetails()
  }

  else{
  this.setState({detailsModal: true});
  console.log(this.state.assignee)
  let opa=this.state.assignee;
  let results = this.props.registered.find(function (obj) { return (obj.username===opa); });
  // console.log(this.props.registered)

  console.log(results)
  this.setState({details: results});
  // console.log(results.username)
}
}

closeDetails() {
  this.setState({detailsModal: false});
}

render() {

     return(  <tr onClick={this.isSelected}
       style={{backgroundColor: this.state.selected, color: this.state.color}}

       >
                    <td>{this.props.id}</td>
                    <td id="posleft">{this.props.title}</td>
      <td  style={{ fontSize:'16px', fontStyle: 'italic', color:this.state.wordColor}}

         >{JSON.stringify(this.props.completed)}</td>


                    <td onClick={this.onDetails}>{this.props.assignee}</td>
                    <Modal
          className="detailsModal"
         isOpen={this.state.detailsModal}
         ariaHideApp={false}
         contentLabel="Example Modal">
          <div onClick={this.closeDetails} className="Center">
            <div>
            <h3>Details:</h3>

              <div>
            <p> Username:{this.state.details.username} </p>
            <p> Email:{this.state.details.email} </p>
            <p> headAdmin:{this.state.details.headAdmin} </p>
            <p> id:{this.state.details.id} </p></div>
            </div>
                         </div>
                    </Modal>





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
      <div>task id: {this.props.id} , assigneed to: {this.state.assignee}
      <form onSubmit={this.editTask}>










      <input type="text" placeholder="task" name="title" defaultValue={this.state.title}/>
      <label>

        <select value={this.state.value} onChange={this.handleChange}>
          <option value="">completed</option>
          <option value="true">yes</option>
          <option value="false">no</option>

        </select>
      </label>


        <Label registered={this.props.registered} defaultValue={this.state.value1}  />


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

class Label extends React.Component {
  constructor(props) {
  super(props);
   this.state = {registered:[], value: ""}
   this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
     this.setState({value: event.target.value});
     console.log(this.state.value)
   }

render() {

  let rows = [];


   for(let i = 0; i < this.props.registered.length; i++){
                   const us = this.props.registered[i];

                 const tr=<option key={us.id} value={us.username}>{us.username}</option>;

                 rows.push(tr);
               }

 return (


   <select name="selec" value={this.state.value} onChange={this.handleChange}>
    <option value="">assignee</option>
    {rows}
  </select>





 )



}


}


class Modalrow extends React.Component {

  render() {

       return(  <tr>
                <td>{this.props.id}</td>
                <td id="posleft">{this.props.title}</td>
                <td>{this.props.completed}</td>
                <td>{this.props.assignee}</td>

       </tr>)



}
}
