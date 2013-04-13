define(
    [
        'backbone',

        'tpl',

        'views/tasks/index'
    ],
    function( Backbone, tpl, TaskIndexView ){
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

            // trigger event to track app state
            // This will make adding tasks easier, because in order to add tasks we need
            // to know which tasklist to add it to.
            open: function(){
                // check for active activeView and reset it's state
                if( window.bTask.views.activeListMenuItem ) {
                    window.bTask.views.activeListMenuItem.$el.removeClass( 'active' );
                }

                // track the currently active view
                window.bTask.views.activeListMenuItem = this;
                this.$el.addClass( 'active' );


                // remove existing taskItemList
                if( bTask.views.tasksIndexView ) {
                    // calling remove on views will unbind their events for garbage collection
                    bTask.views.tasksIndexView.remove();
                }

                // create new taskItemList
                bTask.views.tasksIndexView = new TaskIndexView({
                    collection: bTask.collections.tasks,
                    model: this.model
                });

                bTask.views.app.$el.find( '#tasks-container' ).html( bTask.views.tasksIndexView.render().el );


                return false;
            }

        });
    }
);