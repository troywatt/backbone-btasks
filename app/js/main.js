
requirejs.config({

    baseUrl: '/js',

    paths: {

        lib: 'lib',

        // requirejs template loader
        text: 'lib/text',
        // template router
        tpl: 'templates',

        // libraries
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    },

    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            exports: 'Backbone',
            deps: [ 'underscore' ]
        },

        app: {
            deps: [ 'underscore', 'backbone' ]
        }

    }
});


require(
    [ 'app', 'underscore' ],
    function( App, _ ){
        "use strict";

        // set underscore template interpolation
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        window.bTask = new App();
    }
);