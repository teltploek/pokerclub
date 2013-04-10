define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.rounds );

	var Collection = Backbone.Collection.extend({
		model 	: ItemModel,

		season : '',

		url	: Configuration.baseApiUrl + urlTpl({ season : 'all' }),

		setSeason: function(season){
			this.season = season || this.season;

			this.applyChanges();
		},

		getSeason: function(){
			return this.season;
		},

		applyChanges: function(){			
			this.fetch({
				url : Configuration.baseApiUrl + urlTpl(this)
			});
		}
	});

	return Collection;
});