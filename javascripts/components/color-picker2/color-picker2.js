(function ($, window, document, undefined) {
	"use strict";

	var pluginName = 'ColorPicker';

	var defaults = {
		startWithColor : "#897185",
	};
	
	var defaultColors = ['#50FAFE', '#FFFFFF', '#0088CB', '#ED1C24', '#FFCB05',
            '#CECECE', '#9C9C9C', '#6C6C6C', '#484848', '#242424', '#C4EEF6', '#A5E1ED',
            '#59CEE5', '#3B8999', '#1D444C', '#FFFDFD', '#999999', '#666666', '#444444', '#000000', '#E4A3B8',
            '#CA748F', '#AF1A49', '#751131', '#3A0818', '#D5E7A6', '#B8CF78', '#8EB71D', '#5E7A13', '#2F3D09'];
	
	defaultColors = defaultColors.map(function(o,i){
		return {value:o, reference:'color-'+i};
	});

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this.isParamConected = options.isParamConected || (this.$el.attr('wix-param') || this.$el.attr('data-wix-param'));
		var siteColors = this.isParamConected ? (Wix.Settings.getSiteColors() || defaultColors) : defaultColors;
		var that = this;

		this.picker = createColorBox({
			element: element,
			color: this.options.startWithColor,
			isParamConected: this.isParamConected,
			primColors:siteColors.slice(0,5),
			paleteColors: siteColors.slice(5),
			onchange: this.changeEventHandler.bind(this)
		});
	}
	
	Plugin.prototype.changeEventHandler = function(color){
		var that = this;
		clearTimeout(this.$timeoutTicket);
		this.$timeoutTicket = setTimeout(function(){					
			var data = {
				cssColor: color
			};
			if(typeof color === 'string'){
				
			} else if (color && typeof color === 'object'){
				data.color = color;
				data.cssColor = color.value;
				if(!that.isParamConected){
					delete data.color;
				}
			}
			that.$el.trigger(pluginName + '.change', data);
		},10);
	};
	
	Plugin.prototype.getValue = function(){
		return this.picker.getColor();
	};
	
	Plugin.prototype.getColorObject = function(){
		return this.picker.getColorObject();
	};
	
	Plugin.prototype.setValue = function(color){
		var colorFromTheme;
		try{
			if(this.isParamConected && typeof color==='string'){
				colorFromTheme = Wix.Settings.getColorByRefrence(color);
			} else if(this.isParamConected && color.color.reference){
				colorFromTheme = color.color;
			}
			colorFromTheme = colorFromTheme.reference;
		}catch(err){}
		this.picker.setColor(colorFromTheme || color.cssColor || color.rgba || color);
	};
	
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin(this, options));
			}
		});
	};

	$.fn[pluginName].Constructor = Plugin;

})(jQuery, window, document);
