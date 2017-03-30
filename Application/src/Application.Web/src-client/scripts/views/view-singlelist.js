// IMPORTS - REACT
import React from "react";

// IMPORTS - DATA FLOW
import {ACTIONS} from '../actions.js'

// REACT COMPONENT - SINGLE TASK/TO-DO
const SingleToDo = React.createClass({
  _handleCompletion: function(event){
    console.log(event.target);
    console.log(event.currentTarget);
    console.log(this.props)
    let objToSave = Object.assign({}, this.props.taskData)
    if(objToSave.isDone === true){
      objToSave.isDone = false
    } else {
      objToSave.isDone = true
    }

    console.log(objToSave)
    ACTIONS.updateTodo(objToSave)
  },

  render: function(){
    let givenTaskObj = this.props.taskData;
    let completionInfo = "";
    let importantInfo = "";
    let completeClassName = 'task-notdone'
    let checkmarkJSX = "";

    let elStyle={}
    if(this.props.taskData.isDone){
      completeClassName = 'task-done'
      completionInfo = (
        <div className="todo_completed"><p>{givenTaskObj.completedBy} - {givenTaskObj.dateDone}</p></div>
      )
      checkmarkJSX = <i className="icon-checkmark"/>
    };
    if(this.props.taskData.important === true){
      importantInfo = (<div className="todo_important"><i className="icon-attention"></i></div>)
    };

    return (
      <div className={`todo-singleview columns-container ${completeClassName}`} onClick={this._handleCompletion}>
        <div className="todo_checkedOff">{checkmarkJSX}</div>
        <div className="todo_name"><h2>{givenTaskObj.name}</h2></div>
        {/* {importantInfo} */}
        {/* {completionInfo} */}
      </div>
    )
  }
});

// REACT COMPONENT - SINGLE LIST
export const SingleListView = React.createClass({
  getInitialState: function(){
    return {
      realPropsListData : this.props.listData
    }
  },

  componentWillMount: function(){
    let currentId = window.location.hash.split('lists/')
    ACTIONS.fetchGivenList(currentId[1]);
  },

  componentWillReceiveProps: function(newProps){
    console.log('new PROPS', newProps)
    this.setState({
      realPropsListData : newProps.listData
    })
  },

  _handleEditClick: function(){
    ACTIONS.changeCurrentNav("routeToListEditing","lists/"+this.props.routeParams.listId+"/edit")
  },

  _mapOverTask: function(givenListObj){
    let givenTasks = givenListObj.todos;
    if (typeof givenTasks === 'undefined' ) givenTasks = []
    let mappedTasks = givenTasks.map(function(task, i){
      return <SingleToDo key={i+Date.now()} taskData={task}/>
    });
    return mappedTasks;
  },

  render: function(){
    if (this.props.listData === undefined){
      return(
        <div></div>
      )
    };
    let givenListObj = this.state.realPropsListData;
    return (
      <div className="view-singlelist">
        <div className="page-header">
          <h1>TaskMaster</h1>
          <h2>Single List View</h2>
        </div>
        <div className="info-bar columns-container">
          <div className="info-bar_shared-with">
            <h4>Shared With: {givenListObj.sharedWith}</h4>
          </div>
          <div className="info-bar_edit-btn" onClick={this._handleEditClick}>
            <h4>Edit List</h4>
          </div>
        </div>
        <div className="list-container">
          <div className="list-header columns-container">
            <div className="list-header_main-icon">
              <i className="icon-list"></i>
            </div>
            <div className="list-header_title">
              <h2>{givenListObj.name}</h2>
            </div>
            <div className="list-header_delete-icon">
              <i className="icon-x"></i>
            </div>
          </div>
          <div className="all-tasks">
            {this._mapOverTask(givenListObj)}
          </div>
        </div>
      </div>
    )
  }
});
