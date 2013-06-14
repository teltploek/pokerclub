define(['config', 'jquery'], function(Configuration, $){
	return {    
    	type: 'Backbone',
		
    	pageElm: null,

    	currentRoute: '',

    	initialize: function() {
			this.sandbox.on('route.**', this.mediator, this);
		},

		mediator: function(route, args){
			// we don't want to change page if the first part of the hash still points to the current page
			if (route !== this.getPageFragment(route, args)){
				this.currentRoute = route;

				this.handleRouting(route, args);
			}
		},

		handleRouting: function(route, args){
			var pageElm = $(this.el),
				sandbox = this.sandbox,
				page;

			// stop existing widgets, so we can load new ones
			// sandbox.stop();
			sandbox.emit('teardown');

			page = this.resolvePage(route);

			// load new page of widgets
			require(['text!' + page.get('templatePath') ], function(widgetTemplate) {
				// inject html and start widgets
          		pageElm.html(widgetTemplate);

          		sandbox.start('#viewport');
          	});
		},

		getPageFragment: function(){
			return (this.currentRoute || '').split('/')[0];
		},

		// widgetList: function(){
		// 	var selector = '[data-aura-widget]',
		// 		widgets = [];

		// 	$(selector, '#viewport').each(function(){
		// 		widgets.push( $(this).attr('data-aura-widget') );
		// 	});

		// 	return widgets;
		// },

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