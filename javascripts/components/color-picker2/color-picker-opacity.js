(function ($, window, document, undefined) {
	'use strict';

	var pluginName = 'ColorPickerWithOpacity';

	var defaults = {
		startWithColor : '#000'
	};

	var names = {
	};

	function ColorPickerWithOpacity(element, options) {
		this.options = $.extend({}, defaults, options);
		this.$el = $(element);		
		this.options.isParamConected = (this.$el.attr('wix-param') || this.$el.attr('data-wix-param'));
		this.init();
	}

	ColorPickerWithOpacity.prototype.init = function () {
		this.markup();
		this.setValue(this.options.startWithColor);
		this.bindEvents();
	};
	
	ColorPickerWithOpacity.prototype.getPlugins = function () {
		return {
			colorPicker: this.$ColorPicker.data('plugin_ColorPicker'),
			slider: this.$Slider.data('plugin_Slider')
		};
	};
	
	ColorPickerWithOpacity.prototype.colorChangedInInnerPlugins = function (whatChanged, event, value) {
		this.$el.trigger(pluginName + '.change', {
			color: this.getPlugins().colorPicker.getColorObject(),
			opacity: this.getPlugins().slider.getValue() / 100,
			rgba: this.getValue()
		});
	};
	
	ColorPickerWithOpacity.prototype.bindEvents = function () {
		this.$ColorPicker.on('ColorPicker.change', this.colorChangedInInnerPlugins.bind(this, 'color'));
		this.$Slider.on('Slider.change', this.colorChangedInInnerPlugins.bind(this, 'opacity'));
	};
	
	ColorPickerWithOpacity.prototype.markup = function () {
		this.$el.addClass('picker-with-opacity');
		this.$ColorPicker = $('<div>').ColorPicker(this.options);
		this.$Slider = $('<div>').Slider({
			preLabel: '0',
			postLabel: '100',
			value: 100
		});
		this.$el.append(this.$ColorPicker, this.$Slider);
	};

	function extractOpacityFromColor(value){
		var opacity =1;
		value = $.trim(value);
		if(value.charAt(0) === '#'){
			opacity = 1;
		} else if(value.indexOf('rgba') === 0 || value.indexOf('hsla')===0){
			opacity = value.match(/,([^),]+)\)/);
			opacity = (opacity ? (+opacity[1]) : 1);
		} else if(value.indexOf('rgb') === 0){
			opacity = 1;
		}
		return opacity;
	}
	
	function extractColorFromValue(value){
		var color;
		value = $.trim(value);
		if(value.charAt(0) === '#'){
			color = value;
		} else if(value.indexOf('rgba') === 0){
			color = value.replace('rgba','rgb').replace(/,([^),]+)\)/,')');
		} else if(value.indexOf('rgb') === 0){
			color = value;
		}else{
			color = value;
		}
		return color;
	}
	
	ColorPickerWithOpacity.prototype.setValue = function (value) {
		var opacity = 100;
		var color = '#000';
		var plugs = this.getPlugins();
		if(value && typeof value === 'object'){
			//if(plugs.colorPicker.isParamConected){
				color = (value.color && value.color.reference) ? value.color.reference : (value.rgba || value.cssColor);
				opacity = (value.opacity || extractOpacityFromColor(color)) * 100;
			//}else {
			//	color = (value.cssColor || value.rgba);
			//	opacity = (value.opacity || extractOpacityFromColor(color)) * 100;
			//}
		} else if(typeof value === 'string'){
			color = extractColorFromValue(value);
			opacity = extractOpacityFromColor(color) * 100;
		}
		
		plugs.slider.setValue(opacity);
		plugs.colorPicker.setValue(color);
		
	};
	
	ColorPickerWithOpacity.prototype.getValue = function () {
		var plugs = this.getPlugins();
		
		var rgbString = plugs.colorPicker.getValue();
		var sliderValue = plugs.slider.getValue() / 100;
		
		if(rgbString.indexOf('rgba')===0){
			return rgbString.replace(/,\s*([\d\.]+)\s*\)/, ', '+ sliderValue + ')');
		} else {
			return rgbString.replace(/rgb/, 'rgba').replace(')', ', ' + sliderValue + ')');
		}
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new ColorPickerWithOpacity(this, options));
			}
		});
	};

})(jQuery, window, document);
