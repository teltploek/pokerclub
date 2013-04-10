define([]
, function()
{
	var Model = Backbone.Model.extend({
		defaults: {
			id					: '',
			title				: ''
		}
	});
	return Model;
});