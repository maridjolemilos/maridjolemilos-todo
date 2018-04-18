import React from 'react';
import Modal from 'react-modal';
import fetch from 'cross-fetch'
import './index.css';


class Signed extends React.Component {
    constructor(props) {
    super(props);
    this.state = {user: [], email:[], selected:""};
    this.onDelete=this.onDelete.bind(this)
    this.onAdd=this.onAdd.bind(this)

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



componentDidUpdate() {
    console.log(this.state.user)
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

    const json=localStorage.getItem('email');
    console.log(json);
    const email=JSON.parse(json)
    this.setState({ email:email });
    }



render() {
    let rows = [];

    for(let i = 0; i < this.state.user.length; i++){
                    const us = this.state.user[i];
                    const tr = <TableRow key={us.id} id={i+1} title={us.title}
                     completed={JSON.stringify(us.completed)} email={this.state.email}  />
                    rows.push(tr);
                }

    return(<div id="users">
       <p>Welcome: {this.state.email}</p>

        {this.state.email==="mixy80@gmail.com" &&
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
                                {this.state.email==="mixy80@gmail.com" &&
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

                     {this.props.email==="mixy80@gmail.com" &&

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
