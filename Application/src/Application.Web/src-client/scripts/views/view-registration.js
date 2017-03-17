// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - COMPONENTS
import {RegistrationComponent} from '../components/component-form_registration.js';

export const RegistrationView = React.createClass({

	render: function(){
		return (
			<div className="container">
					<RegistrationComponent/>
			</div>
		)
	}
})
