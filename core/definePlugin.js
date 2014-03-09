(function($){
	if(!$){
		throw 'jQuery is not defined';
	}
	function definePlugin(name, pluginPrototypeDefinition, skipValidation) {
		'use strict';
				
		var Plugin = (new Function('return ' + definePlugin.tpl.replace(/\$\$\$/gm, name)))();
		Plugin.prototype = pluginPrototypeDefinition($);
		
		if(!skipValidation){
			definePlugin.validate(Plugin, name);
		}
		
		definePlugin.installMandatoryFunctions(Plugin, name);		
		definePlugin.registerAsJqueryPlugin(Plugin, name);
        definePlugin.save(Plugin, name);
		return Plugin;
	}

	definePlugin.validate = function(Plugin, name){

		var reservedFunctions = [
			'triggerChangeEvent', 
			'destroy', 
			'whenDestroy', 
			'getParamKey',
			'getModelKey',
			'UI'
		].filter(function (key) {
			return Plugin.prototype.hasOwnProperty(key);
		});
		
		if (reservedFunctions.length) {
			throw new Error('Plugin: ' + name + ' must NOT implement: "' + reservedFunctions.join(', ') + '"');
		}
		
		var missingFunction = [
			'getValue', 
			'setValue', 
			'init', 
			'getDefaults', 
			'bindEvents', 
			'markup'
		].filter(function (key) {
			return typeof Plugin.prototype[key] !== 'function';
		});

		if (missingFunction.length) {
			throw new Error('Plugin: ' + name + ' must implement: "' + missingFunction.join(', ') + '"');
		}
	}
	
	definePlugin.registerAsJqueryPlugin = function (Plugin, name) {
		if (window.jQuery && window.jQuery.fn) {
			window.jQuery.fn[name] = function (options, argument) {
				if(typeof options === 'string'){
					var plugin = $(this).data('plugin_' + name);
					if(plugin && typeof plugin[options] === 'function'){
						return plugin[options].apply(plugin, Array.prototype.slice.call(arguments, 1));
					}
				}
				return this.each(function () {
					if (!$.data(this, 'plugin_' + name)) {
						$.data(this, 'plugin_' + name, new Plugin(this, options));
					}
				});
			};
		}
	}
	
	definePlugin.installMandatoryFunctions = function (Plugin, name){
		if (!Plugin.name) {
			Plugin.name = name;
		}
		Plugin.prototype.constructor = Plugin;
		Plugin.unique_id_counter = 0;
		
		Plugin.prototype.UI = function(data){
			return window.Wix.UI || window.UI;
		};		
		Plugin.prototype.triggerChangeEvent = function(data){
			this.$el.trigger(name + '.change', data);
		};
				
		Plugin.prototype.getParamKey = function(data){
			return this.$el.attr('wix-param') || this.$el.attr('data-wix-param');
		};
						
		Plugin.prototype.getModelKey = function(data){
			return this.$el.attr('wix-model') || this.$el.attr('data-wix-model');
		};
				
		Plugin.prototype.destroy = function(){
			this.$el.off();
			this.$el.find('*').off();
			this.destroyHandlers.forEach(function(fn){
				try{
					fn.call(this);
				} catch(err){
					setTimeout(function(){
					 throw name + ':' + err.message;
					},0);
				}
			}, this);
			this.$el.remove();
		};
		
		Plugin.prototype.whenDestroy = function(fn){
			if(typeof fn !== 'function'){ throw new Error('Destroy handler must be a function');}
			this.destroyHandlers.push(fn);
		};
	
	}

    definePlugin.save = function(Plugin, name){
        definePlugin.store = definePlugin.store || {};
        definePlugin.store[name] = Plugin;
    }

	definePlugin.tpl = "function $$$(el, options) { "+ 
		"'use strict';" +
		"if (!(this instanceof $$$)) {" +
			"throw new Error('Plugin: $$$ must called with the \"new\" keyword');" + 
		"}" +
		"this.$el = window.jQuery(el);" + 
		"this.options = window.jQuery.extend({}, this.getDefaults(), options);" + 
		"this.pluginName = '$$$';" + 
		"el.$uiLibPluginName = '$$$';" + 
		"this.destroyHandlers = [];" + 
		"this.GUID = '$$$_' + ($$$.unique_id_counter++);" + 
		"this.init();" +
		"return this;" +
	"}";

	
	
	$.fn.definePlugin = definePlugin;
	$.fn.getCtrl = function(){
		if(!this[0]){return null;}
		return this.data('plugin_' + this[0].$uiLibPluginName);
	};
	
}(jQuery))

