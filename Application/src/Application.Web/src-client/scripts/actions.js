// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {STORE} from './store.js'
import {UserModel} from './models/model-user.js'

export const ACTIONS = {
	setView: function(viewName){
		STORE.setStore('currentView', viewName)
	},
	setAPIData: function(results){
		STORE.setStore('dummyData',results)
	},
	loginUser: function(credsObj){
	console.log(credsObj)
	UserModel.logIn( credsObj.email , credsObj.password ).then(function(serverRes){
		console.log(serverRes)
		STORE.setStore('currentUser', serverRes)
	})
	},
	registerNewUser: function(newUserInfoObj){
	UserModel.register(newUserInfoObj).then(function(serverRes){
		ACTIONS.changeCurrentNav('HOME', '')
	})
	},
	routeTo: function(path){
	window.location.hash = path
	},
	changeCurrentNav: function(selectedAppRoute, urlRoute){
	STORE.setStore('currentView', selectedAppRoute)
	window.location.hash = urlRoute
	},
	logUserOut: function(){
		UserModel.logOut().then(function(){
			STORE.setStore('currentUser', {})
		})
	}
}
