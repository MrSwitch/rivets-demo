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
	'rivets.partials',
	'domReady',

	'controllers/widget1Ctrl',
	'controllers/widget2Ctrl',
	'controllers/widget3Ctrl',

	'text!views/ui-count.html',
	'text!views/ui-list-item.html'

], function(rivets, Observe, _partials, domReady, Widget1, Widget2, Widget3, UICount, UIListItem) {


	// /////////////////////////////////
	// 
	// HELPERS FUNCTIONS FOR THE VIEW
	// 
	// /////////////////////////////////

	rivets.formatters.time = function(value, args) {
		return value;
	};
	rivets.formatters.eq = function(value, args) {
		return value === args[0];
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

			rivets._.Util.bindEvent(el, 'click', this.callback);
		},

		unbind: function(el) {
			rivets._.Util.unbindEvent('click', this.callback);
		}
	};


	rivets.partials = {
		'count' : UICount,
		'list-item' : UIListItem
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

	var widgets = [Widget1, Widget2, Widget3];



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