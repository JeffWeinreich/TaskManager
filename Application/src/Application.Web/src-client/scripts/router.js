// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {ACTIONS} from './actions.js'

// IMPORTS - VIEW CONTROLLER
import {ViewController} from "./viewController.js";

// APPROUTER
const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		"" : "routeToWelcome",
		"login" : "routeToLogin",
		"register" : "routeToRegistration",
		"lists" : "routeToAllLists",
		"lists/:id" : "routeToSingleList",
		"lists/create" : "routeToListCreation",
		"lists/:id/edit" : "routeToListEditing"
	},

	routeToHome: function(){
		ACTIONS.setView("HOME");
	},
  routeToLogin: function(){
		ACTIONS.setView("LOGIN");
	},
	routeToRegistration: function(){
		ACTIONS.setView("REGISTER");
	},
	routeToAllListss: function(){
		ACTIONS.setView("ALL_LISTS");
	},
	routeToSingleList: function(){
		ACTIONS.setView("SINGLE_LIST")
	},
	routeToListCreation: function(){
		ACTIONS.setView("CREATE_LIST")
	},
	showEditListForm: function(){
		ACTIONS.setView("EDIT_LIST")
	}
})
