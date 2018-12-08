import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery'

class Form extends Component {

  constructor() {
    super();
    this.state = {
        first_name: '',
        last_name: '',
        dob: '',
        location: '',
      };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    var inp1 = $(".formInput1").val()
    var inp2 = $(".formInput2").val()
    var inp3 = $(".formInput3").val()
    var inp4 = $(".formInput4").val()
    if ((inp1 === '') || (inp2 === '') || (inp3 === '') || (inp4 === '')) {
        $(':input[type="submit"]').prop('disabled', true);
    }
    if ((inp1 !== '') && (inp2 !== '') && (inp3 !== '') && (inp4 !== '')) {
        console.log('true')
        $(':input[type="submit"]').prop('disabled', false);
    }
    
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {first_name, last_name, dob, location} = this.state;
    axios.post('/users', {first_name, last_name, dob, location})
    .then((result) => {
      console.log(result)
    });
  }

  render() {
    const {first_name, last_name, dob, location} = this.state;
    return (
        <div>
            <h2>Form</h2>
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
                <button type="submit" className="formBtn" disabled>Submit</button>
            </div>    
        </div>
    )
  }
 
}
export default Form;