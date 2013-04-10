define(['underscore', 'hbs!../templates/row'],
function(_, rowTmpl) {

    var Item = Backbone.View.extend({
        el: '<tr>',
        className: '',
        template: rowTmpl,

        events: {
        },

        initialize: function() {
            _.bindAll(this, 'render');

            this.model.on('change', this.render);

            this.render();
        },

        render: function() {
            var data = this.model.toJSON();

            this.$el.html( rowTmpl(data) );
        }
    });

    return Item;
});