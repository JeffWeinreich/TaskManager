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
		ReactDOM.render(<ViewController fromRoute={"HOME"} />, document.querySelector('#app-container'))
	},
	showLoginForm: function(){
		ReactDOM.render(<ViewController fromRoute={"LOGIN"} />, document.querySelector('#app-container'))
	},
	showRegisterForm: function(){
		ReactDOM.render(<ViewController fromRoute={"REGISTER"} />, document.querySelector('#app-container'))
	},
	showAllLists: function(){
		ReactDOM.render(<ViewController fromRoute={"ALL_LISTS"} />, document.querySelector('#app-container'))
	},
	showSingleList: function(){
		ReactDOM.render(<ViewController fromRoute={"SINGLE_LIST"} />, document.querySelector('#app-container'))
	},
	showCreateListForm: function(){
		ReactDOM.render(<ViewController fromRoute={"CREATE_LIST"} />, document.querySelector('#app-container'))
	},
	showEditListForm: function(){
		ReactDOM.render(<ViewController fromRoute={"EDIT_LIST"} />, document.querySelector('#app-container'))
	}
})

new AppRouter();
