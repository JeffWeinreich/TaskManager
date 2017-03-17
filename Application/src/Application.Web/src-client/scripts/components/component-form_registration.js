// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

export const RegistrationComponent = React.createClass({

	render: function(){
		return (
			<div className="page-header">
				<div className="page-header_block">
					<h1>TaskMaster</h1>
					<h2>Registration</h2>
				</div>
			</div>
			<div className="registration-container column-container">
				<div className="reg-left-container column-container">
					<h3>Username</h3>
					<input type="text" className="form-control" name="usernameField"/>
					<h3>Password</h3>
					<input type="text" className="form-control" name="passwordField"/>
				</div>
				<div className="reg-right-container column-container">
					<h3>Email</h3>
					<input type="text" className="form-control" name="emailField"/>
					<h3>Confirm Password</h3>
					<input type="text" className="form-control" name="confirmpasswordField"/>
				</div>
			</div>
		)
	}
})
