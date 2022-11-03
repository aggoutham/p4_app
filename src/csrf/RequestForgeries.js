import { render } from '@testing-library/react';
import React, { Component } from 'react';

class RequestForgeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expand: false, t1: false, t2: false, t3: false, t4: false, t1_answer: ""};
    }

    handleExpand = (event) => {
        this.setState({expand: true})
        return;
    }

    handleCollapse = (event) => {
        this.setState({expand: false})
        return;
    }

    handleT1 = (event) => {
        if(this.state.t1 === false){
            this.setState({t1: true})
        }else{
            this.setState({t1: false, t1_answer: []})
        }
        return;
    }
    handleT2 = (event) => {
        if(this.state.t2 === false){
            this.setState({t2: true})
        }else{
            this.setState({t2: false})
        }
        return;
    }
    handleT3 = (event) => {
        if(this.state.t3 === false){
            this.setState({t3: true})
        }else{
            this.setState({t3: false})
        }
        return;
    }
    handleT4 = (event) => {
        if(this.state.t4 === false){
            this.setState({t4: true})
        }else{
            this.setState({t4: false})
        }
        return;
    }

    t1search = (event) => {
        //Prevent page reload
        event.preventDefault();
        var email = event.target[0].value.toString();
        var fname = event.target[1].value.toString();
        var mobile = event.target[2].value.toString();

        var data = new FormData();
        data.append("username", this.props.signedInUser)
        data.append("email", email);
        data.append("fname", fname);
        data.append("mobile", mobile);

        const requestOptions = {
            method: 'POST',
            body: data,
            mode: 'cors'
        };
        fetch('https://cse543-web-security.aplayerscreed.com/backend/tfourone', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            console.log(actualData);
        });

        return;
    }

    t1searchprime = (event) => {
        //Prevent page reload
        event.preventDefault();

        var secret_key = event.target[0].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:this.props.signedInUser, secret_key: secret_key }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/tfouroneprime', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("status" in actualData){
                this.setState({t1_answer: actualData["status"]})
            }
        })
    }

    getTask1 = () => {

        return (
            <div>
                <div className='vertical-divider'></div>

                <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
                
                <form  onSubmit={this.t1search}>  
                    <div className='question-container'>  
                        <p>Register to Share your Data! (BEWARE... We take user data only with consent)</p>    
                        <label>Email ID : </label>   
                        <input type="text" placeholder="Enter valid email" name="email" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <label>First Name : </label>   
                        <input type="text" placeholder="Enter first name" name="fname" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <label>Mobile Number : </label>   
                        <input type="text" placeholder="Enter phone number" name="mobile" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <button type="submit" name="dataForm">Register!</button>   
                    </div>   
                </form>  


                <div className='vertical-divider'></div>
                <p>Once you successfully finish the above task, you will receive a Secret Key. Enter the Secret Key below - </p>
                <div className='vertical-divider'></div>

                <form  onSubmit={this.t1searchprime}>  
                    <div className='question-container'>    
                        <label>Secret Key : </label>   
                        <input type="text" placeholder="Enter secret key" name="key" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <button type="submit" name="checkform">Check!</button>   
                    </div>   
                </form>  
                <p>{this.state.t1_answer}</p>
            </div>

        );
    }

    getTask2 = () => {

        return (<div>Task 4.2 Contents</div>)
    }

    getTask3 = () => {

        return (<div>Task 4.3 Contents</div>)
    }

    getTask4 = () => {

        return (<div>Task 4.4 Contents</div>)
    }


    render (){
        var expand_tasks, toggle, t1, t2, t3, t4

        if(this.state.t1 === true){
            t1 = this.getTask1()
        }
        if(this.state.t2 === true){
            t2 = this.getTask2()
        }
        if(this.state.t3 === true){
            t3 = this.getTask3()
        }
        if(this.state.t4 === true){
            t4 = this.getTask4()
        }

        if(this.state.expand === true){
            expand_tasks = (<div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 4.1</p>
                    <button name="expand" onClick={this.handleT1} className="task-button">Toggle</button>
                    {t1}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 4.2</p>
                    <button name="expand" onClick={this.handleT2} className="task-button">Toggle</button>
                    {t2}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 4.3</p>
                    <button name="expand" onClick={this.handleT3} className="task-button">Toggle</button>
                    {t3}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 4.4</p>
                    <button name="expand" onClick={this.handleT4} className="task-button">Toggle</button>
                    {t4}
                </div>
                <div className="divider"/>
            </div>);
            toggle = (<button name="collapse" onClick={this.handleCollapse}>Collapse</button> )
        } else{
            toggle = (<button name="expand" onClick={this.handleExpand}>Expand</button> )
        }


        return(
            <div className='section-container'>
                <p className='section-title'>
                    4. CSRF Request Forgery Tasks
                </p>
                {toggle}
                {expand_tasks}
            </div>
        )
    }
}

export default RequestForgeries;