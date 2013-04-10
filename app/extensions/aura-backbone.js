define(function() {
  return function(app) {
    var _ = app.core.util._;
    var historyStarted = false;
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

        app.core.registerWidgetType('Backbone', Backbone.View.prototype);
      },
      afterAppStart: function(app) {

        if (!historyStarted) {
          _.delay(function() {

            // global router
            var Router = Backbone.Router.extend({
              initialize: function() {
                Backbone.history.start();

                app.sandbox.emit('initialized', 'Initialized Router');
              },
              routes: {
                '*router': 'router'
              },

              router: function(args) {
                var slice = Array.prototype.slice;
                var event, route;
                args = args.split('/');   // split by slashes
                event = slice.call(args,0);
                event.unshift('route');   // prepend 'route' namespace
                route = event.join('.');  // join into delimeter format
                route = [route];          // wrap route in an array

                // ['route.example', arg1, arg2, arg3]
                app.sandbox.emit.apply(this, route.concat(args));
              }

            });

            var router = new Router();

            app.sandbox.router = router;

            // app.sandbox.on.log('route.**'); // dump all routes to console.log
            app.sandbox.on('route.**', function(){
              console.log(arguments);
            });

          }, 200);
        }
      }
    }
  }
});