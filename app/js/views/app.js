define(
    [
        'tpl',

        'views/lists/add',
        'views/lists/edit'
    ],
    function( tpl, AddListView, EditListView ){
        "use strict";

        return Backbone.View.extend({

            id: 'main',
            tagName: 'div',
            className: 'container-fluid',
            el: 'body',

            template: _.template( tpl.app ),

            events: {
                'click #add-list-button': 'addList',
                'click #edit-list-button': 'editList',
                'click #delete-list-button': 'deleteList'
            },

            initialize: function( app ){
                this.app = app;
            },

            listForm: function( form ){
                this.$el.find( '#list-editor' ).html( form.render().el );
                form.$el.find( 'input:first' ).focus();

                return false;
            },

            addList: function () {
                var list = new window.bTask.collections.lists.model( { title: '' } );
                this.listForm( new AddListView( { model: list } ) );
            },

            editList: function(){
                var activeList = window.bTask.views.activeListMenuItem.model;
                this.listForm( new EditListView({ model: activeList }) );
            },

            deleteList: function(){
                var activeList = window.bTask.views.activeListMenuItem.model;

                activeList.destroy({
                    success: function(){
                        console.log( 'deleted', activeList );
                    }
                });
            },

            render: function(){
                this.$el.html( this.template() );
                return this;
            }

        });
    }
);