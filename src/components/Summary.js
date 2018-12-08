import React, { Component } from 'react';
import axios from 'axios';

class Summary extends Component {

  constructor() {
    super();
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
      var newuser = this.state.users;
      function timeConversion(millisec) {
        var seconds = (millisec / 1000).toFixed(1);
        var minutes = (millisec / (1000 * 60)).toFixed(1);
        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) {
            return seconds;
        } else if (minutes < 60) {
            return minutes;
        } else if (hours < 24) {
            return hours
        } else {
            return +days
        }
      }
      function Age(arr) {
        var ageArr =[];
        for (let i = 0; i < newuser.length; i++) {
            ageArr[i] = (new Date() - new Date(arr[i].dob));
        }
        
        ageArr = ageArr.sort()
        var user1 = Math.round(timeConversion(ageArr[ageArr.length-1])) 
        var user2 = Math.round(timeConversion(ageArr[ageArr.length-2])) 
        var user3 = Math.round(timeConversion(ageArr[ageArr.length-3])) 
        let ret = Math.trunc((user1+user2+user3)/356)
        return ret
      }
      function Long(arr) {
        var long=0;
        var longStr ='';
        for (let i = 0; i < arr.length; i++) {
            var buff = arr[i].first_name+' '+arr[i].last_name;
            if (buff.length>long) {
                long = buff.length;
                longStr = buff;
            }
        }
        return longStr
      }
      function Kiev(arr) {
        var countKiev = 0;
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i].location === 'Kiev')||(arr[i].location === 'kiev')) countKiev++
        }
        return countKiev
      }
      const kiev = Kiev(newuser);
      const long = Long(newuser);
      const age = Age(newuser);

    return (
        <div>
            <h2>Summary</h2>
            <p>Number of users from Kiev or kiev: {kiev}</p>
            <p>Sum of ages of three oldest users: {long}</p>
            <p>Longest string of first name + last name: {age}</p>
        </div>
    )
  }
 
}
export default Summary;