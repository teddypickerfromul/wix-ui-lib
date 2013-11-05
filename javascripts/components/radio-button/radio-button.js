(function ($, window, document) {
    'use strict';

    var pluginName = 'Radio';
    var defaults = {
		radioBtnGroupClassName:'rb-radio-group',
		radioBtnClassName:'rb-radio',
		checkClassName:'rb-radio-check',
		checkedClassName: 'rb-radio-checked',
		radioValueAttrName:'data-radio-value',
		inline:false,
		checked: 0
	};

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
		this.radioGroup = null;
        this.init();
    }

    Plugin.prototype.init = function() {		
		if(!this.$el.hasClass(this.options.radioBtnGroupClassName)){
			this.$el.addClass(this.options.radioBtnGroupClassName);
		}
		this.radioGroup = this.$el
			.find('['+this.options.radioValueAttrName+']')
			.addClass('uilib-text')
			.addClass(this.options.radioBtnClassName)
			.addClass(this.options.inline ? 'uilib-inline' : '')
			.prepend('<span class="'+ this.options.checkClassName +'"></span>');
			
		this.setValue(this.options.checked);
		
		this.bindEvents();

	};
	
	Plugin.prototype.bindEvents = function () {
		var that = this;
		this.$el.on('click', '.'+this.options.radioBtnClassName, function (e) {
            that.checkRadio($(this));
		});		
	}
	
	Plugin.prototype.getValue = function () {
		var $el = this.$el.find('.' + this.options.checkedClassName);
		return {
			value : $el.attr(this.options.radioValueAttrName),
			index : this.radioGroup.index($el)
		};
	}
	
	Plugin.prototype.setValue = function (value) {
		var $el;
		if(typeof value === 'object'){
			value = value.index;
		}
		if(typeof value === 'string'){
			$el = this.$el.find('['+ this.options.radioValueAttrName +'="'+ value +'"]').eq(0);
		} else if (+value >= 0) {
			$el = this.radioGroup.eq(+value);
		}
		$el.length && this.checkRadio($el, true);
	}

	
    Plugin.prototype.checkRadio = function ($el, silent) {
		if ($el.hasClass(this.options.checkedClassName)) { return; }
		this.radioGroup.removeClass(this.options.checkedClassName);
		$el.addClass(this.options.checkedClassName);
		if(!silent){
			$el.trigger(pluginName + '.change', this.getValue());
		}
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);