// IMPORTS - BACKBONE
import Backbone from "backbone";

// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// REACT COMPONENT - SINGLE TASK/TO-DO
const SingleToDo = React.createClass({
  render: function(){
    let givenTaskObj = this.props.taskData;
    let completionInfo = "";
    let importantInfo = "";
    let completeClassName = 'task-notdone'
    if(this.props.taskData.checkedOff){
      completeClassName = 'task-done'
      completionInfo = (
        <div className="todo_completed"><p>{givenTaskObj.completedBy} - {givenTaskObj.dateDone}</p></div>
      )
    }
    if(this.props.taskData.important === true){
      let importantInfo = (<div className="todo_important"><h2>!</h2></div>)
    }
    return (
      <div className={`todo-singleview columns-container ${completeClassName}`}>
        <div className="todo_checkbox"><input type="checkbox"/></div>
        <div className="todo_name"><h2>{givenTaskObj.name}</h2></div>
        {importantInfo}
        {completionInfo}
      </div>
    )
  }
});

// REACT COMPONENT - SINGLE LIST
export const SingleListView = React.createClass({
  _mapOverTask: function(givenListObj){
    let givenTasks = givenListObj.tasks;
    if (typeof givenTasks === 'undefined' ) givenTasks = []
    let mappedTasks = givenTasks.map(function(task, i){
      return <SingleToDo key={i+Date.now()} taskData={task}/>
    });
    return mappedTasks;
  },
  render: function(){
    if(this.props.listData === undefined){
      return(
        <div></div>
      )
    };
    let givenListObj = this.props.listData;
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
          <div className="info-bar_edit-btn">
            <h4>Edit List</h4>
          </div>
        </div>
        <div className="list-container">
          <div className="list-header columns-container">
            <div className="list-header_main-icon">
              <i className="fa fa-list" aria-hidden="true"></i>
            </div>
            <div className="list-header_title">
              <h2>{givenListObj.listName}</h2>
            </div>
            <div className="list-header_delete-icon">
              <i className="fa fa-times" aria-hidden="true"></i>
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

// TEST RENDERING
// ReactDOM.render(<SingleListView listData={dummyListObject}/>, document.querySelector("#app-container"))
