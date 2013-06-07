define(function() {
	var Section = Backbone.Model.extend({
		defaults: {
			defaultSection: false,
			allowReload: false,
			hidden: true,
            name: ''
		}
    });

	return Section;
});