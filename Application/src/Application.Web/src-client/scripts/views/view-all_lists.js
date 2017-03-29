// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - DATA FLOW
import {STORE} from "../store.js";
import {ACTIONS} from '../actions.js'

export const AllListsView = React.createClass({
  getInitialState: function(){
    // console.log('first')
    ACTIONS.fetchAllLists()
    return STORE.getStoreData()
	},

	render: function(){
    let listsArray = this.props.listData;
    console.log(listsArray)

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
            <h3>List Name</h3>
            <h3>Task 1</h3>
            <h3>Task 2</h3>
            <h3>Task 3</h3>
        </div>
			</div>
		)
	}
})
