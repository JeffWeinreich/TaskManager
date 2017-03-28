// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

// IMPORTS - ACTIONS
import {ACTIONS} from '../actions.js';

export const NavbarAnon = React.createClass({
	_handleNavClick: function(evt){
		let clickedRoute = evt.currentTarget.dataset.route
		let routeMapping = {
			"HOME" : '',
			"LOGIN" : 'login',
			"REGISTER" : 'register',
      "ALL_LISTS" : 'all_lists',
      "SINGLE_LIST" : 'single_list',
      "CREATE_LIST" : 'create_list',
      "EDIT_LIST" : 'edit_list'
		}

		ACTIONS.routeTo(routeMapping[clickedRoute])
	},

	render: function(){
		return <div className="nav-top nav-anon columns-container">
				<div className="nav-top_menu-button" onClick={this._handleNavClick} data-route="HOME"><i className="icon-menu"></i></div>
        <div className="nav-top_right-buttons columns-container">
				<div className="right-buttons_sign-up" onClick={this._handleNavClick} data-route="REGISTER">Sign Up</div>
				<div className="right-buttons_log-in" onClick={this._handleNavClick} data-route="LOGIN">Login</div>
        </div>
    </div>
	}
})

export const NavbarAuth = React.createClass({
	_handleLogoutClick: function(){
		ACTIONS.logUserOut()
	},
	render: function(){
    return <div className="nav-top nav-auth columns-container">
    <div className="nav-top_menu-button" onClick={this._handleNavClick} data-route="HOME"><i className="icon-menu"></i></div>
    <div className="nav-top_right-buttons">
				<div className="nav-logout" data-route="LOGOUT"
					onClick={this._handleLogoutClick}>Logout</div>
		</div>
    </div>
	}
})
