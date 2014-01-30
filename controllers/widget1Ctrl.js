//
// Widget 1 Controller
//

define(['models/widget1', 'text!views/widget1.html'], function(model, template) {

    return {
        selector : '.widget1',
        model : model,
        template : template
    }
});