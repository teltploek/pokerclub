define(['underscore',
        './views/row',
        'hbs!./templates/board',       
        'hbs!./templates/loading'],
function( _,
          ItemView,
          boardTmpl,         
          loadingTmpl) {

  return {    
    type: 'Backbone',

    template: boardTmpl,

    collection: null,

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
      this.prepareToDie();
      
      this.sandbox.on('leaderboard-data.change', this.setCollection, this);

      this.renderLoading();
    },

    setCollection: function(collection){
      this.collection = collection;

      this.render();
    },

    setSort: function(event){
      var sortEntity = $(event.target).data('sort-entity');

      var sortOrder = this.collection.getSortOrder();

      this.sandbox.emit('sort.change', sortEntity, sortOrder);
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

      this.$('th i').popover({
        trigger : 'hover',
        html : true
      });
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