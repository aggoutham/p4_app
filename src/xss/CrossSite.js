import { render } from '@testing-library/react';
import React, { Component } from 'react';

class CrossSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expand: false, t1: false, t2: false, t3: false, t4: false, t1_answer: ""};
    }

    simulateXSS = (userInput) => {
        var final = ""
        var inputScript = ""
        var script_premise = "<img src='' onerror='$$$' />"

        var lowInput = userInput.toLowerCase();
        var trigger = 0;

        if(lowInput.includes("<script>") && lowInput.includes("</script>")){
            trigger = 1;
            inputScript = lowInput.replace("<script>", "");
            inputScript = inputScript.replace("</script>", "");
            inputScript = inputScript.replace('"', '\"');
        }
        if(lowInput.includes("<script") && lowInput.includes("/>")){
            trigger = 1;
            inputScript = lowInput.replace("<script", "");
            inputScript = inputScript.replace("/>", "");
            inputScript = inputScript.replace('"', '\"');
        }

        if(trigger===1){
            final = script_premise.replace('$$$', inputScript);
        } else{
            final = userInput
        }
        return final;

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

    t1search = (event) => {
        //Prevent page reload
        event.preventDefault();
        // var email = event.target[0].value.toString();
        // var age = event.target[1].value.toString();
        // var fname = event.target[2].value.toString();
        // var mname = event.target[3].value.toString();
        // var lname = event.target[4].value.toString();
        var street = event.target[5].value.toString();
        // var mobile = event.target[6].value.toString();

        var final = this.simulateXSS(street);
        this.setState({t1_answer: final});

        return;
    }


    getTask1 = () => {
        var answer = this.state.t1_answer;

        return (<div>
            <p>Cross-Site Scripting (also known as XSS) attacks are a type of injection attacks where attackers inject malicious Javascript snippets or 
                HTML tags into trusted web servers and cause unexpected behaviors. Primarily, this occurs when a Web Server blindly trusts all its clients. 
                There are different types of XSS attacks like Reflected XSS, Stored XSS and DOM based XSS attacks. </p>

            <p>In a real example, a reflected XSS attack can be triggered by an attacker who exploits a web application’s inability to sanitize 
                some of the user inputs that it receives. If the same web application is then used by a benign user, the attacker input may appear on the 
                webpage as a runnable Javascript element. This could let the benign user’s browser run a malicious script sent by the attacker and could 
                cause unwanted behaviors for the user. </p>

            <p>This is a good read for understanding Reflected XSS attacks :- https://portswigger.net/web-security/cross-site-scripting/reflected</p>

            <p>In this task, however, we wouldn’t be performing a real example of Reflected XSS attack. The motivation of this task is to introduce you
                 to the domain of Cross-Site scripting. Below is a form within a web application that lets users register for some event. As an attacker, 
                 your goal is to first figure out if any part of this section is vulnerable to XSS attack or not ? </p>

            <p>If yes, explain what it is and how did you arrive to the conclusion ?</p>

            <p>If no, state that there is no scope for XSS attacks. Why ? What all actions did you try ? </p>

            <div className='vertical-divider'></div>

            <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
            
            <form  onSubmit={this.t1search}>  
                <div className='question-container'>  
                    <p>RSVP to the Annual Security Researchers Meet!</p>    
                    <label>Email ID : </label>   
                    <input type="text" placeholder="Enter valid email" name="email" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>Age : </label>   
                    <input type="text" placeholder="Enter age" name="age" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>First Name : </label>   
                    <input type="text" placeholder="Enter first name" name="fname" className='small-input-box' required/> 
                    <div className="vertical-divider"/>
                    <label>Middle Name : </label>   
                    <input type="text" placeholder="optional middle name" name="mname" className='small-input-box'/> 
                    <div className="vertical-divider"/>
                    <label>Last Name : </label>   
                    <input type="text" placeholder="optional last name" name="lname" className='small-input-box'/> 
                    <div className="vertical-divider"/>  
                    <label>Street Address : </label>   
                    <input type="text" placeholder="optional street address" name="street" className='small-input-box'/> 
                    <div className="vertical-divider"/>
                    <label>Mobile Number : </label>   
                    <input type="text" placeholder="optional phone number" name="mobile" className='small-input-box'/> 
                    <div className="vertical-divider"/>
                    <button type="submit" name="eventForm">Register!</button>   
                </div>   
            </form>  
            <div dangerouslySetInnerHTML={{__html: answer}} />
            </div>)
    }

    getTask2 = () => {

        return (<div>Task 3.2 Contents</div>)
    }

    getTask3 = () => {

        return (<div>Task 3.3 Contents</div>)
    }

    getTask4 = () => {

        return (<div>Task 3.4 Contents</div>)
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
                    <p className='task-title'>Task 3.1</p>
                    <button name="expand" onClick={this.handleT1} className="task-button">Toggle</button>
                    {t1}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 3.2</p>
                    <button name="expand" onClick={this.handleT2} className="task-button">Toggle</button>
                    {t2}
                </div>
                {/* <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 3.3</p>
                    <button name="expand" onClick={this.handleT3} className="task-button">Toggle</button>
                    {t3}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 3.4</p>
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
                    3. XSS Cross Site Scripting Tasks
                </p>
                {toggle}
                {expand_tasks}
            </div>
        )
    }
}

export default CrossSite;