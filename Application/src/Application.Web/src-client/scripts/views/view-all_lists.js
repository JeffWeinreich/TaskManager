// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - DATA FLOW
import {STORE} from "../store.js";
import {ACTIONS} from '../actions.js'

// REACT COMPONENT - SINGLE LIST ITEM
const SingleList = React.createClass({
  _mapOverTask: function(givenListObj){
    let givenTasks = givenListObj.todos;
    if (typeof givenTasks === 'undefined' ) givenTasks = []
    let mappedTasks = givenTasks.map(function(task, i){
      let todoClass = "todo";
      if (task.isDone === true){todoClass = "todo todo_done"}
      return (
        <div className={todoClass} key={i}>
          <p>{task.name}</p>
        </div>
      )
    });
    return mappedTasks;
  },
  _viewSingle: function(){
    ACTIONS.changeCurrentNav("SINGLE_LIST", 'lists/'+this.props.listData.id)
  },
  render: function(){
    let listData = this.props.listData
    return (
      <div className="single-list" key={listData} onClick={this._viewSingle}>
        <h3>{listData.name}</h3>
        {this._mapOverTask(this.props.listData)}
      </div>
    )
  }
});

// REACT COMPONENT - ALL LISTS VIEW
export const AllListsView = React.createClass({
  componentDidMount: function(){
    ACTIONS.fetchAllLists();

	},

  _mapOverLists: function(){
    let listsArray = this.props.allListsData;
    let mappedLists = listsArray.map(function(list, i){
      return <SingleList key={i+Date.now()} listData={list}/>
    })
    return <div className="mapped-lists">{mappedLists}</div>;
  },

	render: function(){
    let listsArray = this.props.allListsData;
    console.log(listsArray)
    if (listsArray === undefined){
      return(
        <div></div>
      )
    };
		return (
			<div className="all-lists-container">
        <div className="all-lists-header">
          <div className="all-lists-overlay">
            <div className="page-header">
            <div className="page-header_block">
              <h1>TaskMaster</h1>
              <h2>All Lists</h2>
            </div>
          </div>
        </div>
      </div>
        <div className="indiv-list-container column-container">
          <div className="all-lists-single">
            {/* <h3>List Name</h3>
            <h3>Task 1</h3>
            <h3>Task 2</h3>
            <h3>Task 3</h3> */}
            {this._mapOverLists()}
          </div>
        </div>
			</div>
		)
	}
})
