define(
    [
        'backbone'
    ],
    function( Backbone ){
        "use strict";

        return Backbone.Model.extend({

            url: 'tasks',

            defaults: {
                title: '',
                notes: ''
            }

        });
    }
);