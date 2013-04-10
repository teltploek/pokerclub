define(['underscore', 'hbs!../templates/item'],
function(_, itemTmpl) {

    var Item = Backbone.View.extend({
        el: '<li>',
        className: '',
        template: itemTmpl,

        events: {
        },

        initialize: function() {
            _.bindAll(this, 'render');

            this.model.on('change', this.render);

            this.render();
        },

        render: function() {
            var data = this.model.toJSON();

            this.$el.html( itemTmpl(data) );
        }
    });

    return Item;
});