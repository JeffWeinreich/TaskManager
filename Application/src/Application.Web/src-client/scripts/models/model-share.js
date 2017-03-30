import Backbone from 'backbone';
import $ from "jquery";

export const ShareModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/lists/:id/share',
	emailAttribute: 'email'
});
