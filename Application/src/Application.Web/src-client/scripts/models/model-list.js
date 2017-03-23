import Backbone from 'backbone'

export const ListModel = Backbone.Model.extend({
	urlRoot: '/api/lists',
	idAttribute: '_id'
})

export const ListCollection = Backbone.Collection.extend({
	model: ListModel,
	url: '/api/lists'
})
