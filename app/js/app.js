define(
    [
        'gapi'
    ],
    function( ApiManager ){
        "use strict";


        var App = function(){
            this.connectGapi();
        };

        App.prototype = {
            connectGapi: function(){
                this.apiManager = new ApiManager;
            }
        };

        return App;
    }
);