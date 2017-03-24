// IMPORTS - REACT
import React from "react";

// REACT COMPONENT - EDIT LIST VIEW
const initialTaskRows = React.createClass({
  render: function(){
    return (
      
    )
  }
});
const additionalTaskRows = React.createClass({

});
export const EditListView = React.createClass({
  render: function(){
    let initialListObj = this.props.listData;
    return (
      <div className="view-editlist">
        <div className="page-header">
          <h1>TaskMaster</h1>
          <h2>Edit List: {initialListObj.listName}</h2>
        </div>
        <div className="edit-form">
          <div className="edit-form_list-name">
            <h2>List Name</h2>
            <input type="text" value={initialListObj.listName}/>
          </div>
          <div className="edit-form_tasks">
            <h2>Tasks</h2>
            <div className="edit-form_tasks-block">

              <div className="edit-form_tasks-add">
                <i className="icon-plus-squared"/>
                add new task
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
})
