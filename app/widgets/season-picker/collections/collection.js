define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.seasons );

	var Collection = Backbone.Collection.extend({
		model 	: ItemModel,
		url	: Configuration.baseApiUrl + urlTpl()
	});

	return Collection;
});