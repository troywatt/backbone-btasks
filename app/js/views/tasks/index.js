define(
    [
        'tpl',

        'collections/tasks',

        'views/tasks/task'
    ],
    function( tpl, Tasks, TaskView ){
        "use strict";
        
        return Backbone.View.extend({

            tagName: 'div',
            className: 'row-fluid',
            template: _.template( tpl.tasksIndex ),

            events: {
                'submit .add-task': 'addTask'
            },

            initialize: function(){
                this.children = [];
            },

            addTask: function(){

            },

            render: function(){
                // NOTE: this "index" view has child views for each task it owns

                this.$el.html( this.template() );
                var taskList = this.$el.find( '#task-list' ),
                    taskListFrag = document.createDocumentFragment(),
                    self = this;

                this.collection = new Tasks();
                // fetch the task list from Google API passing special params for specific list
                this.collection.fetch({
                    data: { tasklist: this.model.get( 'id' ) },
                    success: function(){
                        self.collection.each(function( task ){
                            var item = new TaskView({ model: task, parentView: self });
                            taskListFrag.appendChild( item.render().el );
                            self.children.push( item );
                        });

                        taskList.append( taskListFrag );
                    }
                });

                return this;

            }

        });
    }
);