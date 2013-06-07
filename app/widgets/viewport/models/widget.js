define(function() {
    var Widget = Backbone.Model.extend({
		defaults: {
			channel: '',
			element: '',
			loaded: false
		},
		initialize: function() {
		}
    });

    return Widget;
});