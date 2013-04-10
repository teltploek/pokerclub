require.config({
    baseUrl: "/",
    paths: {
        jquery: 'components/jquery/jquery',
        bootstrap: 'scripts/vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

define(['components/aura/lib/aura', 'bootstrap'], function(Aura) {
  Aura()
    .use('extensions/aura-backbone')
    .use('extensions/aura-localstorage')
    .use('extensions/aura-handlebars')
    .use(function(app) {
      window.PK = app.createSandbox();
    })
    .start({ widgets: 'body' }).then(function() {
      console.warn("Aura started !");
    });
});