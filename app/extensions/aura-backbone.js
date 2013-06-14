define(function() {
  return function(app) {
    var _ = app.core.util._;
    var Backbone;
    return {
      require: {
        paths: { 
          backbone: 'components/backbone/backbone',
          underscore: 'components/underscore/underscore' 
        },
        shim: {
          backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] }
        }
      },
      initialize: function(app) {
        Backbone = require('backbone');
        app.core.mvc    = Backbone;
        app.sandbox.mvc = Backbone;
        app.sandbox.widgets = app.core.Widgets;

        Backbone.View.prototype.prepareToDie = function(){
          _.bindAll(this, 'teardown');

          this.sandbox.on('teardown', this.teardown);
        };

        Backbone.View.prototype.teardown = function() {
          this.unbind();

          this.stopListening();

          this.off();
          this.sandbox.off();
          this.collection.off();

          delete this.el;

          this.$el.empty();
          this.$el.remove();

          delete this.$el;

          this.close();         
        };

        app.core.registerWidgetType('Backbone', Backbone.View.prototype);        
      }
    }
  }
});