define(
    function( require ){
        "use strict";

         return {
             // applicationLayout: require( 'text!templates/layouts/applicationLayout.html' )
             app:       require( 'text!templates/app.html' ),
             auth:      require( 'text!templates/auth.html' )
         }
    }
);