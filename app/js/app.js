define(
    [
        'gapi',

        'views/app',
        'views/auth',

        'collections/taskLists'
    ],
    function( ApiManager, AppView, AuthView, TaskLists ){
        "use strict";


        var App = function(){

            this.views.app = new AppView( this );
            this.views.app.render();

            this.views.auth = new AuthView( this );
            this.views.auth.render();

            this.collections.lists = new TaskLists();

            this.connectGapi();

        };

        App.prototype = {

            views: {},

            collections: {},

            connectGapi: function(){
                this.apiManager = new ApiManager();

                this.apiManager.on( 'ready', function(){
                    console.log( 'ApiManager:ready' );

                    this.collections.lists.fetch({
                        data: { userId: '@me' },
                        success: function( result ){
                            console.log( 'tasklist results:', result.models );
                            _.each( result.models, function( model ){
                                console.log( model.get( 'title' ) );
                            });
                        }
                    });
                }, this );
            }

        };

        return App;
    }
);