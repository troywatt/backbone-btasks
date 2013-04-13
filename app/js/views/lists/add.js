define(
    [
        'views/lists/edit'
    ],
    function( EditListView ){
        "use strict";

        return EditListView.extend({

            submit: function(){
                var self = this,
                    title = this.$el.find( 'input[name="title"]' ).val();

                this.model.save( { title: title }, {
                    success: function( model ){
                        window.bTask.collections.lists.add( model );

                        // this view (form) removes itself once the model has been updated
                        self.remove();
                    }
                });

                return false;
            }

        });
    }
);