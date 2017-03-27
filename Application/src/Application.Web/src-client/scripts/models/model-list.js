import Backbone from 'backbone';

export const ListModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/lists',
	idAttribute: '_id'
})

export const ListCollection = Backbone.Collection.extend({
	model: ListModel,
	url: '/api/lists'
})
