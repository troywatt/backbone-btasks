// bridge to google api that Backbone.sync will defer to

define(
    [
        'config'
    ],
    function ( config ) {
        "use strict";

//        var gapi = null;
        function ApiManager() {
            this.requireGapi();
        };

        _.extend( ApiManager.prototype, Backbone.Events, {

            init: function () {
                //All the init method needs to do is load the Tasks API with gapi.client.load:
                var self = this;

                window.gapi.client.load( 'tasks', 'v1', function(){
                    console.log( 'google.tasks loaded' );
                });

                function handleClientload(){
                    window.gapi.client.setApiKey( config.gapi.apiKey );
                    setTimeout( checkAuth, 100 );
                };

                function checkAuth(){
                    window.gapi.auth.authorize({
                        client_id: config.gapi.clientId,
                        scope: config.gapi.scopes,
                        immediate: true
                    }, handleAuthResult );
                };

                function handleAuthResult( authResults ){
                    console.log( 'gapi.authResults:', authResults );
                };

                handleClientload();

            },

            requireGapi: function () {
                var self = this;

                if ( typeof window.gapi !== 'undefined' ) {
                    return this.init();
                }

                // load the google api asynchronously
                require( ['https://apis.google.com/js/client.js?onload=define'], function(){

                    checkGapi();

                    function checkGapi(){
                        if ( window.gapi && window.gapi.client ) {
                            self.init();
                        }
                        else {
                            setTimeout( checkGapi, 100 );
                        }
                    };

                });
            }

        } );


        Backbone.sync = function ( method, model, options ) {
            options || (options = {});

            switch ( method ) {
                case 'create':
                    break;

                case 'update':
                    break;

                case 'delete':
                    break;

                case 'read':
                    break;
            }
        };

        return ApiManager;

    }
);