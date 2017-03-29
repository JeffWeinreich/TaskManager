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
		"login" : "routeToLogin",
		"register" : "routeToRegistration",
		"lists/:id/edit" : "routeToListEditing",
		"lists/create" : "routeToListCreation",
		"lists/:id" : "routeToSingleList",
		"lists" : "routeToAllLists",
		"" : "routeToWelcome",
	},

	routeToWelcome: function(){
		ACTIONS.setView("HOME");
	},
  routeToLogin: function(){
		ACTIONS.setView("LOGIN");
	},
	routeToRegistration: function(){
		ACTIONS.setView("REGISTER" );
	},
	routeToAllLists: function(){
		ACTIONS.setView("ALL_LISTS");
	},
	routeToSingleList: function(id){
		ACTIONS.setView("SINGLE_LIST", {listId: id})
	},
	routeToListCreation: function(){
		ACTIONS.setView("CREATE_LIST")
	},
	routeToListEditing: function(){
		ACTIONS.setView("EDIT_LIST")
	}
})
