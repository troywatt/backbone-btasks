define(
    [
        'backbone',

        'views/lists/menuItem'
    ],
    function( Bacbone, MenuItemView ){
        "use strict";
        
        return Backbone.View.extend({

            el: '.left-nav',
            tagName: 'ul',
            className: 'nav nav-list lists-nav',

            events: {

            },

            initialize: function(){
                // FIXME: causes issue on app.initialize because it's getting called once for every item in list
//                this.listenTo( this.collection, 'add', this.render, this );
            },

            renderMenuItem: function( model, el ){
                var item = new MenuItemView({ model: model } ),
                    // render to context if provide (documentFragment) or default to the view el
                    el = el || this.el[ 0 ];

                el.appendChild( item.render().el );

                // activate first item in list if no item is active yet
                if( !window.bTask.views.activeListMenuItem ) {
                    window.bTask.views.activeListMenuItem = item;
                }

                // check if the activeModel is the model currently being used to render the navigation list element:
                if( model.get( 'id' ) === window.bTask.views.activeListMenuItem.model.get( 'id' ) ) {
                    item.open();
                }
            },

            render: function(){
                console.log( 'render' );
                var $el = $( this.el ),
                    listFragment = document.createDocumentFragment(),
                    self = this;

                this.collection.each(function( list ){
                    self.renderMenuItem( list, listFragment );
                });

                $el.html( listFragment );
                return this;
            }
        });
    }
);