(function ($, window, document) {
    'use strict';

    var pluginName = 'Checkbox',

	defaults = {
		checked : false,
		preLabel: '',
		postLabel: ''			
	};

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }
			
    Plugin.prototype.init = function() {
		this.markup();
		this.bindEvents();		
    };

	Plugin.prototype.markup = function() {
		
		if(!this.$el.hasClass('uilib-checkbox')){
			this.$el.addClass('uilib-checkbox');
		}
		
		this.$el.append('<span class="uilib-checkbox-check"></span>');

		if(this.options.preLabel){
			this.$el.prepend('<span class="uilib-text uilib-checkbox-preLabel">' + this.options.preLabel + '</span>');
		}
		
		if(this.options.postLabel){
			this.$el.append('<span class="uilib-text uilib-checkbox-postLabel">' + this.options.postLabel + '</span>');
		}
		
        // Check the checkbox according to defaults or the value that was set by the user
        this.options.checked ? this.$el.addClass('checked'): this.$el.removeClass('checked');
		
		//this.setDataAttribute();
	}	
	
	// Plugin.prototype.setDataAttribute = function() {
		// this.$el.attr('data-uilib-value', this.$el.hasClass('checked'));
	// }		
	
	Plugin.prototype.bindEvents = function() {
        this.$el.on('click', this.toggleChecked.bind(this));
	}
	
	Plugin.prototype.getValue = function() {
        return this.$el.hasClass('checked');
	}
	
		
	Plugin.prototype.setValue = function(value) {
        value ? this.$el.addClass('checked') : this.$el.removeClass('checked');
	}
	
	Plugin.prototype.toggleChecked = function() {
		this.$el.toggleClass('checked');		
		//this.setDataAttribute();
		this.$el.trigger(pluginName + '.change', this.getValue());	
	}

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);