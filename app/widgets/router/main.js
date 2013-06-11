define(['config', 'jquery'], function(Configuration, $){
	return {    
    	type: 'Backbone',
		
    	pageElm: null,

    	initialize: function() {
			this.sandbox.on('route.**', this.handleRouting, this);
		},

		handleRouting: function(route, args){
			var pageElm = $(this.el),
				sandbox = this.sandbox,
				page;

			// stop existing widgets, so we can load new ones
			sandbox.stop('#viewport');

			page = this.resolvePage(route);

			// load new page of widgets
			require(['text!' + page.get('templatePath') ], function(widgetTemplate) {
				// inject html and start widgets
          		pageElm.html(widgetTemplate);

          		sandbox.start('#viewport');
          	});
		},

		// find out which page the route translates to
		resolvePage: function(route){
			var pages = Configuration.pages,
				page;

			if (route === ''){
				page = pages.find(function (page) {
					return page.get('isDefaultPage') === true && !page.get('isGeneric');
				});
			}else{
				page = pages.find(function (page) {
					return page.get('route') === route && !page.get('isGeneric');
				});

				if (!page){
					page = pages.find(function (page) {
						return page.get('route') === '404' && page.get('isGeneric');
					});
				}
			}

			return page;
		}
    }
});