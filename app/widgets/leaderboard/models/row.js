define([]
, function()
{
	var Model = Backbone.Model.extend({
	  defaults: {
	    name					: '',
	    appearances				: 0,
	    points					: 0,
	    pointsPerGame			: 0,
	    hits					: 0,
	    hitsPerGame				: 0,
	    moneyWon				: 0,
	    moneyWonPerGame 		: 0,    
	    inTheMoney 				: 0,
	    inTheMoneyPercentage 	: 0
	  }
	});
	return Model;
});

