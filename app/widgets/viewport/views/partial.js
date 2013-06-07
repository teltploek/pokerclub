define(function(){
	var AppPartialView = Backbone.View.extend({
		el:'section#partial',

		initialize:function () {
            console.log(this);
            console.log(this.collection.getActive());
            
			this.on('afterRender', function () {
				app.core.Widgets.startAll( this.collection.getActive().get('widgets').toJSON() );

                // var lastWidth = null, me = this;
                // $(window).resize(function() {
                //     var width = $(window).width();

                //     if (lastWidth !== width) {
                //         lastWidth = width;
                //         me.resize();
                //     }
                // });
                // lastWidth = $(window).width();
                // this.resize();
			}, this);
		},

		cleanDom:function () {
			this.$el.html('');
		},

        resize: function() {
            //console.group('::resize()');
            // this.$('.vertical-response').each(function(i, el) {
            //     var $el = $(el);
            //     $el.css('width', 'auto'); // Take up maximum space
            //     var maxwidth = $el.innerWidth(), //  Grab the maximum space
            //         centerwidth = 0;

            //     //console.log('maxwidth = %d;', maxwidth);
            //     $el.children().each(function(n, child) {
            //         var $child = $(child),
            //             left = $child.position().left,
            //             width = $child.outerWidth(true);

            //         //console.log('width = %d; max = %d;', width, (left+width));
            //         if (maxwidth < (left+width)) { // Are the child outside the maximum space?
            //             $child.css('visibility', 'hidden');
            //         } else {
            //             $child.css('visibility', 'visible');
            //             centerwidth += width; // Visible elements width is stored to set the containers width
            //         }
            //     });
            //     $el.width(centerwidth); // Set the width and reflow
            // });
            //console.groupEnd('::resize()');
        },

		render:function () {
			var self = this;
			var section = this.collection.getActive();
			
            // facade.notifyShutdown();
            
			//Require the template we need! then render!
			require(['text!./widgets/viewport/templates/' + section.get('name') + '.html'], function (template) {
				self.template = template;

				self.$el.html(self.template);
				self.el.className = section.get('name').replace(/\//g, '_');

				/*
				Make sure the DOM has cooled down!
				*/
				setTimeout(function () {
					self.trigger('afterRender');
				}, 0);
			});
		}
	});

   return AppPartialView;
});
