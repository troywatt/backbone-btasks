define(
    [
        'tpl'
    ],
    function( tpl ){
        "use strict";

        return Backbone.View.extend({

            el: '#sign-in-container',

            template: _.template( tpl.auth ),

            events: {
                'click #authorize-button': 'auth'
            },

            initialize: function( app ){
                this.app = app;
                this.$el.html( this.template() );
                return this;
            },

            auth: function(){

                // checkAuth: @param false = isImmediate will display google prompt if session does not already exist
                this.app.apiManager.checkAuth( false );
                return false;
            }

        });
    }
);