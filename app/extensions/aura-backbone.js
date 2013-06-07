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

        app.core.registerWidgetType('Backbone', Backbone.View.prototype);
      }
    }
  }
});