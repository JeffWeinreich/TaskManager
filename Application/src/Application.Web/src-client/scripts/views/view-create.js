// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// REACT COMPONENT - CREATE LIST VIEW
export const CreateListView = React.createClass({
  getInitialState: function(){
    return {
      additionalTaskRows: [],
      rowCount: 1
    }
  },
  _handleAddRowClick: function(){
    let copyOfTaskRows = this.state.additionalTaskRows.map(function makeCopy(val){return val});
    copyOfTaskRows.push(<TaskFormRow key={this.state.rowCount}/>);
    this.setState({
      additionalTaskRows: copyOfTaskRows,
      rowCount: this.state.rowCount + 1
    })
  },
  _handleFormSubmit: function(){
    console.log("--SUBMIT--");
    // 1 - collect all input data
    // 2 - collate data into list object
    var forEach = function(arr, func){
    for(var i = 0 ; i < arr.length; i++){
        func(arr[i], i, arr)
        }
    };
    
    let taskDataArray = [];

    for (let i;i<this.state.rowCount.length;i++) {
      let currentTaskData = {
        name: document.querySelector(".task-row_name input").value,
        important: document.querySelector(".task-row_important input").value
      }
      taskDataArray.push(currentTaskData);
    };
    let listObjForSubmission = {
      listName: document.querySelector(".create-form_list-name input").value,
      sharedWith: document.querySelector(".create-form_sharing input").value,
      tasks: taskDataArray
    };
    console.log(listObjForSubmission);
    // 3 - trigger action to set store with data to submit
    // 4 - POST data to API
    // 5 - route to new list view?
  },
  _handleCreateCancel: function(){
    console.log("--CANCEL--");
    // should route to main view, i.e. Multi Lists View
  },
  render: function(){
    let additionalTaskRows;
    return (
      <div className="view-createlist">
        <div className="page-header">
          <h1>TaskMaster</h1>
          <h2>Create a New List</h2>
        </div>
        <div className="create-form">
          <div className="create-form_list-name">
            <h2>List Name</h2>
            <input type="text"/>
          </div>
          <div className="create-form_tasks">
            <h2>Tasks</h2>
            <div className="create-form_tasks-block">
              <TaskFormRow/>
              {this.state.additionalTaskRows}
              <div className="create-form_tasks-add" onClick={this._handleAddRowClick}>
                <i className="icon-plus-squared"></i>
                add new task
              </div>
            </div>
          </div>
          <div className="create-form_sharing">
            <h2>Users to Share With</h2>
            <input type="text" name="shared-users"></input>
          </div>
          <div className="create-form_buttons columns-container">
            <div className="create-form_submit" onClick={this._handleFormSubmit}>
              <h2>Submit</h2>
            </div>
            <div className="create-form_cancel" onClick={this._handleCreateCancel}>
              <h2>Cancel</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const TaskFormRow = React.createClass({
  render: function(){
    return (
      <div className="task-row columns-container">
        <div className="task-row_name">
          <input type="text"></input>
        </div>
        <div className="task-row_important">
          <input type="checkbox"></input>
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
