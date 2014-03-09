jQuery.fn.definePlugin('Slider', function ($) {
	'use strict';
	
	var names = {
		sliderClass: 'uilib-slider',
		pinClass: 'uilib-slider-pin',
		disabledClass: 'disabled',
		textClass:'uilib-text'
	};
	
	return {
		init: function(){
			this.markup();
			this.bindEvents();
			this.options.create.call(this);
			this.setValue(this.options.value);
		},
		getDefaults: function(){
			return {
				minValue: 0,
				maxValue: 100,
				value: 0,
				width: 80,
				preLabel: '',
				postLabel: '',
				className: 'default-uilib-slider-ui',
				toolTip: false,
				supportClick: true,
				slide: function () {},
				create: function () {}
			};
		},
		markup: function () {
			var leftOffset = this.$el.css('left');
			var style = {
				width : this.options.width
			};
			
			if(!this.$el.hasClass(names.sliderClass)){
				this.$el.addClass(names.sliderClass);
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
			
			
			this.$el.addClass(names.sliderClass).css(style).addClass(this.options.className);
			
			this.$pin.addClass(names.pinClass);
			this.$pin.width(19);


			if(this.options.toolTip){
				this.$toolTip = $(_toolTipHtml());
				this.$pin.append(this.$toolTip.hide());
			}
		},
		getXFromEvent: function(event){
			return event.offsetX / this.$el.width()
		},
		bindEvents: function () {
			var $body = $(window);
			var slider = this;
			if (slider.options.supportClick){
				this.$el.on('click', function(evt){
					if(evt.target === slider.$el[0]){
						var x = slider.getXFromEvent(evt);
						slider.setValue(slider.transform(x));
						slider.triggerChangeEvent(slider.getValue());
					}
				});
			}
			this.$pin.on('mousedown', function (evt) {
                if(slider.$toolTip && !slider.$toolTip.is(":visible")){
                    slider.$toolTip.show();
                }
				slider.currentPos = slider.$pin.position().left;
				slider.startDragPos = evt.pageX;
				slider.disableTextSelection(evt);
				function mousemove_handler(evt) {
					slider.setPosition(evt);
				}
				function mouseup_handler(evt) {
                    if(slider.$toolTip){
                        slider.$toolTip.hide();
                    }
					slider.enableTextSelection();
					$body.off('mousemove', mousemove_handler);
					$body.off('mouseup', mouseup_handler);
					slider.triggerChangeEvent(slider.getValue());
				}
				$body.on('mousemove', mousemove_handler);
				$body.on('mouseup', mouseup_handler);
			});
		},
		getValue: function () {
			return this.transform(this.options.value);
		},
		setValue: function (valueInRange) {
			var val;
			this.options.value = this.valueInRangeToInnerRange(valueInRange);
			if (this.options.value !== this.last_value) {
				this.last_value = this.options.value;
				val = this.getValue();
				this.$el.trigger('slide', val);
				if(this.options.toolTip){
					this.$toolTip.find('.'+names.textClass).text(Math.round(val));
				}
				this.options.slide.call(this, val);
			}
			return this.update();
		},
		transform: function (valueInRange) {
			return this.options.minValue + valueInRange * (this.options.maxValue - this.options.minValue);
		},
		valueInRangeToInnerRange: function (value) {
			value = value < this.options.minValue ? this.options.minValue : value;
			value = value > this.options.maxValue ? this.options.maxValue : value;
			return (value - this.options.minValue) / (this.options.maxValue - this.options.minValue);
		},
		disableTextSelection: function (evt) {
			document.body.focus();
			//prevent text selection in IE
			document.onselectstart = function () { return false; };
			//evt.target.ondragstart = function() { return false; };
		},
		enableTextSelection: function () {
			document.onselectstart = null;
		},
		setPosition: function (evt) {
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
		},
		update: function () {
			this.$pin.css({
				left : this.options.value * (this.$el.width() - this.$pin.width())
			});
			return this;
		},
		disable: function () {
			this.$el.addClass(names.disabledClass);
		},
		enable: function () {
			this.$el.removeClass(names.disabledClass);
		},
		isDisabled: function () {
			return this.$el.hasClass(names.disabledClass);
		}
	};
	
	function _toolTipHtml() {
        return '<div class="uilib-slider-tooltip uilib-slider-tooltip-wrapper">' +
            '<div class="picker-arrow-top"><div class="picker-arrow-one"></div><div class="picker-arrow-two"></div></div>' +
            '<div class="uilib-text"></div>' +
            '</div>';
    }
	
});