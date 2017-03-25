// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - ACTIONS
import {ACTIONS} from "../actions.js";

export const RegistrationComponent = React.createClass({
	_handleRegFormSubmit: function(evt){
		evt.preventDefault()
		let formEl = evt.target

		let regObjToSave = {
			email: formEl.emailField.value,
			password: formEl.passwordField.value
		}
		console.log(regObjToSave)
		ACTIONS.registerNewUser(regObjToSave)
	},

	render: function(){
		return <form onSubmit={this._handleRegFormSubmit}>
			<div className="component-registration">
				<div className="page-header">
					<div className="page-header_block">
						<h1>TaskMaster</h1>
						<h2>Registration</h2>
					</div>
				</div>
				<div className="registration-container column-container">
						<h3>Email</h3>
						<input type="text" className="form-control" name="emailField"/>
						<h3>Password</h3>
						<input type="password" className="form-control" name="passwordField"/>
						<h3>Confirm Password</h3>
						<input type="password" className="form-control" name="confirmpasswordField"/>
				</div>
				<div className="reg-submit reg-btn">
					<input type="submit" className="btn-submit-form btn-reg" value="Register"/>
				</div>
			</div>
		</form>
	}
})
