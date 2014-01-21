//
// Widget JS
require.config({
    paths: {
        'rivets': './bower_components/rivets/dist/rivets',
        'text': './bower_components/text/text',
        'domReady': './bower_components/requirejs-domready/domReady',
    }
});




require([
    'rivets',
    'rivets.observe.adaptor',
    'domReady',

    'controllers/widget1Ctrl',
    'controllers/widget2Ctrl',
    'controllers/widget3Ctrl',

    'text!views/widget1.html',
    'text!views/widget2.html',
    'text!views/widget3.html',

], function(rivets, Observe, domReady, Widget1, Widget2, Widget3, Template1, Template2, Template3) {

    // /////////////////////////////////
    // 
    // HELPERS FUNCTIONS FOR THE VIEW
    // 
    // /////////////////////////////////

    rivets.formatters.eq = function(value, args) {
        return value === args;
    };

    rivets.binders['hscroll-position'] = function(el, value) {
        el.style.marginLeft = (value * -100) + '%';
    };


    rivets.binders.toggle = {
        bind: function(el) {
            var adapter = rivets.adapters[this.key.interface],
                model = this.model,
                keypath = this.key.path;

            this.callback = function() {
                var value = adapter.read(model, keypath);
                adapter.publish(model, keypath, el.getAttribute('value') || el.value);
            };

            el.addEventListener('click', this.callback);
        },

        unbind: function(el) {
            el.removeEventListener('click', this.callback);
        }
    };


    rivets.configure({
        handler: function(target, event, binding) {
            // This is to shim up lazy loading
            if (event.type === 'scroll' && (target.offsetHeight + target.scrollTop + 10) < target.scrollHeight) {
                return;
            }
            this.call(target, event, binding.view.models);
        }
    });


    // /////////////////////////////////
    // 
    // Map Widgets too their template and target DOM Selector
    // 
    // /////////////////////////////////

    var widgets = [{
        selector: '.widget1',
        model: Widget1,
        template: Template1
    }, {
        selector: '.widget2',
        model: Widget2,
        template: Template2
    }, {
        selector: '.widget3',
        model: Widget3,
        template: Template3
    }];



    // ////////////////////////////////////
    // 
    // Initiate
    // Once the DOM has loaded we can start building the Widgets
    // 
    // ////////////////////////////////////

    domReady(function() {

        for (var i = 0; i < widgets.length; i++) {
            // Widgets
            var widget = widgets[i];

            // Create the template
            var elm = document.querySelector(widget.selector);
            if (elm) {
                // FOund element in page
                elm.innerHTML = widget.template;
                // Bind rivets to the DOM element to map with the model
                rivets.bind(elm, widget.model);
            }
        }
    });

});