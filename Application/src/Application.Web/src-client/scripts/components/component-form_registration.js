// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - ACTIONS
import {ACTIONS} from "../actions.js";

export const RegistrationComponent = React.createClass({
	getInitialState: function(){
		return {
			emailErrorMsg: "",
			passwordErrorMsg: "",
			confirmPwErrorMsg: ""
		}
	},
	// NOTE: possible rewrite using Bubba's method to add error-throwing function
	_handleRegFormSubmit: function(evt){
		evt.preventDefault()
		let givenEmail = evt.target.emailField.value;
		let givenPassword = evt.target.passwordField.value;
		let givenConfirm = evt.target.confirmPasswordField.value
		let emailErrorJSX = <div className="email-error"><p>Please use a valid e-mail address.</p></div>
		let pwErrorJSX = <div className="password-error"><p>The password must contain at least one number and have at least eight characters total.</p></div>
		let confirmErrorJSX = <div className="confirm-error"><p>The passwords must match.</p></div>
		function hasNumber(str){
			return /\d/.test(str);
		};
		let validationError = false;
		this.setState({
			emailErrorMsg : "",
			passwordErrorMsg : "",
			confirmPwErrorMsg : ""
		});
		let regObjToSave;
		if (givenEmail.indexOf("@") === -1){
			validationError = true;
			this.setState({emailErrorMsg: emailErrorJSX});
		};
		if (hasNumber(givenPassword) === false){
			validationError = true;
			this.setState({passwordErrorMsg: pwErrorJSX});
		};
		if (givenPassword !== givenConfirm){
			validationError = true;
			this.setState({confirmPwErrorMsg: confirmErrorJSX});
		};
		if (validationError === false){
			regObjToSave = {
				email: givenEmail,
				password: givenPassword
			}
			console.log(regObjToSave);
			this.setState({
				emailErrorMsg : "",
				passwordErrorMsg : "",
				confirmPwErrorMsg : ""
			})
			ACTIONS.registerNewUser(regObjToSave)
		};
	},

	render: function(){
		return <form onSubmit={this._handleRegFormSubmit}>
			<div className="component-registration">
				<div className="reg-header">
					<div className="reg-overlay">
				<div className="page-header">
					<div className="page-header_block">
						<h1>TaskMaster</h1>
						<h2>Registration</h2>
					</div>
				</div>
			</div>
				</div>
				<div className="registration-container column-container">
						<h3>Email</h3>
						{this.state.emailErrorMsg}
						<input type="text" className="form-control" name="emailField"/>
						<h3>Password</h3>
						{this.state.passwordErrorMsg}
						<input type="password" className="form-control" name="passwordField"/>
						<h3>Confirm Password</h3>
						{this.state.confirmPwErrorMsg}
						<input type="password" className="form-control" name="confirmPasswordField"/>
				</div>
				<div className="reg-submit reg-btn">
					<input type="submit" className="btn-submit-form btn-reg" value="Register"/>
				</div>
			</div>
		</form>
	}
})
