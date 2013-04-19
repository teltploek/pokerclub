define(['underscore',
        'hbs!./templates/main'],
function( _,
          tpl) {

return {

	type: 'Backbone',
    template: tpl,

    templateData: {
      season        : '',
      round         : '',
    	seasonChosen  : true,
      roundChosen   : false,
      sortEntity    : '',
      sortOrder     : ''
    },

    initialize: function() {
      _.bindAll(this, 'render');     

      // listen for changes in season and round widgets
      this.sandbox.on('season-title.change', this.setSeason, this);
      this.sandbox.on('round-title.change', this.setRound, this);
      this.sandbox.on('leaderboard-sort.change', this.setSort, this);
    },

    setSeason: function(season){
      this.templateData.seasonChosen = season === 'all' ? false : true;
    	this.templateData.season = season;

    	this.render();
    },

    setRound: function(round){
      this.templateData.roundChosen = round === 'all' ? false : true;
      this.templateData.round = round;

      this.render();
    },

    setSort: function(sortEntity, sortOrder){
      this.templateData.sortEntity = sortEntity;
      this.templateData.sortOrder = sortOrder == 'asc' ? 'stigende' : 'faldende'; // TODO: consider internalization module for these strings

      this.render();
    },

    render: function(){
    	this.$el.html( tpl( this.templateData ) );

      this.$('.caption-wrapper').fadeIn('slow');
    }
}

});