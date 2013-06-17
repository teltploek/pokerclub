define(['underscore',
        './collections/menuItems',
        './views/item',
        'hbs!./templates/menu',       
        'hbs!./templates/loading'],
function( _,
          MenuItemsCollection,
          ItemView,
          menuTmpl,         
          loadingTmpl) {

  return {    
    type: 'Backbone',

    template: menuTmpl,

    collection: MenuItemsCollection,

    loadingTemplate: loadingTmpl,

    templateData: { 
      title: 'Nav bar menu'
    },

    noDataText: 'Der kunne desværre ikke hentes data. Prøv venligst igen senere.',

    itemView: function() { return ItemView; },

    initialize: function() {  
      this.renderLoading();

      this.attachCollectionListeners();

      this.render();
    },

    attachCollectionListeners: function() {
      this.collection.on('reset',   this.render, this);
      this.collection.on('add',     this.render, this);
      this.collection.on('remove',  this.render, this);
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
      this.$el.html( this.template() );

      var $menuItemBody = this.$('ul.nav'),
          menuItems = [];
      
      this.collection.each(function(model) {
        var ItemView = this._getItemView(model);

        var View = ItemView.extend({
          model: model
        });

        var view = (new View());

        //row.push(view.el);

        $menuItemBody.append(view.el);

      }, this);
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