//
// Rivets Observe Adaptor

define(['rivets'], function(rivets){

	// Shimming up the model for IE8
	// Overwrite the default adaptor

	rivets.adapters['.'] = {
		subscribe: function(obj, keypath, callback) {
			if(!("on" in obj)){
				Observe.call(obj);
			}

			obj.on('change:' + keypath, callback);
		},
		unsubscribe: function(obj, keypath, callback) {
			obj.off('change:' + keypath, callback);
		},

		// probably dont need to overwrite these two, but follows the docs.
		read: function(obj, keypath) {
			return obj.get(keypath);
		},
		publish: function(obj, keypath, value) {
			obj.set(keypath, value);
		}
	};


	function Observe(){
		//
		// These could potentially mess with other stuff but hey, it works - kind of.
		this.on = function(event_name, callback){
			// Trigger listeners
			this.__events = (this.__events || {});
			this.__events[event_name] = (this.__events[event_name]||[]);
			this.__events[event_name].push(callback);
		};

		this.off = function(event_name, callback){
			// Trigger listeners
			var evts = this.__events[event_name];
			for(var i=0;i<evts;i++){
				if( evts[i] === callback ){
					evts.splice(i,1);
				}
			}
		};

		this.set = function(prop, value){
			// Assign the value
			this[prop] = value;

			// Trigger listeners
			var evts = this.__events["change:"+prop];
			for( var i=0; i<evts.length; i++){
				evts[i].call(this);
			}
		};

		this.get = function(prop){
			return this[prop];
		};

		this.push = function(prop, item){
			// Assign the value
			this[prop].push( item );

			// Trigger listeners
			var evts = this.__events["change:"+prop];
			for( var i=0; i<evts.length; i++){
				evts[i].call(this);
			}
		};
	}

	// SHIMS a dependency of Rivets
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return this.replace(/(^\s*|\s*$)/g,'');
		};
	}

	//Observe.call(Object.prototype);

	return Observe;

});