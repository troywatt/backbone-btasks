define(
    [
        'models/task'
    ],
    function( Task ){
        "use strict";

        return Backbone.Collection.extend({

            model: Task,

            url: 'tasks'

        });
    }
);