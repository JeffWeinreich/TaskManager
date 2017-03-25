// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// REACT COMPONENT - CREATE LIST VIEW
export const CreateListView = React.createClass({
  getInitialState: function(){
    return {
      tasksToAdd: [{taskName: "", isImportant: false}],
      errorMessageListName : "",
      errorMessageTaskName : ""
    }
  },
  _handleAddRowClick: function(){
    let component = this
    let copyOfTaskRows = this.state.tasksToAdd.map(function makeCopy(val){return val});
    copyOfTaskRows.push({taskName: "", isImportant: false});
    this.setState({
      tasksToAdd: copyOfTaskRows
    })
  },
  _renderTasksToAdd: function(arrOfTasks){
    let component = this
    return arrOfTasks.map(function(singleTask, i){

      return(
        <TaskFormRow key={i} i={i} handleInputChange={component._handleInputChange}/>
      )
    })

  },

  _handleInputChange: function(val, type, index){
    let updatedTasks = this.state.tasksToAdd.map(function(taskObj,i){
      let newObj = taskObj
      if(i === index){
        newObj[type] = val
      }
      return newObj
    })
    this.setState({
      tasksToAdd: updatedTasks
    })
  },
  _handleFormSubmit: function(){
    console.log("--SUBMIT--");
    let submittedListName = document.querySelector(".create-form_list-name input").value;
    let submittedSharedUsers = document.querySelector(".create-form_sharing input").value;
    console.log(this.state.tasksToAdd[0]);
    let errorJSXListName = (
      <div className="create-form_error-message error_listname">
        <p>The list name can't be blank.</p>
      </div>
    );
    let errorJSXTaskName = (
      <div className="create-form_error-message error_taskname">
        <p>Please add at least one task.</p>
      </div>
    )
    if (submittedListName === "" && this.state.tasksToAdd[0].taskName === ""){
      this.setState({
        errorMessageListName: errorJSXListName,
        errorMessageTaskName: errorJSXTaskName
      })
    } else if (this.state.tasksToAdd[0].taskName === ""){
      this.setState({
        errorMessageTaskName : errorJSXTaskName
      })
    } else if (submittedListName === "") {
      this.setState({
        errorMessageListName : errorJSXListName
      })
    } else {
      let listObjForSubmission = {
        listName: submittedListName,
        sharedWith: submittedSharedUsers,
        tasks: this.state.tasksToAdd
      };
      console.log(listObjForSubmission);
    };
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
            {this.state.errorMessageListName}
          </div>
          <div className="create-form_tasks">
            <h2>Tasks</h2>
            {this.state.errorMessageTaskName}
            <div ref="taskBlock" className="create-form_tasks-block">
              {this._renderTasksToAdd(this.state.tasksToAdd)}
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
  _handleChange: function(evt){
    let eventType = evt.target.name
    let eventValue
    if (eventType === "isImportant"){
      eventValue = evt.target.checked
    } else {
      eventValue = evt.target.value
    };
    this.props.handleInputChange(eventValue, eventType, this.props.i);
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
