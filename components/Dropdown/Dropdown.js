jQuery.fn.definePlugin('Dropdown', function($){
	'use strict';

	var names = {
		extendedValueName: 'data-value-extended',
		valueAttrName : 'data-value',
		indexAttrName : 'data-index',
		dropDownClassName : 'dropdown',
		activeClassName : 'focus-active',
		optionInitValueAttrName : 'value',
		optionClassName : 'option',
		optionsClassName : 'options',
		selectedClassName : 'selected',
		selectedOptionsClassName : 'option-selected',
		highlightClassName : 'dropdown-highlight',
		iconClassName: 'dropdown-icon',
		hideTextClass: 'dropdown-hideText',
        appendChildren:'data-append-children'
	};

	var optionsCSS = {
		width : '100%',
		position : 'absolute',
		top : '100%',
		zIndex : '999999'
	};

	var dropdownCSS = {
		position : 'relative'
	};
	
	var arrows = {
		down  : '<span class="dropdown-arrow dropdown-arrow-down"></span>',
		up    : '<span class="dropdown-arrow dropdown-arrow-up"></span>',
		left  : '<span class="dropdown-arrow dropdown-arrow-left"></span>',
		right : '<span class="dropdown-arrow dropdown-arrow-right"></span>'
	}
	
	return {
		init: function(){
			this.options.value = this.options.value !== undefined ? this.options.value : this.options.selected;
			this.$selected = null;
			this.$options = null;
			this.isParamMode = this.$el.attr('wix-param') || this.$el.attr('data-wix-param');
			this.isOpen = false;
			this.isActive = false;
			this.markup();
			this.setValue(this.options.value);
			this.bindEvents();
			this.hideOptions(0);
		},
		getDefaults: function(){
			return {
				slideTime : 150,
				selected: 0,
				value: undefined,
				autoCloseTime : 50000,
				optionSelector : '[value]',
				spriteMap: '',
				hideText: false,
				width:'',
				optionsWidth:'',
				height:'',
				//arrow:'down',
				style: 'dropdown-style-1',
                modifier: function($clone, $original){return $clone;}
			};
		},
		markup: function () {
			var dd = this;
			var $el = this.$el.addClass(names.dropDownClassName + ' ' + this.options.style);//.css(dropdownCSS);
			var $options = this.$el.find(this.options.optionSelector).map(function (index) {
					var style = this.getAttribute('style');
					var extended = this.getAttribute(names.extendedValueName);
                    var appendChildren = this.getAttribute(names.appendChildren);
					var $option = $('<div>')
						.attr(names.valueAttrName, this.getAttribute(names.optionInitValueAttrName))
						.attr(names.indexAttrName, index)
						.addClass(names.optionClassName)
						.addClass(this.className)

					
					if(appendChildren){
                        $option.append(this.children);
                    } else {
                        $option.text(this.textContent);
                    }

					if(extended){
						$option.attr(names.extendedValueName, extended);
					}
					if(style){
						$option.attr('style', style);
					}
					if(dd.options.hideText){
						$option.addClass(names.hideTextClass);
					}
					var iconUrl = this.getAttribute('data-icon');
					
					if(iconUrl){
						$option.prepend('<img src="'+iconUrl+'" class="'+names.iconClassName+'"/>');
					}		
					if(dd.options.spriteMap){
						$option.addClass(dd.options.spriteMap+index);
					}
					return $option;
				}).toArray();

			this.$selected = $('<div>').addClass(names.selectedClassName);
			this.$options = $('<div>').addClass(names.optionsClassName).append($options).css(optionsCSS);
			if(this.options.width){
				this.$options.css('width', this.options.width);
				$el.css('width', this.options.width);
			}
			if(this.options.optionsWidth){
				this.$options.css('width', this.options.optionsWidth);
			}
			if(this.options.height){
				this.$options.css('height', this.options.height);
			}

			this.$options.addClass('uilib-scrollbar');
			this.$el.empty();
			this.$el.append(arrows[/*this.options.arrow*/'down'], this.$selected, this.$options);
		},		
		setValue: function (value) {
			var $option;
			if(value && typeof value === 'object' && value.hasOwnProperty('value')/*&& value.hasOwnProperty('index') */){
				value = value.value;
			}
			if (typeof value === 'number') {
				$option = this.$options.find('[' + names.indexAttrName + '="' + value + '"]').eq(0);
			} else if (typeof value === 'string') {
				$option = this.$options.find('[' + names.valueAttrName + '="' + value + '"]').eq(0);
			} else if (value instanceof jQuery) {
				$option = value;
			}
			if ($option.length && this.getIndex() !== $option.attr(names.indexAttrName)) {
				this.$options.find('.'+names.selectedOptionsClassName).removeClass(names.selectedOptionsClassName);
				this.$selected.empty();
                this.$selected.append(this.options.modifier($option.clone(true).addClass('current-item').removeClass(names.highlightClassName), $option));
				$option.addClass(names.selectedOptionsClassName);
				return true;
			}
			return false;
		},
		setValueFromEl: function ($el) {
			var index = +$el.attr(names.indexAttrName);
			if(this.setValue(index)){
				//var value = this.isParamMode ? this.getFullValue() : this.getValue();
				this.triggerChangeEvent(this.getValue());
			}
		},
		setActiveMode: function (isActive) {
			this.isActive = isActive;
			if (isActive) {
				this.$el.addClass(names.activeClassName);
			} else {
				this.$el.removeClass(names.activeClassName);
			}
		},
		getIndex: function () {
			return +this.$selected.find('.' + names.optionClassName).attr(names.indexAttrName);
		},
		getVal: function(){
			return this.$selected.find('.' + names.optionClassName).attr(names.valueAttrName);
		},
		getValue: function () {
			return this.getFullValue();
		},
		getExtendedValue: function () {
			return this.$selected.find('.' + names.optionClassName).attr(names.extendedValueName);
		},
		getFullValue: function () {
			return {
				value: this.getVal(),
				index: this.getIndex()
			};
		},
		hideOptions: function (time) {
			this.$el.trigger('uilib-dropdown-close', this);
			this.isOpen = false;
			this.$options.slideUp(time !== undefined ? time : this.options.slideTime);
		},
		showOptions: function (time) {
			var $options = this.$options;
			var $el = $options.find('[' + names.indexAttrName + '="' + this.getIndex() + '"]').eq(0);
			this.isOpen = true;
			this.highlightOption($el);
			$options.slideDown(time !== undefined ? time : this.options.slideTime, function(){
				$options.css('overflow', 'auto');
			});
			this.$el.trigger('uilib-dropdown-open', this);
		},
		toggleOptions: function (time) {
			return this.isOpen ? this.hideOptions(time) : this.showOptions(time);
		},
		highlightOption: function ($el) {
			if ($el.length) {
				this.$options.find('.' + names.highlightClassName).removeClass(names.highlightClassName);
				$el.addClass(names.highlightClassName);
			}
		},
		bindAutoClose: function (closeDelay) {
			var fold;
			var dropdown = this;

			this.$el.hover(function () {
				clearTimeout(fold);
			}, function () {
				clearTimeout(fold);
				if (dropdown.isOpen) {
					fold = setTimeout(function () {
							if (dropdown.isOpen) {
								dropdown.setActiveMode(false);
								dropdown.hideOptions();
							}
						}, closeDelay);
				}
			});
		},
		bindEvents: function () {
			var dropdown = this;

			if (this.options.autoCloseTime) {
				this.bindAutoClose(this.options.autoCloseTime);
			}

			function uilibDropdownOpen(evt, _dropdown){
				if(_dropdown !== dropdown && _dropdown.isOpen){
					dropdown.hideOptions();
					dropdown.setActiveMode(false);				
				}
			}
			function winMousedown(evt) {
				dropdown.hideOptions();
				dropdown.setActiveMode(false);
			}
			
			$(document).on('uilib-dropdown-open', uilibDropdownOpen);
			
			$(window).on('mousedown', winMousedown);
			
			this.whenDestroy(function(){
				$(document).off('uilib-dropdown-open',uilibDropdownOpen);
				$(window).off('mousedown', winMousedown);
			});

			this.$options.mousewheel && this.$options.mousewheel(function(evt){
				evt.stopPropagation();
			});
			
			this.$options.on('mouseenter', '.' + names.optionClassName, function () {
				dropdown.highlightOption($(this));
			});

			this.$options.on('click', '.' + names.optionClassName, function () {
				dropdown.setValueFromEl($(this));
			});
			
			this.$el.on('click', function (evt) {
				evt.stopPropagation();
				dropdown.setActiveMode(true);
				dropdown.toggleOptions();
			});
			
			this.$el.on('mousedown', function (evt) {
				evt.stopPropagation();
			});

			
			var ENTER = 13,
				SPACE = 32,
				ESC = 27,
				TAB = 9,
				UP = 38,
				DOWN = 40,
				PAGE_UP = 33,
				PAGE_DOWN = 34,
				PAGE_MOVE_ITEMS = 5,
				ARROW_MOVE_ITEMS = 1
			
			$(window).on('keydown', function (evt) {
				var $el, dir, items;
				if (dropdown.isActive) {
					//add Tab & Space
					if (evt.which === ENTER || evt.which === SPACE) {
						dropdown.toggleOptions();
						evt.preventDefault();
					}

					if (evt.which === ESC || evt.which === TAB) {
						dropdown.hideOptions();
						dropdown.setActiveMode(false);
						evt.preventDefault();
					}
					
					//up/down/pageup/pagedown
					if (evt.which === UP || evt.which === DOWN || evt.which === PAGE_UP || evt.which === PAGE_DOWN) {
						$el = dropdown.$options
							.find('[' + names.indexAttrName + '="' + dropdown.getIndex() + '"]')
							.eq(0);
						
						dir = (evt.which === UP || evt.which === PAGE_UP) ? 'prev' : 'next';
						items = (evt.which === UP || evt.which === DOWN) ? ARROW_MOVE_ITEMS : ((dropdown.$options.height() / $el.height())<<0 || PAGE_MOVE_ITEMS);
						
						var _$el;
						while (items--) {
							_$el = $el;
							$el = $el[dir]('.' + names.optionClassName);
							if($el.length ===0){
								$el  = _$el;
							}
						}
						
						dropdown.highlightOption($el);
						dropdown.setValueFromEl($el);
						
						if($el.length){
							dropdown.$options.clearQueue().animate({
								scrollTop: dropdown.$options.scrollTop() + $el.position().top
							}, 200);
						}
						evt.preventDefault();
					}

				}
			});
		}
	};
	
});
