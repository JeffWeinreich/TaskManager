// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {STORE} from './store.js';
import {UserModel} from './models/model-user.js';
import {ListModel,ListCollection} from "./models/model-list.js";

export const ACTIONS = {
	setView: function(viewName, routeParamsData){
		if(typeof routeParamsData !== 'undefined'){
			STORE.setStore('routeParams', routeParamsData)
		};
		STORE.setStore('currentView', viewName)
	},

	setAPIData: function(results){
		STORE.setStore('dummyData',results)
	},

	loginUser: function(credsObj){
		UserModel.logIn(credsObj.email, credsObj.password).then(function(serverRes){
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
		console.log('logging out user...')
		UserModel.logOut().then(function(){
			STORE.setStore('currentUser', {})
		})
	},

	setListToPost: function(givenListObj){
		STORE.setStore("listToPost", givenListObj)
		let newMod = new ListModel();
		newMod.set(givenListObj);
		newMod.save().then(function(serverRes){
			console.log(serverRes);
			STORE.setStore("listData", serverRes);
			ACTIONS.changeCurrentNav("routeToSingleList","lists/"+serverRes.id);
		});
	},

	fetchCurrenUser: function(){
		UserModel.getCurrentUser().then(function(serverRes){
			console.log(serverRes)
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
			STORE.setStore("allListsData", serverRes);
		})
	}
};
