define(['underscore', 'hbs!../templates/item'],
function(_, itemTmpl) {

    var Item = Backbone.View.extend({
        el: '<li>',
        template: itemTmpl,

        initialize: function() {
            this.render();
        },

        render: function() {
            var data = this.model.toJSON();

            this.$el.html( itemTmpl(data) );
        }
    });

    return Item;
});