define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	// var urlTpl = Handlebars.compile( Configuration.serviceTemplates.navbarMenuItems );

	var Collection = new Backbone.Collection({
		model 	: ItemModel

		// url	: Configuration.baseApiUrl + urlTpl()
	});

	Collection.add([
		{
			route 	: 'foo',
			caption : 'Foo'
		},
		{
			route 	: 'bar',
			caption : 'Bar'
		},
		{
			route 	: 'baz',
			caption : 'Baz'
		},
		{
			route 	: 'leaderboard',
			caption : 'leaderboard'
		}
	]);

	return Collection;
});