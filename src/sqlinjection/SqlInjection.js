import { render } from '@testing-library/react';
import React, { Component } from 'react';

class SqlInjection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expand: false, t1: false, t2: false, t3: false, t4: false};
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

    getTask1 = () => {

        return (<div>Task 1.1 Contents</div>)
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