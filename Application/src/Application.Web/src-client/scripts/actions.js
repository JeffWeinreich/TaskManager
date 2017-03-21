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
	}
}
