;(function ($, window, document, undefined) {

	var pluginName = 'Slider';

	var defaults = {
		minValue : 0,
		maxValue : 100,
		value : 0,
		width : 80,
		preLabel:'',
		postLabel:'',
		className: 'default-uilib-slider-ui',
		slide : function () {},
		create : function () {}
	};

	function Plugin(element, options) {
		this.$el = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {
		this.markup();
		this.registerEvents();
		this.options.create.call(this);
		this.setValue(this.options.value);
	};

	Plugin.prototype.markup = function () {
		var leftOffset = this.$el.css('left');
		var style = {
			width : this.options.width
		};
		
		if(!this.$el.hasClass('uilib-slider')){
			this.$el.addClass('uilib-slider');
		}
		
		if(this.options.preLabel){
			this.$el.prepend('<span class="uilib-text uilib-slider-preLabel">' + this.options.preLabel + '</span>');
			style.left = 14;
		}
		
		this.$pin = $('<div>');
		this.$el.append(this.$pin);
		
		if(this.options.postLabel){
			this.$el.append('<span class="uilib-text uilib-slider-postLabel">' + this.options.postLabel + '</span>');
		}
		
		
		this.$el.addClass('uilib-slider').css(style).addClass(this.options.className);
		
		this.$pin.addClass('uilib-slider-pin');
		this.$pin.width(19);
	};

	Plugin.prototype.disableTextSelection = function (evt) {
		document.body.focus();
		//prevent text selection in IE
		document.onselectstart = function () { return false; };
        //evt.target.ondragstart = function() { return false; };
	};
	
	Plugin.prototype.enableTextSelection = function () {
		document.onselectstart = null;
	};
		
	Plugin.prototype.registerEvents = function () {
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
				slider.$el.trigger(pluginName + '.change', slider.getValue());
			}
			$body.on('mousemove', mousemove_handler);
			$body.on('mouseup', mouseup_handler);
		});
	};

	Plugin.prototype.setPosition = function (evt) {
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

	Plugin.prototype.update = function () {
		this.$pin.css({
			left : this.options.value * (this.$el.width() - this.$pin.width())
		});
		return this;
	};

	Plugin.prototype.getValue = function () {
		return this.transform(this.options.value);
	};

	Plugin.prototype.transform = function (valueInRange) {
		return this.options.minValue + valueInRange * (this.options.maxValue - this.options.minValue);
	};

	Plugin.prototype.valueInRangeToInnerRange = function (value) {
		value = value < this.options.minValue ? this.options.minValue : value;
		value = value > this.options.maxValue ? this.options.maxValue : value;
		return (value - this.options.minValue) / (this.options.maxValue - this.options.minValue);
	};

	Plugin.prototype.setValue = function (valueInRange) {
		var val;
		this.options.value = this.valueInRangeToInnerRange(valueInRange);
		if (this.options.value !== this.last_value) {
			this.last_value = this.options.value;
			val = this.getValue();
			this.$el.trigger('slide', val);
			this.options.slide.call(this, val);
		}
		return this.update();
	};

	Plugin.prototype.disable = function () {
		this.$el.addClass('disabled');
	};

	Plugin.prototype.enable = function () {
		this.$el.removeClass('disabled');
	};

	Plugin.prototype.isDisabled = function () {
		return this.$el.hasClass('disabled');
	};
	
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };


})(jQuery, window, document);
