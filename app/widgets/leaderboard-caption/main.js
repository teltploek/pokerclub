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
      roundChosen   : false
    },

    initialize: function() {
      _.bindAll(this, 'render');     

      // listen for changes in season and round widgets
      this.sandbox.on('season.change', this.setSeason, this);
      this.sandbox.on('round.change', this.setRound, this);

      this.render();
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

    render: function(){
    	this.$el.html( tpl( this.templateData ) );
    }
}

});