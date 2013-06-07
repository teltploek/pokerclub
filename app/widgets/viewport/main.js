define([
    './views/app',
    './views/partial',
    './models/section',
    './collections/sections',
    './collections/widgets'
],
function (AppView, PartialView, Section, Sections, Widgets) {
	return function () {
// 		var partial;
// 		var globalSection;
// 		var sectionList = new Sections();

// 		var sandbox = this.sandbox;

// 		/*
// 			Global widgers that will never close!
// 		*/
// 		globalSection = new Section({
// 			widgets:new Widgets([
// 				// { channel:'global-menu', element:'.dock .bar nav' }
// 			])
// 		});

// 		/*
// 			Pages!
// 		*/
// 		sectionList.add([
// 			{
//                 name:'leaderboard',
//                 defaultSection:true,
//                 widgets:new Widgets([
//                 	{ channel:'leaderboard-caption', element:'.leaderboard-caption' },
//                     { channel:'season-picker', element:'.season-picker' },
//                     { channel:'round-picker', element:'.round-picker' },
//                     { channel:'leaderboard-main', element:'.leaderboard-main' },
//                     { channel:'chart-money', element:'.chart-money' }
//                 ])
//             }
//         ]);

//         sectionList.on('change:hidden', function (section, newValue) {
//             //If the section is hidden, the widgets should be stopped and removed frm the DOM
// 			if (newValue === true) {
// 				section.get('widgets').each(function (widget) {
// 					widget.set('loaded', false);
// 					app.core.stop(widget.get('channel'));
// 				});

// 				partial.cleanDom();
// 			} else { //The section is now active and should therefore be rendered/started
// 				partial.render();
// 			}
// 		}, this);

// 		sandbox.on('widget:load', function (name) {
// 			var section = sectionList.getActive(), notLoaded, active;

// 			if (!section) {
// 				return;
// 			}

// 			if (globalSection.get('widgets').getWidget(name)) {
// 				return;
// 			}
// console.log(name);
// 			// Update the widget model of the current loaded widget
// 			active = section.get('widgets').getWidget(name);

// 			if (active) {
// 				active.set('loaded', true);
// 			}

// 			// Check if we have any widgets shich are not loaded
// 			notLoaded = section.get('widgets').find(function (widget) {
// 				return widget.get('loaded') === false;
// 			});

// 			if (!notLoaded) {
// 				sandbox.router.refresh();
// 			}
// 		});

//         //Publish the viewport view!
// 		new AppView({ el:'body', collection: globalSection.get('widgets') });

// 		partial = new PartialView({ collection:sectionList });

// 		var section,
// 			page = '';

// 		//Find the landing page or the first page
// 		section = sectionList.find(function (section) {
// 			return section.get('defaultPage') === true;
// 		});

// 		page = ( section || sectionList.first() ).get('name');

// 		partial.render();
	}
});