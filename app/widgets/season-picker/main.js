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
      'click [data-season]': function(e){
        e.preventDefault();
        
        var data = this.sandbox.dom.data(e.target);

        this.sandbox.emit('season.change', data.season);
      }
    },

    initialize: function() {
      var me = this;

      _.bindAll(this, 'render');

      this.sandbox.on('season.change', this.setSeason, this);

      this.attachCollectionListeners();

      this.collection.fetch({
        success: function(){
          me.collectionReady();
        }
      });
    },

    attachCollectionListeners: function() {
      this.collection.on('reset', this.render);
      this.collection.on('add', this.render);
      this.collection.on('remove', this.render);
    },

    collectionReady: function(){
      var defaultSeason = this.collection.at(0);

      this.sandbox.emit('season.change', defaultSeason.get('id') );

      // if there's only one season, let's just hide the controls - we only need it if there's something to choose between
      if (this.collection.length == 1){
        this.$el.hide();
      }
    },

    setSeason: function(season){
      var seasonTitle = this.$('a[data-season='+season+']').text();

      this.$('#seasonPickerCaption').text( seasonTitle );
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
    }
  }
});