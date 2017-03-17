// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - COMPONENTS
import {Navbar} from './components/component-navbar.js';

// IMPORTS - VIEWS
import {WelcomeView} from "./views/view-welcome.js";
import {LoginView} from "./views/view-login.js";
import {RegistrationView} from "./views/view-registration.js";
import {SingleListView} from "./views/view-singlelist.js";

export const ViewController = React.createClass({
  getInitialState: function(){
		ACTIONS.changeCurrentNav(this.props.fromRoute, window.location.hash)
		let storeObject = STORE.getStoreData()
		return storeObject
	},

	render: function(){

		let componentToRender

		switch(this.state.currentNavRoute){
			case "HOME":
				componentToRender = <WelcomeView {...this.state}/>
				break;
			case "LOGIN":
				componentToRender = <LoginView {...this.state}/>
				break;
 			case "REGISTER":
				componentToRender = <RegistrationView {...this.state}/>
				break;
      case "ALL_LISTS":
				componentToRender = <MultiListView {...this.state}/>
				break;
      case "SINGLE_LIST":
        componentToRender = <SingleListView {...this.state}/>
        break;
      case "CREATE_LIST":
        componentToRender = <CreateListView {...this.state}/>
        break;
      case "EDIT_LIST":
        componentToRender = <EditListView {...this.state}/>
        break;
 			default:
		}

		return (
			<div>
				<Navbar {...this.state }/>
				{componentToRender}
			</div>
		)
	}
});
