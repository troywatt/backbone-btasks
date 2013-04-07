
requirejs.config({

    baseUrl: 'js',

    paths: {
    },

    shim: {

        'lib/underscore': {
            exports: '_'
        },

        'lib/backbone': {
            exports: 'Backbone',
            deps: [ 'lib/underscore' ]
        },

        'app': {
            deps: [ 'lib/underscore', 'lib/backbone' ]
        }

    }
});


require(
    [ 'app' ],
    function( App ){
        "use strict";

        window.bTask = new App();
    }
);