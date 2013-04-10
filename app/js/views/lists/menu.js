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
                this.collection.on( 'add', this.render, this );
            },

            render: function(){
                var $el = $( this.el ),
                    listFrgament = document.createDocumentFragment(),
                    self = this;

                this.collection.each(function( list ){
                    var item = new MenuItemView({ model: list });
                    listFrgament.appendChild( item.render().el );
                });

                $el.append( listFrgament );
                return this;
            }
        });
    }
);