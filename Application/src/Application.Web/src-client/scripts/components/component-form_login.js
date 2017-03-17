// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

export const LoginComponent = React.createClass({

			render: function(){
				return (
					<div className="page-header">
		        <div className="page-header_block">
		          <h1>TaskMaster</h1>
		          <h2>Login</h2>
		        </div>
		      </div>
					<div className="login-container">
						<div className="email-container column-container">
							<h3>Email</h3>
							<input type="text" className="form-control" name="emailField"/>
						</div>
						<div className="password-container column-container">
							<h3>Password</h3>
							<input type="text" className="form-control" name="passwordField"/>
						</div>
						<button className="btn-submit-form btn-login">Submit</button>
					</div>
				)
			}
})
