//
// Widget 1 Model
//

define(function() {

    // Define ones data model
    var model = {
        data: {
            counter: 0,
            items: []
        },
        controller: {
            more: function() {

                // Insert a record into an Array
                // Call the shim method Object.push, in the absence of Getters and Setters
                for (var i = 0; i < 10; i++) {
                    model.data.push('items', {
                        done: true,
                        time: (new Date())
                    });
                }


                // Increment the counter
                // Call the shim method set, in the absence of Getters and Setters
                model.data.set('counter', model.data.items.length);

            }
        }
    };

    // Prepopulate the model.data with items
    for (var i = 0; i < 10; i++) {
        model.data.items.push({
            done: true,
            time: (new Date())
        });
    }

    return model;
});