// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - COMPONENTS
import {LoginComponent} from '../components/component-form_login.js';

export const LoginView = React.createClass({

	render: function(){
		return (
			<div className="container">
					<LoginComponent/>
			</div>
		)
	}
})
