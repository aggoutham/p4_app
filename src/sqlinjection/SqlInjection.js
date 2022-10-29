import { render } from '@testing-library/react';
import React, { Component } from 'react';

class SqlInjection extends React.Component {

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
            this.setState({t1: false})
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

        var fname = event.target[0].value.toString();
        var empId = event.target[1].value.toString();

        alert(fname + " " + empId);
    }

    getTask1 = () => {
        var answer = this.state.t1_answer
        return (<div>
            <p>There is a database that handles employee data in an organization. A website was designed for employees for viewing their own data in the company’s database.  
            Assume that you are one of the employees from this company KAREN MATTHEWS. Employees can only read their own data once they enter their First Name and  
            Employee ID in the following input boxes. Your employee Id is 8924.  
             
            You are curious to see the information (like salary, commission etc.) of your co-workers too. See if you can use this search feature to expose ALL employee data. </p>
            <form  onSubmit={this.t1search}>  
                <div className='question-container'>  
                    <p>Employee Database</p>    
                    <label>First Name : </label>   
                    <input type="text" placeholder="Enter first name" name="fname" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>Employee ID : </label>   
                    <input type="text" placeholder="Enter Emp ID" name="empID" className='small-input-box' required/>  
                    <div className="vertical-divider"/>
                    <button type="submit" name="employeeData">Search</button>   
                </div>   
            </form>  
            {answer}
            </div>)
    }

    getTask2 = () => {

        return (<div>Task 1.2 Contents</div>)
    }

    getTask3 = () => {

        return (<div>Task 1.3 Contents</div>)
    }

    getTask4 = () => {

        return (<div>Task 1.4 Contents</div>)
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
                    <p className='task-title'>Task 1.1</p>
                    <button name="expand" onClick={this.handleT1} className="task-button">Toggle</button>
                    {t1}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 1.2</p>
                    <button name="expand" onClick={this.handleT2} className="task-button">Toggle</button>
                    {t2}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 1.3</p>
                    <button name="expand" onClick={this.handleT3} className="task-button">Toggle</button>
                    {t3}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 1.4</p>
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
                    1. SQL Injection Tasks
                </p>
                {toggle}
                {expand_tasks}
            </div>
        )
    }
}

export default SqlInjection;