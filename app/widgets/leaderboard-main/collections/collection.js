define(['underscore', 'handlebars', 'config', '../models/row']
, function(_, Handlebars, Configuration, RowModel)
{
	
	var urlTpl = Handlebars.compile( Configuration.serviceTemplates.leaderboard );

	var Collection = Backbone.Collection.extend({
		model 	: RowModel,	

		sortEntity 	: 'points',
		sortOrder 	: 'desc',
		season		: 'latest',
		round		: 'all',

		url	: Configuration.baseApiUrl + urlTpl({ 	sortEntity 	: 'points',
													sortOrder 	: 'desc',
													season 		: 'latest',
													round 		: 'all' }),

		changeSortOrder: function(){
			this.sortOrder = this.sortOrder == 'desc' ? 'asc' : 'desc';
		},

		setSortEntity: function(sortEntity){
			this.sortEntity = sortEntity || this.sortEntity;
		},

		setSortOrder: function(sortOrder){
			this.sortOrder = sortOrder || this.sortOrder;
		},

		setSort : function(sortEntity){
			if (sortEntity == this.sortEntity){
				this.changeSortOrder();
			}else{
				this.setSortOrder('desc');
			}

			this.setSortEntity(sortEntity);

			this.applyChanges();
		},

		setSeason: function(season){
			this.season = season || this.season;

			return urlTpl(this);
		},

		setRound: function(round){
			this.round = round || this.round;

			return urlTpl(this);
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