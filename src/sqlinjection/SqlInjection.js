import { render } from '@testing-library/react';
import React, { Component } from 'react';

class SqlInjection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expand: false, t1: false, t2: false, t3: false, t4: false, t1_answer: [], t2_answer: [], t3_answer: [], t4_answer: ""};
    }

    renderTableCustom = (arrOfArr) => {

        return (<table>
            <tbody>
                {arrOfArr.map((row,index) => {
                    return( <tr key={index}>
                                {row.map((col,i) => {
                                    return( <td key={i}>{col}</td> )
                                })}
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>);

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
            this.setState({t2: false, t2_answer: []})
        }
        return;
    }
    handleT3 = (event) => {
        if(this.state.t3 === false){
            this.setState({t3: true})
        }else{
            this.setState({t3: false, t3_answer: []})
        }
        return;
    }
    handleT4 = (event) => {
        if(this.state.t4 === false){
            this.setState({t4: true})
        }else{
            this.setState({t4: false, t4_answer: ""})
        }
        return;
    }

    t1search = (event) => {
        //Prevent page reload
        event.preventDefault();

        var fname = event.target[0].value.toString();
        var empID = event.target[1].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname: fname, empID: empID, username:this.props.signedInUser }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/toneone', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("lines" in actualData){
                this.setState({t1_answer: actualData["lines"]})
            }
        })
    }

    t2search = (event) => {
        //Prevent page reload
        event.preventDefault();

        var fname = event.target[0].value.toString();
        var age = event.target[1].value.toString();
        var accountID = event.target[2].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname: fname, age: age, accountID: accountID, username:this.props.signedInUser }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/tonetwo', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("lines" in actualData){
                this.setState({t2_answer: actualData["lines"]})
            }
        })
    }

    t3search = (event) => {
        //Prevent page reload
        event.preventDefault();

        var fname = event.target[0].value.toString();
        var empID = event.target[1].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname: fname, empID: empID, username:this.props.signedInUser }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/tonethree', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("lines" in actualData){
                this.setState({t3_answer: actualData["lines"]})
            }
        })
    }

    t4search = (event) => {
        //Prevent page reload
        event.preventDefault();

        var password = event.target[0].value.toString();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:this.props.signedInUser, password: password }),
            mode: 'cors'
          };
          // fetch('http://127.0.0.1:5000/login', requestOptions)
          fetch('https://cse543-web-security.aplayerscreed.com/backend/checksecret', requestOptions)
          .then(response => response.json())
          .then((actualData) => {
            if("status" in actualData){
                this.setState({t4_answer: actualData["status"]})
            }
        })
    }

    getTask1 = () => {
        var content = this.state.t1_answer;
        var answer = this.renderTableCustom(content);

        return (<div>
            <p>There is an EMPLOYEES table in a database that handles employee data in an organization. A website was designed for employees for viewing their own data in the company’s database.  
            Assume that you are one of the employees from this company KAREN MATTHEWS. Employees can only read their own data once they enter their First Name and  
            Employee ID in the following input boxes. Your employee Id is 8924.  
             
            You are curious to see the information (like salary, commission etc.) of your co-workers too. See if you can use this search feature to expose ALL employee data. </p>
            <div className='vertical-divider'></div>
            <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
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
        var content = this.state.t2_answer;
        var answer = this.renderTableCustom(content);

        return (<div>
            <p>There is a BANK table in a database that stores information of customer accounts for a bank. Imagine you are an internal employee who likes to find vulnerabilities in 
            the bank’s systems. There is a website designed for your organization for searching the details of a given customer. Your goal is to create a bank account (a row in the 
            table) for yourself with some bank account balance. 

            NOTE - Use your first name and last name to successfully finish the task.  </p>
            <div className='vertical-divider'></div>
            <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
            <form  onSubmit={this.t2search}>  
                <div className='question-container'>  
                    <p>Bank Database</p>    
                    <label>Customer First Name : </label>   
                    <input type="text" placeholder="Enter first name" name="fname" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>Age : </label>   
                    <input type="text" placeholder="Enter Customer Age" name="age" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>Account ID : </label>   
                    <input type="text" placeholder="Enter Account ID" name="accountID" className='small-input-box' required/>  
                    <div className="vertical-divider"/>
                    <button type="submit" name="bankData">Search</button>   
                </div>   
            </form>  
            {answer}
            </div>)
    }

    getTask3 = () => {
        var content = this.state.t3_answer;
        var answer = this.renderTableCustom(content);

        return (<div>
            <p>After the data exposure incident in Task 1.1, the developers in the organization started adding input sanitization techniques to curb SQL injection attacks. The developers assumed that there
                are no space characters or SQL keywords (SELECT, INSERT, UPDATE, WHERE, etc.) in the required fields for search. Therefore, whenever they receive such a malicious request, they just trim
                out the space characters and SQL keywords from the input and continue with the search. See if you can now expose ALL employee data again. You may use details of KAREN MATTHEWS here too.  </p>
            <div className='vertical-divider'></div>
            <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
            <form  onSubmit={this.t3search}>  
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

    getTask4 = () => {

        var answer = this.state.t4_answer;
        return (<div><p>There is a LOGIN table in our database that stores information of your usernames (PSU aliases) and passwords for this assignment. That’s how you could login into this website
                         using your credentials provided by the course staff. Now, there is also another user with username as “secret_user”. Find that user’s password! (By any means possible).</p>
                <div className='vertical-divider'></div>
                <p>Hint :- It is guaranteed that the password consists of only lowercase english alphabet letters. </p>
                <div className='vertical-divider'></div>
                <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
                <form  onSubmit={this.t4search}>  
                    <div className='question-container'>  
                        <p>secret_user's password :-</p>    
                        <input type="text" placeholder="Enter password" name="secretUserPass" className='small-input-box' required/> 
                        <div className="vertical-divider"/>
                        <button type="submit" name="secretUser">Confirm</button>   
                    </div>   
                </form>  
                <p>{answer}</p>
                </div>)

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