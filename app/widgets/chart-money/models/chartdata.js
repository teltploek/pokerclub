define([]
, function()
{
	var Model = Backbone.Model.extend({
	  defaults: {
	    name : '',
	    clubMoney : '',
	    totalprizes : ''
	  }
	});
	return Model;
});

