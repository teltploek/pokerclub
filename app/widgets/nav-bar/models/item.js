define([]
, function()
{
	var Model = Backbone.Model.extend({
		defaults: {
			route				: '',
			caption				: ''
		}
	});
	return Model;
});