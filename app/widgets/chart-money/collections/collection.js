define(['underscore', 'handlebars', 'config', '../models/chartdata']
, function(_, Handlebars, Configuration, RowModel)
{	
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.chart );

	var Collection = Backbone.Collection.extend({
		model 	: RowModel,	

		season		: 'latest',

		url	: Configuration.baseApiUrl + urlTpl({ season : 'latest' }),

		setSeason: function(season){
			this.season = season || this.season;

			return urlTpl(this);
		},

		getNames: function(){
			var names = this.map(function(model){
  				return model.get('name');
			});

			return names;
		},

		getClubMoney: function(){
			var clubMoney = this.map(function(model){
  				return parseInt(model.get('clubMoney'));
			});

			return clubMoney;
		},


		getTotalPrizes: function(){
			var totalprizes = this.map(function(model){
  				return parseInt(model.get('totalprizes'));
			});

			return totalprizes;
		},

		returnUrl: function(changeObj){
			var me = this;

			_.each(changeObj, function(val, prop){
				me[prop] = val;
			});

			return urlTpl(this);
		},

		applyChanges: function(){			
			this.fetch({
				url : Configuration.baseApiUrl + urlTpl(this)
			});
		}
	});

	return Collection;
});