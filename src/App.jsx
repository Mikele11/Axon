import React, {Component} from 'react';
import axios from 'axios';

import Table from './components/Table.js';
import Summary from './components/Summary.js';
import Form from './components/Form.js'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
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
  render() {
    return (
      <div className="container"> 
        <Table/>
        <Summary/>
        <Form/>
      </div>
    );
  }
}

export default App;
