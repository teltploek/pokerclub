define(function(){
	var config = {
		baseApiUrl : 'http://localhost/api/',

		serviceTemplates : {
			leaderboard: 'leaderboard/{{sortEntity}}/{{sortOrder}}/{{season}}/{{round}}',
			seasons: 'seasons',
			rounds: 'rounds/{{season}}'
		}
	};

	return config;
});