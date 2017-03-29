import Backbone from 'backbone';
import $ from "jquery";

export const TodoModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/todos',
	idAttribute: 'id'
});

export const TodoCollection = Backbone.Collection.extend({
	model: TodoModel,
	url: '/api/todos'
});
