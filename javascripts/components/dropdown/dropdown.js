(function ($, window, document, undefined) {
	'use strict';

var pluginName = 'Dropdown';

var defaults = {
	slideTime : 150,
	selected: 0,
	autoCloseTime : 5000
};
var names = {
	valueAttrName : 'data-value',
	indexAttrName : 'data-index',
	dropDownClassName : 'dropdown',
	activeClassName : 'focus-active',
	optionInitSelector : 'option',
	optionInitValueAttrName : 'value',
	optionClassName : 'option',
	optionsClassName : 'options',
	selectedClassName : 'selected',
	highlightClassName : 'dropdown-highlight',
	iconClassName: 'dropdown-icon'
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

function DropDown(element, options) {
	this.options = $.extend({}, defaults, options);
	this.$selected = null;
	this.$options = null;
	this.$el = $(element);
	this.isOpen = false;
	this.isActive = false;
	this.init();
}
DropDown.prototype.init = function () {
	this.markup();
	this.setValue(this.options.selected);
	this.bindEvents();
	this.hideOptions(0);
};

DropDown.prototype.markup = function () {
	var $el = this.$el.addClass(names.dropDownClassName);//.css(dropdownCSS);
	var $options = this.$el.find(names.optionInitSelector).map(function (index) {
			var $option = $('<div>')
				.attr(names.valueAttrName, this.getAttribute(names.optionInitValueAttrName))
				.attr(names.indexAttrName, index)
				.addClass(names.optionClassName)
				.text(this.textContent);
				
			var iconUrl = this.getAttribute('data-icon');
			
			if(iconUrl){
				$option.prepend('<img src="'+iconUrl+'" class="'+names.iconClassName+'"/>');
			}		
			return $option;
		}).toArray();

	this.$selected = $('<div>').addClass(names.selectedClassName);
	this.$options = $('<div>').addClass(names.optionsClassName).append($options).css(optionsCSS);
	this.$el.empty();
	this.$el.append(this.$selected, this.$options);
		
};

DropDown.prototype.setValue = function (value) {
	var $option;
	if (typeof value === 'number') {
		$option = this.$options.find('[' + names.indexAttrName + '="' + value + '"]').eq(0);
	} else if (typeof value === 'string') {
		$option = this.$options.find('[' + names.valueAttrName + '="' + value + '"]').eq(0);
	} else if (value instanceof jQuery) {
		$option = value;
	}
	if ($option.length && this.getIndex() !== $option.attr(names.indexAttrName)) {
		this.$selected.empty();
		this.$selected.append($option.clone(true).addClass('current-item').removeClass(names.highlightClassName));
		return true;
	}
	return false;
};

DropDown.prototype.setValueFromEl = function ($el) {
	var index = +$el.attr(names.indexAttrName);
	if(this.setValue(index)){
		var value = $el.attr(names.valueAttrName);
		this.$el.trigger(pluginName + '.change', value);		
	}
};

DropDown.prototype.setActiveMode = function (isActive) {
	this.isActive = isActive;
	if (isActive) {
		this.$el.addClass(names.activeClassName);
	} else {
		this.$el.removeClass(names.activeClassName);
	}
};

DropDown.prototype.getValue = function () {
	return this.$selected.find('.' + names.optionClassName).attr(names.valueAttrName);
};

DropDown.prototype.getIndex = function () {
	return this.$selected.find('.' + names.optionClassName).attr(names.indexAttrName);
};

DropDown.prototype.hideOptions = function (time) {
	this.isOpen = false;
	this.$options.slideUp(time !== undefined ? time : this.options.slideTime);
};

DropDown.prototype.showOptions = function (time) {
	var $el = this.$options.find('[' + names.indexAttrName + '="' + this.getIndex() + '"]').eq(0);
	this.isOpen = true;
	this.highlightOption($el);
	this.$options.slideDown(time !== undefined ? time : this.options.slideTime);
};

DropDown.prototype.toggleOptions = function (time) {
	return this.isOpen ? this.hideOptions(time) : this.showOptions(time);
};

DropDown.prototype.highlightOption = function ($el) {
	if ($el.length) {
		this.$options.find('.' + names.highlightClassName).removeClass(names.highlightClassName);
		$el.addClass(names.highlightClassName);
	}
};

DropDown.prototype.bindAutoClose = function (closeDelay) {
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
};

DropDown.prototype.bindEvents = function () {
	var dropdown = this;

	if (this.options.autoCloseTime) {
		this.bindAutoClose(this.options.autoCloseTime);
	}

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
	
	$(window).on('mousedown', function (evt) {
		dropdown.hideOptions();
		dropdown.setActiveMode(false);
	});
	
	$(window).on('keydown', function (evt) {
		var $el, dir;
		if (dropdown.isActive) {

			if (evt.which === 13) {
				dropdown.toggleOptions();
				evt.preventDefault();
			}

			if (evt.which === 27) {
				dropdown.hideOptions();
				dropdown.setActiveMode(false);
				evt.preventDefault();
			}

			if (evt.which === 38 || evt.which === 40) {
				$el = dropdown.$options
                    .find('[' + names.indexAttrName + '="' + dropdown.getIndex() + '"]')
					.eq(0);
                dir = evt.which === 38 ? 'prev' : 'next';
                $el = $el[dir]('.' + names.optionClassName);
				dropdown.highlightOption($el);
				dropdown.setValueFromEl($el);
				evt.preventDefault();
			}

		}
	});
};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new DropDown(this, options));
			}
		});
	};


})(jQuery, window, document);
