// IMPORTS - BACKBONE
import Backbone from 'backbone'

// IMPORTS - DATA FLOW
import {STORE} from './store.js';
import {UserModel} from './models/model-user.js';
import {ListModel,ListCollection} from "./models/model-list.js";
import {TodoModel,TodoCollection} from "./models/model-todos.js";

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
			STORE.setStore('currentUser', serverRes)
		})
	},

	registerNewUser: function(newUserInfoObj){
		UserModel.register(newUserInfoObj).then(function(serverRes){
			let loginNewUser = {
				email: newUserInfoObj.email,
				password: newUserInfoObj.password
			}
			ACTIONS.loginUser(loginNewUser);
			ACTIONS.changeCurrentNav('routeToAllLists', '');
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
	},

	updateTodo: function(todoObj){
		// crazy hack by Travis Hubbard
		let newTodo = new TodoModel();
		newTodo.set(todoObj).save().then(function(serverRes){
			let listDataCopy = Object.assign({}, STORE.getStoreData().listData)
			let todosDataCopy = [...listDataCopy.todos]

			todosDataCopy = todosDataCopy.map(function(todo){
					if(todo.id !== todoObj.id) {
							return todo
					}	else { return newTodo.toJSON() }
			})

			listDataCopy.todos = todosDataCopy
			STORE.setStore('listData', listDataCopy)
		})
	}
};
