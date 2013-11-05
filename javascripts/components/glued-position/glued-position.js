(function ($, window, document) {
	'use strict';

	var pluginName = 'GluedControl';

	function Plugin(element, options) {
		this.state = {
			horizontalMargin : 0,
			verticalMargin : 0,
			placement : 'TOP_LEFT'
		};

		var defaults = _getDefaults();

		this.$el = $(element);
        this.createControlHTML();
        if (options.bindToWidget) {
            this.initWithBinding(defaults, options);
        } else {
            this.init(defaults, options);
        }
	}

    Plugin.prototype.init = function (defaults, options) {
        _setUserEvents(defaults, options);

        this.options = $.extend({}, defaults, options);
	
		this.slider = this.createSlider(this.options.slider);		
		this.dropdown = this.createDropDown(this.options.dropdown);
    }

	Plugin.prototype.initWithBinding = function (defaults, options) {
		var plugin = this;
		getPlacement(function (state) {		
            $.extend(plugin.state, state);
            $.extend(defaults.slider, _getSliderEvents(plugin.state));
			plugin.options = $.extend({}, defaults, options);			
			plugin.slider = plugin.createSlider(plugin.options.slider);

			$.extend(plugin.options.dropdown, _getDropdownEvents(plugin.state, plugin.slider));
			plugin.dropdown = plugin.createDropDown(plugin.options.dropdown);			
		});
	};

	Plugin.prototype.createSlider = function(options){
		options.value = this.state[getPlacementOrientation(this.state)] || 0;
		this.$slider = this.$el.find('.glued-slider');
		return this.$slider.Slider(options).data('plugin_Slider');
	};
	
	Plugin.prototype.createDropDown = function(options){
		options.visibleRows = this.options.placements.length;

		this.$dropdown = this.$el.find(".glued-dropdown")
			.html(this.dropdownHTML())
			.find('select')
			.msDropDown(options);

		return this.$dropdown.data('dd');
	};

	Plugin.prototype.createControlHTML = function () {
        this.$el.append('<div class="glued-dropdown"></div>' +
            '<div class="divider gluedDivider"></div>' +
            '<div class="glued-slider"></div>');
    }

	Plugin.prototype.dropdownHTML = function () {

		var placements = this.options.placements;
		if (placements.length === 0) {
			placements = ['TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'CENTER_LEFT', 'CENTER_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT'];
		}

		function getOption(value, imageSpriteData, title) {
			return '<option value="' + value + '" data-image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-imagecss="positionIcons ' + imageSpriteData + '" selected="selected">' + title + '</option>';
		}

		var options = placements.map(function (value) {
				var imageSpriteData,
				text;

				switch (value) {
				case 'TOP_LEFT':
					imageSpriteData = 'topLeft';
					text = 'Top Left';
					break;
				case 'TOP_RIGHT':
					imageSpriteData = 'topRight';
					text = 'Top Right';
					break;
				case 'BOTTOM_RIGHT':
					imageSpriteData = 'bottomRight';
					text = 'Bottom Right';
					break;
				case 'BOTTOM_LEFT':
					imageSpriteData = 'bottomLeft';
					text = 'Bottom Left';
					break;
				case 'TOP_CENTER':
					imageSpriteData = 'top';
					text = 'Top';
					break;
				case 'CENTER_RIGHT':
					imageSpriteData = 'right';
					text = 'Right';
					break;
				case 'BOTTOM_CENTER':
					imageSpriteData = 'bottom';
					text = 'Bottom';
					break;
				case 'CENTER_LEFT':
					imageSpriteData = 'left';
					text = 'Left';
					break;
				}

				return getOption(value, imageSpriteData, text);
			}).join('\n');

		return '<p>Select the position for your widget</p><select name="positionSelection" class="positionSelection">' + options + '</select>';
	}

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName,
					new Plugin(this, options));
			}
		});
	};

	$.fn[pluginName].Constructor = Plugin;

	function setPlacement(state) {
		Wix.Settings.setWindowPlacement(
			Wix.Utils.getOrigCompId(),
			state.placement,
			state.verticalMargin,
			state.horizontalMargin);
	}

	function updateSliderPlacement(state, sliderPlugin, placement) {
		sliderPlugin.enable();
		sliderPlugin.$el.removeClass(getPlacementOrientation(state));
		state.placement = placement
		sliderPlugin.setValue(0, true);
		if (getPlacementOrientation(state) === 'other') {
			sliderPlugin.disable();
		} else {
			sliderPlugin.$el.addClass(getPlacementOrientation(state));
		}

	}

	function getPlacementOrientation(state) {
		if (state.placement === 'TOP_CENTER' || state.placement === 'BOTTOM_CENTER') {
			return 'horizontalMargin';
		} else if (state.placement === 'CENTER_RIGHT' || state.placement === 'CENTER_LEFT') {
			return 'verticalMargin';
		} else {
			return 'other';
		}
	}

	function getPlacement(cb) {
		Wix.Settings.getWindowPlacement(Wix.Utils.getOrigCompId(), cb);
	}

    function _getDefaults() {
        return {
            placements : [],
            slider : {
				width:158,
				className:'',
                minValue : -2,
                maxValue : 2,
				value : 0
            },
            dropdown : {
				visibleRows:8,
				on:{}
			}
        };
    }

    function _getDropdownEvents(state, slider) {
        return {
			on:{
				create : function() {
					this.setIndexByValue(state.placement);
				},
				change : function(evt) {
					updateSliderPlacement(state, slider, evt.value);
                    setPlacement(state);
				}
			}
        };
    }
	
	//Ribbon for Glued 
	function createRibbon(slider){
		
		var elWidth = slider.$el.width();

		slider.$center = $('<div class="uilib-slider-back">');
		slider.$leftLine = $('<div class="uilib-slider-back">');
		slider.$rightLine = $('<div class="uilib-slider-back">');

		slider.$leftLine.css({
			left:elWidth/4,
			background:'rgba(0,0,0,0.13)',
			width:1
		}).prependTo(slider.$el);

		slider.$center.css({
			left:elWidth/2 - 1,
			background:'rgba(0,0,0,0.2)'
		}).prependTo(slider.$el);

		slider.$rightLine.css({
			left:(elWidth/4)*3,
			background:'rgba(0,0,0,0.13)',
			width:1
		}).prependTo(slider.$el);

		slider.$ribbon = $('<div class="uilib-slider-back">').prependTo(slider.$el);
	}
	function updateRibbon(slider, val){
		var pinWidth = slider.$pin.width() / 2;
		var elWidth = slider.$el.width() / 4;
		var w, range;
		
		if(val > 1){
			range = (val - 1);
			w = elWidth * range;
			slider.$ribbon.css({
				width:elWidth - w + range * pinWidth,
				right:0,
				left:'auto',
				borderRadius: '0 8px 8px 0'
			});
		}

		if(val >= 0 && val <= 1){
			w = elWidth * (val);
			slider.$ribbon.css({
				width:w,
				right:'auto',
				left:elWidth * 2,
				borderRadius:0
			});
		}

		if(val < -1){
			range = ((val * -1) - 1);
			w = elWidth * range;
			slider.$ribbon.css({
				width: (elWidth - w) + range * pinWidth,
				left:0,
				right:'auto',
				borderRadius: '8px 0 0 8px'
			});
		}

		if(val < 0 && val >= -1){
			w = elWidth * ((val * -1));
			slider.$ribbon.css({
				width: w,
				right:elWidth * 2,
				left:'auto',
				borderRadius:0
			});
		}


	}
	
    function _getSliderEvents(state) {
        return {
            create : function () {
                createRibbon(this);
				
                if (getPlacementOrientation(state) === 'other') {
                    this.$el.addClass('disabled');
                } else {
                    this.$el.addClass(getPlacementOrientation(state));
                }
            },
            slide : function(val) {
				state[getPlacementOrientation(state)] = val;
				setPlacement(state);
				updateRibbon(this, val);
            }
        };
    }

    function _setUserEvents(defaults, options) {
       
		defaults.slider.create = function(){
			createRibbon(this);
			if (typeof options.sliderCreate === 'function') {
				options.sliderCreate.apply(this, arguments);
			}
		}

		defaults.slider.slide = function(val){
			updateRibbon(this, val);	
			if (typeof options.sliderChange === 'function') {
				options.sliderChange.apply(this, arguments);
			}
		}

        if (typeof options.dropDownChange === 'function') {
            defaults.dropdown.on.change = options.dropDownChange;
        }
        if (typeof options.dropDownCreate === 'function') {
            defaults.dropdown.on.create = options.dropDownCreate;
        }
    }

})(jQuery, window, document);
