// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {STORE} from './store.js';
import {UserModel} from './models/model-user.js';
import {ListModel,ListCollection} from "./models/model-list.js";

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
			ACTIONS.loginUser(serverRes);
			ACTIONS.changeCurrentNav('HOME', '');
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
	},

	setListToPost: function(givenListObj){
		STORE.setStore("listToPost", givenListObj)
	},

	fetchCurrenUser: function(){
		UserModel.getCurrentUser().then(function(serverRes){
			STORE.setStore('currentUser', serverRes)
    })
	},

	fetchGivenList: function(givenListID){
		let newMod = new ListModel();
		newMod.set({id: givenListID});
		newMod.fetch().then(function(serverRes){
			STORE.setStore("listData", serverRes);
		})
	},

	fetchAllLists: function(){
		let newColl = new ListCollection();
		newColl.fetch().then(function(serverRes){
			STORE.setStore("listData", serverRes);
		})
	}
};
