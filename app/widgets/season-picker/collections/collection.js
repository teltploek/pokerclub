define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.seasons );

	var Collection = Backbone.Collection.extend({
		model 	: ItemModel,

		currentSeason : 0,

		url	: Configuration.baseApiUrl + urlTpl(),

		setCurrentSeason: function(season){
			this.currentSeason = season || this.currentSeason;
		},

		getCurrentSeason: function(){
			return this.currentSeason;
		}
	});

	return Collection;
});