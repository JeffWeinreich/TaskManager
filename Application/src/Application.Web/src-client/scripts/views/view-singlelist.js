// IMPORTS - BACKBONE
import Backbone from "backbone";

// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// DUMMY DATA
let dummyListObject = {
  sharedWith : "Wendy, Bob",
  listName : "Final Project",
  currentNavRoute: '',
  tasks : [{
    name: "Set up backend database",
    checkedOff: false,
    important: true,
    completedBy: "",
    dateDone: ""
  },
  {
    name: "Finish wireframe mockups",
    checkedOff: false,
    important: false,
    completedBy: "",
    dateDone: ""
  },
  {
    name: "Schedule daily stand-ups",
    checkedOff: false,
    important: false,
    completedBy: "",
    dateDone: ""
  },
  {
    name: "Refill Nerf guns",
    checkedOff: true,
    important: false,
    completedBy: "Wendy",
    dateDone: "Wednesday"
  }]
};


console.log(dummyListObject);

// REACT COMPONENT - SINGLE TASK/TO-DO
const SingleToDo = React.createClass({
  render: function(){
    let givenTaskObj = this.props.taskData;
    return (
      <div className="todo-singleview columns-container">
        <div className="todo_checkbox"><input type="checkbox"/></div>
        <div className="todo_name"><h2>{givenTaskObj.name}</h2></div>
        <div className="todo_important"></div>
        <div className="todo_completed">{givenTaskObj.completedBy} - {givenTaskObj.done}</div>
      </div>
    )
  }
});

// REACT COMPONENT - SINGLE LIST
export const SingleListView = React.createClass({
  _mapOverTask: function(givenListObj){
    let givenTasks = givenListObj.tasks;
    let mappedTasks = givenTasks.map(function(task){
      return <SingleToDo taskData={task}/>
    });
    return mappedTasks;
  },
  render: function(){
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
              <i class="fa fa-list" aria-hidden="true"></i>
            </div>
            <div className="list-header_title">
              <h2>{givenListObj.listName}</h2>
            </div>
            <div className="list-header_delete-icon">
              <i class="fa fa-times" aria-hidden="true"></i>
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
