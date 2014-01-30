//
// Widget 1 Controller
//

define(['models/widget2', 'text!views/widget2.html'], function(model, template) {

    return {
        selector : '.widget2',
        model : model,
        template : template
    }
});