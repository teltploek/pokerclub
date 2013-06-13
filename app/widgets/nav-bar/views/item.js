define(['underscore', 'hbs!../templates/item'],
function(_, itemTmpl) {

    var Item = Backbone.View.extend({
        el: '<li>',
        className: '',
        template: itemTmpl,

        router: null,

        events: {
            'click a' : 'reroute'
        },

        initialize: function() {
            

            _.bindAll(this, 'render');

            // this.model.on('change', this.render);

            this.render();
        },

        reroute: function(e) {

            console.log(this);

            console.log(e);
        },

        render: function() {
            var data = this.model.toJSON();

            this.$el.html( itemTmpl(data) );
        }
    });

    return Item;
});