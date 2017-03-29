// IMPORTS - DATA FLOW
import {ACTIONS} from "../actions.js";

// IMPORTS - REACT
import React from "react";

// REACT COMPONENT - EDIT LIST VIEW
const initialTaskRows = React.createClass({
  _mapOverInitialTasks: function(){

  },

  render: function(){
    // return (
    //
    // )
  }
});

export const EditListView = React.createClass({
  getInitialState: function(){
    return {
      tasksArray : [],
      errorMessageListName : "",
      errorMessageTaskName : ""
    };
  },

  _handleAddRowClick: function(){
    let component = this
    let copyOfTaskRows = this.state.tasksToAdd.map(function makeCopy(val){return val});
    copyOfTaskRows.push({taskName: "", isImportant: false});
    this.setState({
      tasksArray: copyOfTaskRows
    })
  },

  _getInitialTasks: function(){
    let givenTasksArray = this.props.listData.todos;
    return givenTasksArray;
  },

  componentWillMount: function(){
    ACTIONS.fetchGivenList(this.props.routeParams.listId);
  },

  render: function(){
    let initialListObj = this.props.listData;
    return (
      <div className="view-editlist">
        <div className="page-header">
          <h1>TaskMaster</h1>
          <h2>Edit List: {initialListObj.name}</h2>
        </div>
        <div className="edit-form">
          <div className="edit-form_list-name">
            <h2>List Name</h2>
            <input type="text" value={initialListObj.name}/>
          </div>
          <div className="edit-form_tasks">
            <h2>Tasks</h2>
            <div className="edit-form_tasks-block">
               {/* <initialTaskRows tasksData=_getInitialTasks() /> */}
               {/* task rows to add */}
              <div className="edit-form_tasks-add">
                <i className="icon-plus-squared"/>
                add new task
              </div>
            </div>
          </div>
          <div className="edit-form_sharing">
            <h2>Users to Share With</h2>
            <input type="text" name="shared-users"></input>
          </div>
          <div className="edit-form_buttons columns-container">
            <div className="edit-form_submit">
              <h2>Submit</h2>
            </div>
            <div className="edit-form_cancel">
              <h2>Cancel</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

const TaskFormRow = React.createClass({
  _handleChange: function(){

  },
  render: function(){
    return (
      <div className="task-row columns-container">
        <div className="task-row_name">
          <input name="taskName" ref="inputVal" onChange={this._handleChange} ref={this.props.i} type="text"></input>
        </div>
        <div className="task-row_important">
          <input name="isImportant" ref={this.props.i} onChange={this._handleChange} type="checkbox"></input>
          Important?
        </div>
    {/* <div className="task-row_date-due">
          <i className="icon-calendar"></i>
          <input type="date"></input>
          Date Due
        </div> */}
      </div>
    )
  }
})
