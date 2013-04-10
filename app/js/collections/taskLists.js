define(
    [
        'backbone',

        'models/taskList'
    ],
    function( Backbone, TaskList ){
        "use strict";

        return Backbone.Collection.extend({

            url: 'tasklists',

            model: TaskList

        });
    }
);