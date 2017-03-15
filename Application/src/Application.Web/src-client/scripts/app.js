// IMPORTS - BACKBONE
import Backbone from "backbone";

// IMPORTS - REACT
import ReactDOM from "react-dom";
import React from "react";

// IMPORTS - VIEW CONTROLLER
import {ViewController} from "./viewController.js";

// APPROUTER
const AppRouter = Backbone.router.extend({
	initialize: function(){
		Backbone.history.start()
	},
	routes: {
		"" : "showWelcome",
		"login" : "showLoginForm",
		"register" : "showRegisterForm",
		"lists" : "showAllLists",
		"lists/single" : "showSingleList",
		"lists/create" : "showCreateListForm",
		"lists/edit" : "showEditListForm"
	},
	showWelcome: function(){

	},
	showLoginForm: function(){

	},
	showRegisterForm: function(){

	},
	showAllLists: function(){

	},
	showSingleList: function(){

	},
	showCreateListForm: function(){

	},
	showEditListForm: function(){

	}
});

new AppRouter();
