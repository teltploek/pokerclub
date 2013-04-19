define(['underscore',
        './collections/collection',
        './views/item',
        'hbs!./templates/picker',
        'hbs!./templates/alltime-item'],
function( _,
          Collection,
          ItemView,
          pickerTemplate,
          allTimeItemTemplate) {

  return {
    
    type: 'Backbone',

    collection: new Collection(),

    events: {
      'click [data-round]': function(e){
        e.preventDefault();
        
        var data = this.sandbox.dom.data(e.target);

        this.sandbox.emit('round.change', data.round);
      }
    },

    initialize: function() {
      _.bindAll(this, 'render');

      this.sandbox.on('route.leaderboard.**', this.roundController, this);

      this.sandbox.on('round.change', this.setRound, this);
      this.sandbox.on('season.change', this.seasonChange, this);

      this.attachCollectionListeners();
    },

    roundController: function(){     
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 1);

      this.sandbox.emit('round.change', args[3]);
    },

    seasonChange: function(season){
      var me = this;

      this.collection.setSeason(season);
    },

    attachCollectionListeners: function() {
      this.collection.on('reset', this.render);
      this.collection.on('add', this.render);
      this.collection.on('remove', this.render);

      this.collection.on('reset', this.collectionReady, this);
      this.collection.on('add', this.collectionReady, this);
      this.collection.on('remove', this.collectionReady, this);
    },

    collectionReady: function(){
      this.setRoundTitle();

      this.sandbox.emit('round.change', this.collection.getCurrentRound() );

      // if there's only one round, let's just hide the control - we only need it if there's something to choose between
      if (this.collection.length == 1){
        this.$el.hide();
      }
    },

    setRound: function(round){
      this.collection.setCurrentRound(round);

      this.setRoundTitle();
    },

    setRoundTitle: function(){
      var round = this.collection.getCurrentRound();

      var roundTitle = this.$('a[data-round='+round+']').text();

      this.$('#roundPickerCaption').text( roundTitle );

      this.sandbox.emit('round-title.change', roundTitle);
    },

    itemView: function() { return ItemView; },

    _getItemView: function(model) {
      return this.itemView.call(this, model);
    },

    render: function() {
      this.$el.html( pickerTemplate() );

      var $ul = this.$('ul.dropdown-menu'),
          items = [];
      
      this.collection.each(function(model) {
        var ItemView = this._getItemView(model);

        var View = ItemView.extend({
          model: model
        });

        var view = (new View());

        //row.push(view.el);

        $ul.append(view.el);

      }, this);

      $ul.append( allTimeItemTemplate() );

      if (this.collection.getSeason() == 'all'){
        this.$el.hide();
      }else{
        this.$el.show();
      }
    }
  }
});