import { render } from '@testing-library/react';
import React, { Component } from 'react';

class SensitiveData extends React.Component {

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
            this.setState({t1: false, t1_answer: ""})
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

    t1searchinitial = (event) => {
        //Prevent page reload
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  username: "test", password: "PlainTextPasswordsAreVeryRisky" }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/ttwoone', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            return;
        })
    }

    t1search = (event) => {
        //Prevent page reload
        event.preventDefault();

        var password = event.target[0].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signedInUser:this.props.signedInUser, password: password, username: "test" }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/ttwooneprime', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("status" in actualData){
                this.setState({t1_answer: actualData["status"]})
            }
        })
    }

    getTask1 = () => {

        var answer = this.state.t1_answer;
        return (<div>
                <div className='vertical-divider'></div>
                <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
                <form  onSubmit={this.t1searchinitial}>  
                    <div className='question-container'>  
                        <button type="submit" name="testUser">Login</button>   
                    </div>   
                </form>  
                <div className='vertical-divider'></div>
                <p>Once you successfully finish the above task, you will receive the "test" user's password. Enter that password below to complete the task - </p>
                <div className='vertical-divider'></div>
                <form  onSubmit={this.t1search}>  
                    <div className='question-container'>  
                        <p>Enter the Password of "test" user :-</p>    
                        <input type="text" placeholder="Enter password" name="testPass" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <button type="submit" name="testUser">Check</button>   
                    </div>   
                </form>  
                <p>{answer}</p>
                </div>)
    }

    getTask2 = () => {

        return (<div>Task 2.2 Contents</div>)
    }

    getTask3 = () => {

        return (<div>Task 2.3 Contents</div>)
    }

    getTask4 = () => {

        return (<div>Task 2.4 Contents</div>)
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
                    <p className='task-title'>Task 2.1 (20 points)</p>
                    <button name="expand" onClick={this.handleT1} className="task-button">Toggle</button>
                    {t1}
                </div>
                {/* <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 2.2</p>
                    <button name="expand" onClick={this.handleT2} className="task-button">Toggle</button>
                    {t2}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 2.3</p>
                    <button name="expand" onClick={this.handleT3} className="task-button">Toggle</button>
                    {t3}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 2.4</p>
                    <button name="expand" onClick={this.handleT4} className="task-button">Toggle</button>
                    {t4}
                </div> */}
                <div className="divider"/>
            </div>);
            toggle = (<button name="collapse" onClick={this.handleCollapse}>Collapse</button> )
        } else{
            toggle = (<button name="expand" onClick={this.handleExpand}>Expand</button> )
        }


        return(
            <div className='section-container'>
                <p className='section-title'>
                    2. Sensitive Data Exposure Tasks (20 pts Total)
                </p>
                {toggle}
                {expand_tasks}
            </div>
        )
    }
}

export default SensitiveData;