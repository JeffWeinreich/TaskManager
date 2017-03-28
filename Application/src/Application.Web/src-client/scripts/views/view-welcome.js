// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - COMPONENTS
import {WelcomeComponent} from '../components/component-welcome.js';

export const WelcomeView = React.createClass({

	render: function(){
		return (
			<div className="welcome-container">
				<div className="welcome-header">
					<div className="welcome-overlay">
          <h1>TaskMaster</h1>
          <h2>The convenient way to share to-do lists</h2>
					</div>
        </div>
				<WelcomeComponent/>
			</div>
		)
	}
})
