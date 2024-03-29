// bridge to google api that Backbone.sync will defer to

define(
    [
        'config'
    ],
    function ( config ) {
        "use strict";

//        var app;


        // private API
        var gauth = _.extend( Backbone.Events, {

            checkAuth: function( isImmediate ){
                window.gapi.auth.authorize(
                    {
                        client_id: config.gapi.clientId,
                        scope: config.gapi.scopes,
                        immediate: isImmediate
                    },
                    gauth.handleAuthResult
                );
            },

            handleGapiLoad: function( fn ){
                // check that that googleapis has loaded properly
                if ( window.gapi && window.gapi.client ) {
                    fn && fn();
                }
                else {
                    setTimeout( function(){
                        gauth.handleGapiLoad( fn );
                    }, 1 );
                }
            },

            handleAuthResult: function( authResults ){
                console.log( 'gapi.authResults:', authResults );
                var authTimeout;

                if( authResults && !authResults.error ) {
                    // ok to start making api calls
                    // schedule a check when the auth token expires
                    if( authResults.expires_in ) {
                        authTimeout = ( authResults.expires_in - 5 * 60 ) * 1000;

                        setTimeout( function(){
                            gauth.checkAuth( false );
                        }, authTimeout );
                    }

                    // TODO: delegate to an application event to be handled by a view instead
                    //app.views.auth.$el.hide();
                    console.log( 'auth logged in' );
                    $('#signed-in-container').show();
                    gauth.trigger( 'ready' );
                }
                else {
                    // login failed display sign-in button
                    if( authResults && authResults.error ) {
                        console.error( 'Unable to sign in:', authResults.error );
                    }
                    // TODO: delegate to an application event to be handled by a view instead
                    console.log( 'auth login failed' );
                    $('#sign-in-container').show();
                    //app.views.auth.$el.show();
                }
            }
        });


        // public API
        function ApiManager( _app ) {
//            app = _app;
            this.requireGapi( _.bind( this.init, this ) );
        };

        _.extend( ApiManager.prototype, Backbone.Events, {

            init: function () {
                //All the init method needs to do is load the Tasks API with gapi.client.load:
                window.gapi.client.setApiKey( config.gapi.apiKey );

                window.gapi.client.load( 'tasks', 'v1', function(){
                    console.log( 'google.tasks loaded' );
                });

                gauth.on( 'ready', function(){
                    // do stuff
                    this.trigger( 'ready' );
                }, this );

                setTimeout( function(){
                    gauth.checkAuth( true );
                }, 1 );

            },

            checkAuth: function( isImmediate ){
                gauth.checkAuth( isImmediate );
            },

            requireGapi: function ( fn ) {
                if ( typeof window.gapi !== 'undefined' ) {
                    return fn && fn();
                }

                // load the google api asynchronously
                require( ['https://apis.google.com/js/client.js?onload=define'], function(){
                    gauth.handleGapiLoad( fn );
                });
            }

        } );


        Backbone.sync = function ( method, model, options ) {
            var requestContent = {}, request;
            options || (options = {});

            // A slight complication is Google’s API requires a tasklist property in the object
            // passed to update. This isn’t very clearly documented (you’ll notice the tasklists/update
            // reference doesn’t have a JavaScript example).
            // https://developers.google.com/google-apps/tasks/v1/reference/tasklists/update
            switch( model.url ) {
                case 'tasks':
                    requestContent.task = model.get( 'id' );
                    break;

                case 'tasklists':
                    requestContent.tasklist = model.get( 'id' );
                    break;
            }

            switch ( method ) {
                case 'create':
                    requestContent[ 'resource' ] = model.toJSON();
                    request = window.gapi.client.tasks[ model.url ].insert( requestContent );
                    Backbone.gapiRequest( request, method, model, options );
                    break;

                case 'update':
                    requestContent[ 'resource' ] = model.toJSON();
                    request = window.gapi.client.tasks[ model.url ].update( requestContent );
                    Backbone.gapiRequest( request, method, model, options );
                    break;

                case 'delete':
                    requestContent[ 'resource' ] = model.toJSON();
                    request = window.gapi.client.tasks[ model.url ].delete( requestContent );
                    Backbone.gapiRequest( request, method, model, options );
                    break;

                case 'read':
                    request = window.gapi.client.tasks[ model.url ].list( options.data );
                    Backbone.gapiRequest( request, method, model, options );
                    break;
            }
        };

        Backbone.gapiRequest = function( request, method, model, options ){
            request.execute(function( res ){
                if( res.errorr ) {
                    options.error && options.error( res );
                }
                else {
                    // check if an array of items has been returned, or simply a single object
                    var result = res.items || res;
                    options.success && options.success( result, true, request );
                }
            });
        };

        return ApiManager;

    }
);