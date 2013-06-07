require.config({
    baseUrl: "/",
    paths: {
        jquery: 'components/jquery/jquery',
        highcharts: 'components/highcharts/highcharts',
        bootstrap: 'scripts/vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        "highcharts": {
            "exports": "Highcharts",
            "deps": [ "jquery"] 
        }
    }
});

define(['components/aura/lib/aura', 'bootstrap'], function(Aura) {
  Aura()
    .use('extensions/aura-backbone')
    .use('extensions/aura-router')
    .use('extensions/aura-localstorage')
    .use('extensions/aura-handlebars')
    .use(function(app) {
      window.PK = app.createSandbox();
    })
    .start({ widgets: 'body' }).then(function() {
      console.warn("Aura started !");
    });
});