define(['rivets'], function(rivets){

	/** Partials */
	rivets.binders['partial-*'] = {
		bind: function(el){
			var attr;
			if (this.marker == null) {
				attr = [this.view.config.prefix, this.type].join('-').replace('--', '-');
				this.marker = document.createComment(" rivets: " + this.type + " ");
				this.iterated = [];
				el.removeAttribute(attr);
				el.parentNode.insertBefore(this.marker, el);
				return el.parentNode.removeChild(el);
			}
		},
		routine : function(el, data){
			var options = {
				binders: this.view.options.binders,
				formatters: this.view.options.formatters,
				adapters: this.view.options.adapters,
				config: {}
			};
			var config = this.view.options.config;
			for (var k in config) {
				options.config[k] = config[k];
			}
			options.config.preloadData = true;
			var template = el.cloneNode(true);
			template.innerHTML = rivets.partials[this.type.replace(/^partial-/,'')];
			var frag = document.createDocumentFragment();
			for(var i=0;i<template.childNodes.length;i++){
				frag.appendChild(template.childNodes[i].cloneNode(true));
			}
			var view = new rivets._.View(frag, data, options);
			view.bind();
			this.marker.parentNode.insertBefore(frag, this.marker.nextSibling);
		}
	};
});