// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {ACTIONS} from './actions.js'

// IMPORTS - VIEW CONTROLLER
import {ViewController} from "./viewController.js";

// APPROUTER
export const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		"" : "routeToWelcome",
		"login" : "routeToLogin",
		"register" : "routeToRegistration",
		"lists" : "routeToAllLists",
		// "lists/:id" : "routeToSingleList",
		"lists/single" : "routeToSingleList",
		"lists/create" : "routeToListCreation",
		// "lists/:id/edit" : "routeToListEditing"
		"lists/edite" : "routeToListEditing"
	},

	routeToWelcome: function(){
		ACTIONS.setView("HOME");
	},
  routeToLogin: function(){
		ACTIONS.setView("LOGIN");
	},
	routeToRegistration: function(){
		ACTIONS.setView("REGISTER");
	},
	routeToAllLists: function(){
		ACTIONS.setView("ALL_LISTS");
	},
	routeToSingleList: function(){
		ACTIONS.setView("SINGLE_LIST")
	},
	routeToListCreation: function(){
		ACTIONS.setView("CREATE_LIST")
	},
	routeToListEditing: function(){
		ACTIONS.setView("EDIT_LIST")
	}
})
