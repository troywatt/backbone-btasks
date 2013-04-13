define(
    [
        'backbone',

        'tpl'
    ],
    function( Backbone, tpl ){
        "use strict";

        return Backbone.View.extend({

            tagName: 'form',
            className: 'form-horizontal well edit-list',

            template: _.template( tpl.listEdit ),

            events: {
                'submit': 'submit',
                'click .cancel': 'cancel'
            },

            initialize: function(){
                this.listenTo( this.model, 'change', this.render, this );
            },

            render: function(){
                var $el = $( this.el );
                $el.html( this.template( this.model.toJSON() ) );

                // if model has no id, meaning it's new then toggle 'add list' legend
                if( this.model.isNew() ) {
                    $el.find( 'legend' ).html( 'Add List' );
                }

                return this;
            },

            submit: function(){
                var self = this,
                    title = this.$el.find( 'input[name="title"]' ).val();

                this.model.save({ title: title }, {
                    success: function(){
                        self.remove();
                    }
                });

                return false;
            },

            cancel: function(){
                this.$el.hide();
                return false;
            }
        });
    }
);