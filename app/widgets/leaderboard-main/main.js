define(['underscore',
        './collections/collection',
        './views/row',
        'hbs!./templates/board',       
        'hbs!./templates/loading'],
function( _,
          Collection,
          ItemView,
          boardTmpl,         
          loadingTmpl) {

  return {    
    type: 'Backbone',

    template: boardTmpl,

    collection: new Collection(),

    loadingTemplate: loadingTmpl,

    templateData: { 
      title: 'Leaderboard'
    },

    noDataText: 'Der kunne desværre ikke hentes data. Prøv venligst igen senere.',

    itemView: function() { return ItemView; },
      
    events: {
      'click th' : 'setSort'
    },

    initialize: function() {
      _.bindAll(this, 'render');

      var view = this;

      this.renderLoading();
      
      this.sandbox.on('route.leaderboard.**', this.updateBoard, this);

      // listen for changes in season and round widgets
      this.sandbox.on('season.change', this.setSeasonFilter, this);
      this.sandbox.on('round.change', this.setRoundFilter, this);

      this.attachCollectionListeners();
    },

    updateBoard: function(){     
      var me = this;
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 1);

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

    setSort: function(event){
      var sortEntity = $(event.target).data('sort-entity');

      var route = this.collection.setSort(sortEntity);

      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    setSeasonFilter: function(season){
      var route = this.collection.returnUrl({ season : season });

      // if route is the same as before, the Backbone.Router won't trigger navigate (even if trigger is set to true!) - this would cause our view not to re-render
      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    setRoundFilter: function(round){
      var route = this.collection.returnUrl({ round : round });

      if (route !== Backbone.history.fragment){
        this.sandbox.router.navigate(route, { trigger : true });
      }else{
        this.updateBoard();
      }
    },

    attachCollectionListeners: function() {
      this.collection.on('reset', this.render);
      this.collection.on('add', this.render);
      this.collection.on('remove', this.render);
    },

    _getTemplate: function(model, element) {
      return _.isFunction(this.template) ? this.template.call(this, model, element) : this.template;
    },

    _getLoadingTemplate: function(model, element) {
        return _.isFunction(this.loadingTemplate) ? this.loadingTemplate.call(this, model, element) : this.loadingTemplate;
    },
   
    _getNoDataText: function() {
        return _.isFunction(this.noDataText) ? this.noDataText.apply(this, arguments) : this.noDataText;
    },

    _getTemplateData: function(model) {
      return _.isFunction(this.templateData) ? this.templateData.call(this, model) : this.templateData;
    },

    _getItemView: function(model) {
      return this.itemView.call(this, model);
    },

    render: function() {
      this.$el.html( boardTmpl() );

      var $tbody = this.$('tbody'),
          caretDirection = this.collection.getSortOrder() == 'desc' ? 'down' : 'up',
          sortEntity = this.collection.getSortEntity(),
          rows = [];
      
      this.collection.each(function(model) {
        var ItemView = this._getItemView(model);

        var View = ItemView.extend({
          model: model
        });

        var view = (new View());

        //row.push(view.el);

        $tbody.append(view.el);

      }, this);

      // add caret to current sort column
      this.$('th[data-sort-entity="'+sortEntity+'"]').append('<div class="sort '+caretDirection+'"></div>');

      // if a particular game is selected it makes no sense to show per game columns
      if (this.collection.getRound() === 'all'){
        this.$('.per-game').show();
      }else{
        this.$('.per-game').hide();
      }
    },

    renderLoading: function() {
        // var data = this._getTemplateData();

        // this.$el.html( loadingTemplate(data) );

        // var $ul = this.$('ul');
        // $ul.html(this.loadingTemplate);

        console.log('loading...');
    },

    renderNoData: function() {
        // var data = this._getTemplateData();
        // data.hideButtons = true;
        // /*data.title = '';*/
        // this.$el.html(facade.template.render(this._getTemplate(), data));
        // var $ul = this.$('ul');
        // var $li = facade.dom.build('<li class="item"/>');
        // var $h5 = facade.dom.build('<h5 class="errorText"/>');
        // $h5.html(this._getNoDataText());

        // $li.append($h5);
        // $ul.append($li);

        console.log('render no data');
    }
  }
});