// this will act as the controller for the entire leaderboard page, and handle communication between widgets
define(['underscore',
        './collections/collection'],
function( _,
          Collection) {

  return {    
    type: 'Backbone',

    collection: new Collection(),

    initialize: function() {     
      _.bindAll(this, 'emitChanges');

      this.prepareToDie();

      this.sandbox.on('route.leaderboard.**', this.updateBoard, this);

      // listen for changes in season and round widgets
      this.sandbox.on('season.change', this.setSeasonFilter, this);
      this.sandbox.on('round.change', this.setRoundFilter, this);
      this.sandbox.on('sort.change', this.setSort, this);

      this.attachCollectionListeners();

      this.collection.fetch();
    },

    updateBoard: function(){     
      var me = this;
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 1);

      var changes = 0;

      _.each(args, function(entry, idx){
        switch(idx){
          case 0: // sort entity
            me.collection.setSortEntity(entry);
            break;
          case 1: // sort order
            me.collection.setSortOrder(entry);
            break;
          case 2: // season
            me.collection.setSeason(entry);
            break;
          case 3: // round
            me.collection.setRound(entry);
            break;
        }

      });

      this.collection.applyChanges();
    },

    setSort: function(sortEntity, sortOrder){
      var route = this.collection.setSort(sortEntity);

      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    setSeasonFilter: function(season){
      var route = this.collection.returnUrl({ season : season });

      this.sandbox.emit('leaderboard-season.change', season);

      // if route is the same as before, the Backbone.Router won't trigger navigate (even if trigger is set to true!) - this would cause our view not to re-render
      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    setRoundFilter: function(round){
      var route = this.collection.returnUrl({ round : round });

      this.sandbox.emit('leaderboard-round.change', round);

      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    attachCollectionListeners: function() {
      this.collection.on('reset',   this.emitChanges);
    },

    emitChanges: function() {
      console.log('emit changes');

      this.sandbox.emit('leaderboard-data.change', _.clone(this.collection));
    }
  }
});