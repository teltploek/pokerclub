define(function(){
	var PageModel = new Backbone.Model({
		defaults: {
			name			: '',
			templatePath	: '',
			isDefaultPage	: false,
			isGeneric		: false
		}
    });

    var PageCollection = new Backbone.Collection({
    	model : PageModel
    });

    // add site specific pages
    PageCollection.add([
			{   route	  		:	'/',
                templatePath 	: 	'pages/leaderboard.html',
                isDefaultPage  	: 	true
            }
    ]);

    // add site specific pages
    PageCollection.add([
			{   route	  		:	'leaderboard',
                templatePath 	: 	'pages/leaderboard.html',
                isDefaultPage  	: 	true
            }
    ]);

    // add generic pages
    PageCollection.add([
			{   route	  		:	'404',
                templatePath 	: 	'pages/generic/404.html',
                isGeneric		: 	true
            }
    ]);

    // stitch the configuration parameters together
	var config = {
		baseApiUrl : 'http://localhost/api/',

		pages: PageCollection,

		serviceTemplates : {
			leaderboard: 'leaderboard/{{sortEntity}}/{{sortOrder}}/{{season}}/{{round}}',
			seasons: 'seasons',
			rounds: 'rounds/{{season}}',
			chart: 'chart/money/{{season}}'
		}
	};

	return config;
});