define(['text!../templates/viewport.html'],
function(template) {

    var AppView = Backbone.View.extend({
        
        initialize: function() {
            this.render();
        },

        render: function() {
            //Figure out which section we should render
			this.$el.html(template);
        }
    });

    return AppView;
});