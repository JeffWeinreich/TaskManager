import Backbone from 'backbone';
import {STORE} from './store.js';
import {UserModel} from './models/model-user.js';

export const ACTIONS = {
  changeCurrentNav: function(selectedRoute, urlRoute){
		STORE.setStore('currentNavRoute', selectedRoute)
		window.location.hash = urlRoute
}
