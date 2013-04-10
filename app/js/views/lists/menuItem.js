define(
    [
        'backbone',

        'tpl'
    ],
    function( Backbone, tpl ){
        "use strict";

        return Backbone.View.extend({

            tagName: 'li',
            className: 'list-menu-item',

            template: _.template( tpl.menuItem ),

            events: {
                'click': 'open'
            },

            initialize: function(){
                _.bindAll( this, 'render' );

                this.listenTo( this.model, 'change', this.render );
                this.listenTo( this.model, 'destroy', this.remove );
            },

            render: function(){
                var $el = $( this.el );
                $el.data( 'listId', this.model.get( 'id' ) )
                    .html( this.template( this.model.toJSON() ) );

                return this;
            },

            open: function(){
                // TODO: implement
                console.log( 'open' );

                return false;
            }

        });
    }
);