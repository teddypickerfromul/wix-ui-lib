;(function ($, window, document, undefined) {

	var pluginName = 'AdvancedSlider';

	var defaults = {
		minValue : -1,
		maxValue : 1,
		value : 0.5,
		width : 80,
		className: 'default-wix-slider-ui',
		slide : function () {},
		create : function () {}
	};

	function AdvancedSlider(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	AdvancedSlider.prototype.init = function () {
		this.markup();
		this.registerEvents();
		this.options.create.call(this);
		this.setValue(this.options.value);
	};

	AdvancedSlider.prototype.markup = function () {
		this.$pin = $('<div>');
		this.$el.append(this.$pin);
		this.$el.addClass('wix-advanced-slider').css({
			width : this.options.width
		}).addClass(this.options.className);
		this.$pin.addClass('wix-advanced-slider-pin');
	};

	AdvancedSlider.prototype.disableTextSelection = function (evt) {
		document.body.focus();
		//prevent text selection in IE
		document.onselectstart = function () { return false; };
        //evt.target.ondragstart = function() { return false; };
	};
	
	AdvancedSlider.prototype.enableTextSelection = function () {
		document.onselectstart = null;
	};
		
	AdvancedSlider.prototype.registerEvents = function () {
		var $body = $(window);
		var slider = this;
		//this.$el.on('click', function(evt){
		    //slider.setValueFromEvent(slider.getXFromEvent(evt));
		//});
		this.$pin.on('mousedown', function (evt) {
			slider.currentPos = slider.$pin.position().left;
			slider.startDragPos = evt.pageX;
			slider.disableTextSelection(evt);
			function mousemove_handler(evt) {
				slider.setPosition(evt);
			}
			function mouseup_handler(evt) {
				slider.enableTextSelection();
				$body.off('mousemove', mousemove_handler);
				$body.off('mouseup', mouseup_handler);
			}
			$body.on('mousemove', mousemove_handler);
			$body.on('mouseup', mouseup_handler);
		});
	};

	AdvancedSlider.prototype.setPosition = function (evt) {
		if (this.isDisabled()) { return; }
		var x = evt.pageX - this.startDragPos;
		var pos = this.currentPos + x;
		var width = this.$el.width() - this.$pin.width();
		if (pos < 0) { pos = 0; }
		if (pos > width) { pos = width; }
		this.options.value = this.transform(pos / width);
		this.setValue(this.options.value);
		this.startDragPos = evt.pageX;
		this.currentPos = pos;
	};

	AdvancedSlider.prototype.update = function () {
		this.$pin.css({
			left : this.options.value * (this.$el.width() - this.$pin.width())
		});
		return this;
	};

	AdvancedSlider.prototype.getValue = function () {
		return this.transform(this.options.value);
	};

	AdvancedSlider.prototype.transform = function (valueInRange) {
		return this.options.minValue + valueInRange * (this.options.maxValue - this.options.minValue);
	};

	AdvancedSlider.prototype.valueInRangeToInnerRange = function (value) {
		value = value < this.options.minValue ? this.options.minValue : value;
		value = value > this.options.maxValue ? this.options.maxValue : value;
		return (value - this.options.minValue) / (this.options.maxValue - this.options.minValue);
	};

	AdvancedSlider.prototype.setValue = function (valueInRange) {
		this.options.value = this.valueInRangeToInnerRange(valueInRange);
		if (this.options.value !== this.last_value) {
			this.last_value = this.options.value;
			this.$el.trigger('slide', this.getValue());
			this.options.slide.call(this, this.getValue());
		}
		return this.update();
	};

	AdvancedSlider.prototype.disable = function () {
		this.$el.addClass('disabled');
	};

	AdvancedSlider.prototype.enable = function () {
		this.$el.removeClass('disabled');
	};

	AdvancedSlider.prototype.isDisabled = function () {
		return this.$el.hasClass('disabled');
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, new AdvancedSlider(this, options));
			}
		});
	};

})(jQuery, window, document);
