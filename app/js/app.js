define(
    [
        'gapi',

        'views/app',
        'views/auth',
        'views/lists/menu',

        'collections/taskLists'
    ],
    function( ApiManager, AppView, AuthView, MenuView, TaskLists ){
        "use strict";


        var App = function(){

            // create the bTasks => app global
            window.bTask = this;

            this.views.app = new AppView( this );
            this.views.app.render();

            this.views.auth = new AuthView( this );
            this.views.auth.render();

            this.collections.lists = new TaskLists();

            this.views.listMenu = new MenuView({ collection: this.collections.lists });

            this.connectGapi();

        };

        App.prototype = {

            views: {},

            collections: {},

            connectGapi: function(){
                var self = this;

                this.apiManager = new ApiManager();

                this.apiManager.on( 'ready', function(){
                    console.log( 'ApiManager:ready' );

                    this.collections.lists.fetch({
                        data: { userId: '@me' },
                        success: function( result ){
                            self.views.listMenu.render();
                        }
                    });
                }, this );
            }

        };

        return App;
    }
);