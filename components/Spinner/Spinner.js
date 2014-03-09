jQuery.fn.definePlugin('Spinner', function ($) {
	'use strict';
	
	var styles = {
        className: 'uilib-spinner',
		defaultSize: 'default',
		mediumSize: 'medium',
		largeSize: 'large',
        upArrow: 'up-arrow',
        downArrow: 'down-arrow'
    };
    var events = {
        mouseDown: 'mousedown',
        mouseUp: 'mouseup',
        mouseLeave: 'mouseleave',
        focusOut: 'focusout',
        keypress: 'keypress'
    };
	
	return {
		init: function(){
			this.markup();
			this.bindEvents();
			this.setValue(this.options.value);
		},
		getDefaults: function(){
			return {
				minValue : 0,
				maxValue : 1000,
				value : 0,
				step: 1,
				precision: 0
			}; 
		},
		markup: function () {
			this.$el
				.append("<input autocomplete='off'>")
				.append(_buttonHtml());
			if(!this.$el.hasClass(styles.className)){
				this.$el.addClass(styles.className);
			}
			switch(this.options.size){
				case styles.mediumSize:
					this.$el.addClass(styles.mediumSize)
					break;
				case styles.largeSize:
					this.$el.addClass(styles.largeSize)
					break;
				default:
					this.$el.addClass(styles.defaultSize)
					break;
			}
		},
		bindEvents: function () {
			var spinner = this;
			var dir = 0;
			var autoRollTicket;

			var startAutoRoll = function(){
				clearTimeout(autoRollTicket);
				autoRollTicket = setTimeout(function(){
					spinner.setValue(_parse(spinner.getValue()) + spinner.options.step * dir);
					startAutoRoll();
				},100);
			}
            
			this.$el.on(events.mouseUp + ' ' + events.mouseLeave, function(evt){
			   clearTimeout(autoRollTicket);
			   dir = 0;               
               if(evt.type !== 'mouseleave'){
                   spinner.triggerChangeEvent(spinner.getValue());
               }
			});

			this.$el.on(events.mouseDown, '.' + styles.upArrow, function(){
				spinner.setValue(_parse(spinner.getValue()) + spinner.options.step);
				spinner.triggerChangeEvent(spinner.getValue());

				dir = 1;
				clearTimeout(autoRollTicket);
				autoRollTicket = setTimeout(startAutoRoll, 500);
			});

			this.$el.on(events.mouseDown, '.' + styles.downArrow, function(){
				spinner.setValue(_parse(spinner.getValue()) - spinner.options.step);
				spinner.triggerChangeEvent(spinner.getValue());

				dir = -1;
				clearTimeout(autoRollTicket);
				autoRollTicket = setTimeout(startAutoRoll, 500);
			});

			this.$el.on(events.focusOut, 'input', function(){
				if(spinner.setValue(_parse(spinner.getValue()))){
                    spinner.triggerChangeEvent(spinner.getValue());
				}
			});

			this.$el.on(events.keypress, 'input', function(e){
				if (e.which == 13){
					if(spinner.setValue(_parse(spinner.getValue()))){
						spinner.triggerChangeEvent(spinner.getValue());
					}
				}
			});
		},
		getValue: function () {
			return +this.$el.find('input').val();
		},
		setValue: function (valueInRange) {
            this.options.value = this.valueInRangeToInnerRange(valueInRange);
			if (this.options.value !== this.last_value) {
                this.last_value = this.options.value;
				this.update();
				return true;
			}
		},
		update: function () {
            this.$el.find('input').val(this.options.value);
			return this;
		},
		valueInRangeToInnerRange: function (value) {
            value = +(+value).toFixed(this.options.precision);
			value = value < this.options.minValue ? this.options.minValue : value;
			value = value > this.options.maxValue ? this.options.maxValue : value;
			return value;
		}
	};
	
	
    function _buttonHtml() {
        return "" +
            "<div class=" + styles.upArrow + "></div>" +
            "<div class=" + styles.downArrow +"></span>";
    }

    function _parse(val) {
        if (typeof val === "string" && val !== "" ) {
            val = parseFloat(val);
        }
        return val === "" || isNaN(val) ? null : val;
    }
	
});

