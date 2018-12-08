import React, { Component } from 'react';
import axios from 'axios';
import './components.css'
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement(document.getElementById('root'));

class Table extends Component {

  constructor() {
    super();
    this.state = {
        users: [],
        modalIsOpen: false,
        id: 0,
        first_name: '',
        last_name: '',
        dob: '',
        location: '',
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this); 
      this.saveModal = this.saveModal.bind(this);  
  }
  componentDidMount() {
    axios.get('/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onDelete(id){
    axios.delete('/users/'+ id)
        .then((result) => { 
            console.log('user deleted');

            axios.get('/users')
                .then(res => {
                    this.setState({ users: res.data });
                })
                .catch((error) => {
                    console.log('error');
                });
        });
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  saveModal(e) {
    e.preventDefault();
	
    const {id, first_name, last_name, dob, location} = this.state;

    axios.put('/users/'+id, {first_name, last_name, dob, location})
      .then((result) => {
        console.log(result)

        axios.get('/users')
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch((error) => {
            console.log('error');
        });

      })
      .catch((error) => {
        console.log('error');
      }); 
    this.setState({modalIsOpen: false});   
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onEdit(id){
    this.setState({modalIsOpen: true});
    for (let i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].id === id ) {
            this.setState({
                id: id, 
                first_name: this.state.users[i].first_name,
                last_name: this.state.users[i].last_name,
                dob: this.state.users[i].dob,
                location: this.state.users[i].location,
            });
        }
    }   
       
  }

  render() {
    const {first_name, last_name, dob, location} = this.state;
    return (
        <div>
           <h2>Table</h2> 
           <table id="tableUsers">
                <thead>
                    <tr>
                        <th>First Nane</th>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user =>
                        <tr key={user.id}>
                            <th>{user.first_name}</th> 
                            <th>{user.last_name}</th> 
                            <th>{user.dob}</th> 
                            <th>{user.location}</th> 
                            <th><button className="cntrlBtn" onClick={this.onEdit.bind(this,user.id)}>Edit</button><button className="cntrlBtn" onClick={this.onDelete.bind(this,user.id)}>Delete</button></th> 
                        </tr>
                    )} 
                </tbody>
           </table>
           <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >

            <h2 ref={subtitle => this.subtitle = subtitle}>Edit window</h2>
            <button className="closeBtn" onClick={this.closeModal}>close</button>
            <form>
                <div className="formLine">
                    <p className="formP">First Name</p><input className="formInput1" type="text" name="first_name" value={first_name} onChange={this.onChange}/>
                </div>
                <div className="formLine">
                    <p className="formP">Last Name</p><input className="formInput2" type="text" name="last_name" value={last_name} onChange={this.onChange}/>
                </div>
                <div className="formLine">
                    <p className="formP">Date of birth</p><input className="formInput3" type="date" name="dob" value={dob} onChange={this.onChange}/>
                </div>
                <div className="formLine">
                    <p className="formP">Location</p><input className="formInput4" type="text" name="location" value={location} onChange={this.onChange}/>
                </div>
                <div className="formLine">
                    <button className="editSave" onClick={this.saveModal}>Save</button>
                </div>  
            </form>
        </Modal>
        </div>
    )
  }
 
}
export default Table;