define(
    [
        'tpl'
    ],
    function( tpl ){
        "use strict";

        return Backbone.View.extend({

            id: 'main',
            tagName: 'div',
            className: 'container-fluid',
            el: 'body',

            template: _.template( tpl.app ),

            events: {

            },

            initialize: function( app ){
                this.app = app;
            },

            render: function(){
                this.$el.html( this.template() );
                return this;
            }

        });
    }
);