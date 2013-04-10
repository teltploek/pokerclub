define(['underscore', 'handlebars', 'config', '../models/item']
, function(_, Handlebars, Configuration, ItemModel)
{
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.rounds );

	var Collection = Backbone.Collection.extend({
		model 	: ItemModel,

		currentRound: 'all',
		season : '',

		url	: Configuration.baseApiUrl + urlTpl({ season : 'all' }),

		setSeason: function(season){
			this.season = season || this.season;

			this.applyChanges();
		},

		setCurrentRound: function(round){
			this.currentRound = round || this.currentRound;
		},

		getSeason: function(){
			return this.season;
		},

		getCurrentRound: function(){
			return this.currentRound;
		},

		applyChanges: function(){			
			this.fetch({
				url : Configuration.baseApiUrl + urlTpl(this)
			});
		}
	});

	return Collection;
});