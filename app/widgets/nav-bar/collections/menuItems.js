define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	// var urlTpl = Handlebars.compile( Configuration.serviceTemplates.navbarMenuItems );
	var MenuItemsCollection = Backbone.Collection.extend({
		model: ItemModel
	});

	var collection = new MenuItemsCollection();

	collection.add([
		{
			route 	: 'leaderboard',
			caption : 'Leaderboard'
		},
		{
			route 	: 'documentation',
			caption : 'Dokumentation'
		}
	]);

	return collection;
});