import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import RequestForgeries from './csrf/RequestForgeries';
import SensitiveData from './sensitivedata/SensitiveData';
import SqlInjection from './sqlinjection/SqlInjection';
import CrossSite from './xss/CrossSite';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loggedIn: false, signUpForm: false, signedInUser: ""};
  }

  handleSignUp = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { username, password, password1 } = document.forms[0];
    username = username.value.toString()
    password = password.value.toString()
    password1 = password1.value.toString()
    if(username && password && password1){
      if(password.toString() === password1.toString()){
        console.log("Passwords do match.");
        //Signing up finally
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
          body: JSON.stringify({ username: username, password: password }),
          mode: 'cors'
        };
        fetch('http://127.0.0.1:5000/signup', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("sign-up-status" in actualData){
              if(actualData["sign-up-status"] === "SUCCESS"){
                this.setState({loggedIn: false, signUpForm: false, signedInUser: ""})
              }
              else{
                alert("Sign up failed! Try Again.")
              }
            }
          })
          .catch((err) => {
            console.log(err.message);
           });

      }
      else{
        alert("Passwords Do Not Match");
      }
    }

  };

  signUp = () => {
    return (
      <div>    
            <form onSubmit={this.handleSignUp}>  
                <div className="container">  
                    <p>Student Sign Up</p>    
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Your PSU User Alias" name="username" required/>  
                    {/* {renderErrorMessage("username")} */}
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter A Strong Password" name="password" required/>  
                    {/* {renderErrorMessage("password")} */}
                    <label>Confirm Password : </label>   
                    <input type="password" placeholder="Re-Enter Your Password" name="password1" required/>  
                    {/* {renderErrorMessage("password1")} */}
                    <button type="submit">Sign Up</button>   
                </div>   
            </form>     
        </div>   
    );
  }

  bringupsignup = (event) => {
    //Prevent page reload
    event.preventDefault();
    this.setState({loggedIn: false, signUpForm: true});
  }

  handleLogin = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { username, password } = document.forms[0];
    username = username.value.toString()
    password = password.value.toString()
    if(username && password){
        //Logging in finally
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: password }),
          mode: 'cors'
        };
        fetch('http://127.0.0.1:5000/login', requestOptions)
        .then(response => response.json())
        .then((actualData) => {
          if("log-in-status" in actualData){
            if(actualData["log-in-status"] === "SUCCESS"){
              this.setState({loggedIn: true, signUpForm: false, signedInUser: username})
            }
            else{
              alert("Log in failed! Try Again.")
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
         });
    }
    return
  }

  loginForm = () => {
    return (
      <div>    
            <form  onSubmit={this.handleLogin}>  
                <div className="container">  
                    <p>Student Login Form</p>    
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" name="username" required/>  
                    {/* {renderErrorMessage("username")} */}
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" name="password" required/>  
                    {/* {renderErrorMessage("password")} */}
                    <button type="submit" name="login">Login</button>   
                    <div className="divider"/>
                    <button type="submit" name="signup" onClick={this.bringupsignup}>New User ?</button>   
                </div>   
            </form>    
        </div>   
    );
  };

  handleLogout = (event) => {
    if(this.state.loggedIn === true){
      this.setState({loggedIn: false, signUpForm: false, signedInUser: ""});
    }
    return;
  }

  render() {
    // console.log("App Render Called.... ");

    var auth_flow, student_id;

    if(this.state.loggedIn === true){
      auth_flow = (<div>
        <div className="divider"/>
        <SqlInjection></SqlInjection>
        <div className="divider"/>
        <SensitiveData></SensitiveData>
        <div className="divider"/>
        <CrossSite></CrossSite>
        <div className="divider"/>
        <RequestForgeries></RequestForgeries>
        <div className="divider"/>
      </div>)
    } else{
      if(this.state.signUpForm === true){
        auth_flow = this.signUp();
      }
      else{
        auth_flow = this.loginForm();
      }
    }

    if(this.state.loggedIn === true){
      student_id = (<p className='right-button'>Hi, {this.state.signedInUser}!</p>)
    }

    return (
      <div>
        <div>
          <header className="App-header">
            <p>
              Welcome to CSE543 - Web Security Lab
            </p>
            {student_id}
          </header>
          <button name="logout" className='right-button' onClick={this.handleLogout}>Log Out</button>

        </div>
      <div className="App">
        {auth_flow}
      </div>
      </div>
      
    );
  };

}

export default App;
