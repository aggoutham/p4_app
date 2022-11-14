import { render } from '@testing-library/react';
import React, { Component } from 'react';

class CrossSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expand: false, t1: false, t2: false, t3: false, t4: false, t1_answer: "", t2_answer: ""};
    }

    // Not used anymore
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
            final = ""
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
            this.setState({t2: false, t2_answer: ""})
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

        // var final = this.simulateXSS(street);
        var final = street;
        this.setState({t1_answer: final});

        return;
    }

    t2search = (event) => {
        //Prevent page reload
        event.preventDefault();
        this.setState({t2_answer: event.target[0].value.toString()});

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
            <div dangerouslySetInnerHTML={{__html: answer}} hidden/>
            </div>)
    }

    getTask2 = () => {
        var answer = this.state.t2_answer;

        return (<div>
            <p>The idea of Cross-Site Scripting attack relies on the inability of a web server to differentiate what user inputs are benign 
                and what other user inputs are malicious. If a web server accepts some input text from users and then later displays the same 
                to all other users in the applications, then there is a potential chance that an attacker’s unwanted script can be rendered 
                in the interface of another innocent user.  </p>

            <p>These injected scripts could do more harm than simply redirecting users to different websites. They could steal sensitive 
                information from benign users including session cookies, usernames, personally identifiable data etc. In this task, you 
                have to design a malicious input that is accepted by the web server through a text box that is actually designed for taking 
                in User feedback for some business application. This malicious input should steal all cookies from the user session and send 
                it to an attacker controlled web API in a parameter named "cookies". </p>

            <p>Details of the Attacker controlled API :- </p>

            <p>url - https://cse543-web-security.aplayerscreed.com/backend/tthreetwo</p>

            <p>method - GET</p>

            <p>Enter your answer in the text and hit Submit. If your script does exactly what it intends, then you will receive a success message in the 
                corresponding network call that can be analysed in your browser's Network section. However, In a real world example, your input will appear
                on other user’s webpages too that helps you steal all their cookies. </p>

            <div className='vertical-divider'></div>

            <p>Take a Clear Screenshot of the completed task. Add it to your report and explain in-detail how did you complete the task. </p>
            
            <form  onSubmit={this.t2search}>  
                <div className='question-container'>  
                    <label>We appreciate any user feedback : </label>   
                    <div className='vertical-divider'></div>
                    <textarea name="text" rows="14" cols="10" wrap="soft" className='large-text-box' required> </textarea>
                    <div className="vertical-divider"/>
                    <button type="submit" name="eventForm">Submit!</button>   
                </div>   
            </form>  
            <div dangerouslySetInnerHTML={{__html: answer}} hidden/>
            </div>)
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
                    <p className='task-title'>Task 3.1 (30 points)</p>
                    <button name="expand" onClick={this.handleT1} className="task-button">Toggle</button>
                    {t1}
                </div>
                <div className="divider"/>
                <div className='task-container'>
                    <p className='task-title'>Task 3.2 (60 points)</p>
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
                    3. XSS Cross Site Scripting Tasks (90 pts Total)
                </p>
                {toggle}
                {expand_tasks}
            </div>
        )
    }
}

export default CrossSite;