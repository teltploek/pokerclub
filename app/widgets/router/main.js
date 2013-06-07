// TODO: move to routes definition, so we can't call all widgets as routes
// TODO: we also need a default route
// TODO: we want the page to stay on the page, if the leaderboard is the same

define(['jquery'], function($){
	return {    
    	type: 'Backbone',
    	
    	bodyElm: null,

    	initialize: function() {
    		bodyElm = $(this.el).closest('body');

			this.sandbox.on('route.**', this.handleRouting, this);
		},

		handleRouting: function(route, args){
			var sandbox = this.sandbox;
		
			require(['text!widgets/' +route+ '/templates/' +route+ '.html'], function(widgetTemplate) {
          		bodyElm.html(widgetTemplate);

          		_.each($(bodyElm).find('[data-aura-widget]'), function(elm){
          			var widget = $(elm).attr('data-aura-widget');         			
          		});

          		sandbox.start('body');
          	});
		}
    }
});