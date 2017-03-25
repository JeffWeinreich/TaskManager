// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - ACTIONS
import {ACTIONS} from "../actions.js";

export const LoginComponent = React.createClass({
	_handleLoginFormSubmit: function(evt){
		evt.preventDefault()
		let formEl = evt.target

		let authCreds = {
			email: formEl.emailField.value,
			password: formEl.passwordField.value
		}

		console.log(authCreds)
		ACTIONS.loginUser(authCreds)
	},
			render: function(){
				return <form onSubmit={this._handleLoginFormSubmit} className="component-login">
						<div className="page-header">
			        <div className="page-header_block">
			          <h1>TaskMaster</h1>
			          <h2>Login</h2>
			        </div>
			      </div>
						<div className="login-container">
							<div className="email-container columns-container">
								<h3>Email</h3>
								<input type="text" className="form-control" name="emailField"/>
							</div>
							<div className="password-container columns-container">
								<h3>Password</h3>
								<input type="password" className="form-control" name="passwordField"/>
							</div>
							<div className="login-submit login-btn">
								<input type="submit" className="btn-submit-form btn-login" value="Login"/>
							</div>
						</div>
					</form>
			}
})
