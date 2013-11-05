(function ($, window, document, undefined) {
	'use strict';

	var pluginName = 'Accordion',
	defaults = {
		triggerClass : "acc-pane",
		triggerCSS : {},
		contentClass : "acc-content",
		contentCSS : {},
		animationTime : 150,
		activeClass : 'acc-active',
		ease : 'linear',
		openByDeafult:'acc-open',
		openPanel : 0
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {
		if(!this.$el.hasClass('accordion')){
			this.$el.addClass('accordion');
		}
		this.showFirst();
		this.bindEvents();
		this.applyCSS();
	};

	Plugin.prototype.showFirst = function () {
		var opt = this.options;
		this.$el.find('.' + opt.contentClass).hide();
		var $panels = this.$el.find('.' + opt.triggerClass);
		var $toOpen;
		if(typeof this.options.openPanel === 'string'){
			$toOpen = $panels.filter(this.options.openPanel);
		} else {
			$toOpen = $panels.eq(this.options.openPanel || 0);
		}
		
		var $openByDefault = this.$el.find('.'+opt.triggerClass+'.' + opt.openByDeafult)
		$toOpen = $toOpen.add($openByDefault);
		
		$toOpen.addClass(opt.activeClass + ' ' + opt.openByDeafult)
			.find('.'+opt.contentClass)
			.css('display','block');
	};
	
	Plugin.prototype.getValue = function () {
		var triggers = this.$el.find('.' + this.options.triggerClass);
		for(var i = 0; i < triggers.length; i++){
			if(triggers.eq(i).hasClass(this.options.activeClass)){
				return i;
			}
		}
		return -1;
	};

	Plugin.prototype.setValue = function ($el) {
		var opt = this.options;
		if(typeof $el === 'number'){
			$el = this.$el.find('.' + opt.triggerClass).eq($el); 
		}
		if ($el.find('.' + opt.contentClass).is(':hidden')) {
			this.openElementContent($el);
		}
	};
	
	Plugin.prototype.openElementContent = function ($el) {
		var opt = this.options;
		this.$el.find('.' + opt.triggerClass).removeClass(opt.openByDeafult).removeClass(opt.activeClass).find('.' + opt.contentClass).slideUp(opt.animationTime, opt.ease);
		var $active = $el.toggleClass(opt.activeClass).find('.'+opt.contentClass);
		$active.fadeIn('fast').slideDown(opt.animationTime, opt.ease, function(){
			$active.css('overflow', 'visible');			
			$(document.body).trigger('uilib-update-scroll-bars');
		});
	};

	Plugin.prototype.applyCSS = function () {
		this.$el.find('.' + this.options.contentClass).css(this.options.contentCSS);
		this.$el.find('.' + this.options.triggerClass).css(this.options.triggerCSS);
	};

	Plugin.prototype.bindEvents = function () {
		var that = this;
		this.$el.on('click', '.' + this.options.triggerClass, function (e) {
			if($(e.target).parents('.'+that.options.contentClass).length === 0){
				e.preventDefault();
				that.setValue($(this));
				that.$el.trigger(pluginName + '.change', that.getValue())
			}
		});
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);