define(['../models/section'],
    function (Section) {
        var Sections = Backbone.Collection.extend({
            model:Section,

            getActive:function () {
                return this.find(function (section) {
                    return section.get('hidden') === false;
                });
            },
            exists:function (key, value) {
                return (this.find(function (section) {
                    return section.get(key) === value;
                })) || false;
            },
            changeActive:function (page) {
                //Close everything
                this.each(function (section) {
                    section.set('hidden', true);
                });

                (this.find(function (section) {
                    return section.get('name') === page;
                })).set('hidden', false);
            }
        });

        return Sections;
    });