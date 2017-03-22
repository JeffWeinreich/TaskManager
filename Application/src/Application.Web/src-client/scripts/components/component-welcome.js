// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

export const WelcomeComponent = React.createClass({

	render: function(){
		return (
			<div className="component-welcome">
	      <div className="welcome-header">
	        <div className="welcome-header_block">
	          <h1>TaskMaster</h1>
	          <h2>The convenient way to share to-do lists!</h2>
	        </div>
	      </div>
	      <div className="promo-blurb">
	        <div className="promo-blurb_block">
	          <h3>Now when you make a todo list, you can share it those who need it!</h3>
	          <p>With TaskMaster you can:</p>
	            <ul>
	              <li>Mark tasks as important</li>
	              <li>Set a due date a task</li>
	              <li>Share task lists others!</li>
	            </ul>
	        </div>
	      </div>
			</div>
		)
	}
})
