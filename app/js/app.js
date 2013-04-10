define(
    [
        'gapi',

        'views/app',
        'views/auth'
    ],
    function( ApiManager, AppView, AuthView ){
        "use strict";


        var App = function(){

            this.views.app = new AppView( this );
            this.views.app.render();

            this.views.auth = new AuthView( this );
            this.views.auth.render();

            this.connectGapi();

        };

        App.prototype = {

            views: {},

            connectGapi: function(){
                this.apiManager = new ApiManager();
            }

        };

        return App;
    }
);