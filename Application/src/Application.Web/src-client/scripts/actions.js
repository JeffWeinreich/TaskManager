// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {STORE} from './store.js'

export const ACTIONS = {
	setView: function(viewName){
		STORE.setStore('currentView', viewName)
	},
	setAPIData: function(results){
		STORE.setStore("dummyData",results)
	},
	routeTo: function(path){
	window.location.hash = path
},
logUserOut: function(){
UserModel.logOut().then(function(){
	STORE.setStore('currentUser', {})
})
},
}
