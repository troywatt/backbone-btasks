define(
    function( require ){
        "use strict";

         return {
             // applicationLayout: require( 'text!templates/layouts/applicationLayout.html' )
             app:                   require( 'text!templates/app.html' )
             , auth:                require( 'text!templates/auth.html' )

             , menuItem:            require( 'text!templates/lists/menuItem.html' )
             , listEdit:            require( 'text!templates/lists/form.html' )

             , tasksIndex:          require( 'text!templates/tasks/index.html' )
             , task:                require( 'text!templates/tasks/task.html' )

         }
    }
);