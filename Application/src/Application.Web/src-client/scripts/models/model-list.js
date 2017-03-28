import Backbone from 'backbone';
import $ from "jquery";

export const ListModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/lists',
	idAttribute: 'id'
});

export const ListCollection = Backbone.Collection.extend({
	model: ListModel,
	url: '/api/lists'
});
