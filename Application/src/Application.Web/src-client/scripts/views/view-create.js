// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// REACT COMPONENT - CREATE LIST VIEW
export const CreateListView = React.createClass({
  getInitialState: function(){
    return {
      additionalTaskRows: []
    }
  },
  _handleAddRowClick: function(){
    let copyOfTaskRows = this.state.additionalTaskRows.map(function makeCopy(val){return val});
    copyOfTaskRows.push(<TaskFormRow key={Date.now()}/>);
    this.setState({
      additionalTaskRows: copyOfTaskRows
    })
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
            <input type="text"></input>
          </div>
          <div className="create-form_tasks">
            <h2>Tasks</h2>
            <div className="create-form_tasks-block">
              <TaskFormRow/>
              {this.state.additionalTaskRows}
              <div className="create-form_tasks_add" onClick={this._handleAddRowClick}>
                <i className="icon-plus-squared"></i>
                add new task
              </div>
            </div>
          </div>
          <div className="create-form_buttons columns-container">
            <div className="create-form_submit">
              <h2>Submit</h2>
            </div>
            <div className="create-form_cancel">
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
