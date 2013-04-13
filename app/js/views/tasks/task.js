define(
    [
        'tpl'
    ],
    function( tpl ){
        "use strict";

        return Backbone.View.extend({

            tagNamr: 'li',
            className: 'controls well task row',

            template: _.template( tpl.task ),

            events: {
                'click': 'open'
            },

            initialize: function( options ){
                this.parentView = options.parentView;
            },

            render: function( e ){
                var $el = $( this.el );

                $el.data( 'taskId', this.model.get( 'id' ) );
                $el.html( this.template( this.model.toJSON() ) );

                // display status in view
                $el.find( '.check-status' ).attr( 'checked', this.model.get( 'status' ) === 'complete' );

                return this;
            },

            open: function(){
                if( this.parentView.activeTaskView ) {
                    this.parentView.activeTaskView.close();
                }

                this.$el.addClass( 'active' );
                this.parentView.activeTaskView = this;
            },

            close: function(){
                this.$el.removeClass( 'active' );
            }


        });
    }
);