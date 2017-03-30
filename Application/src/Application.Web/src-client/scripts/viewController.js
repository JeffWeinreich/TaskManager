// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - APPROUTER
import {AppRouter} from "./router.js";

// IMPORTS - DATA FLOW
import {ACTIONS} from "./actions.js";
import {STORE} from "./store.js";

// IMPORTS - COMPONENTS
import {NavbarAnon, NavbarAuth} from './components/component-navbar.js';
import {FooterComponent} from "./components/component-footer.js";

// IMPORTS - VIEWS
import {WelcomeView} from "./views/view-welcome.js";
import {LoginView} from "./views/view-login.js";
import {RegistrationView} from "./views/view-registration.js";
import {SingleListView} from "./views/view-singlelist.js";
import {CreateListView} from "./views/view-create.js";
import {EditListView} from "./views/view-edit.js";
import {AllListsView} from "./views/view-all_lists.js";

export const ViewController = React.createClass({
  getInitialState: function(){
		let stateObj = STORE.getStoreData();
    return stateObj;
	},
  componentWillMount: function(){
    let vcComponent = this;
    ACTIONS.fetchCurrenUser();
    STORE.onStoreChange(function(){
      let newStoreState = STORE.getStoreData();
      vcComponent.setState(newStoreState);
    })
    let router = new AppRouter();
  },
  _getNavbar: function(currentUser){
    let theNavbar = <NavbarAuth  {...this.state}/>

    if(typeof currentUser.name !== 'string'){
          theNavbar = <NavbarAnon {...this.state}/>
    }
      return theNavbar;
  },
	render: function(){
    let currentView = this.state.currentView;
		let componentToRender;
		switch(currentView){
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
				componentToRender = <AllListsView {...this.state}/>
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
		};
		return (
      <div>
				{this._getNavbar(this.state.currentUser)}
				{componentToRender}
        <FooterComponent/>
			</div>
		)
	}
});
