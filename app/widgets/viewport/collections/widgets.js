define(['../models/widget'],
function(Widget) {
    var Widgets = Backbone.Collection.extend({
        model: Widget,
        initialize: function() {
			this.on('change:loaded', function() {
				if(!this._anyUnloaded()) {
					this.trigger('widgets:loaded');
				}
			});
		},
        getWidget: function(channel) {
            var widget;
            widget = this.find(function(widget) { return widget.get('channel') === channel; });

            return widget;
        },
		_anyUnloaded: function() {
			return this.any(function(model) {
				return model.get('loaded') === false;
			});
		}
    });

    return Widgets;
});