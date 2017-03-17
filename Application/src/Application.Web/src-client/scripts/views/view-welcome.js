// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - COMPONENTS
import {WelcomeComponent} from '../components/component-welcome.js';

export const WelcomeView = React.createClass({

	render: function(){
		return (
			<div className="container">
					<WelcomeComponent/>
			</div>
		)
	}
})
