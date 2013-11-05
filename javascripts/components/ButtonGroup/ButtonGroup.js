
(function ($, window, document, undefined) {
	'use strict';

	var pluginName = 'ButtonGroup';

	var defaults = {
		selected : 0
	};

	var names = {
		btnGroupClass : 'btn-group',
		valueAttrName : 'data-value',
		indexAttrName : 'data-index',
		selectedClass : 'uilib-selected',
		btnClass : 'uilib-button',
		btnClassToDeprecate : 'btn default',
		btnSelectedClassToDeprecate : 'active'
	};

	function ButtonGroup(element, options) {
		this.options = $.extend({}, defaults, options);
		this.$el = $(element);
		this.$selected = null
			this.init();
	}

	ButtonGroup.prototype.init = function () {
		this.markup();
		this.setValue(this.options.selected);
		this.bindEvents();
	};

	ButtonGroup.prototype.markup = function () {
		this.$el.addClass(names.btnGroupClass);
		this.getOptionsButtons().addClass(names.btnClass + ' ' + names.btnClassToDeprecate);
	};

	ButtonGroup.prototype.getOptionsButtons = function () {
		return this.$el.find('button');
	};

	ButtonGroup.prototype.setValue = function (value) {
		var $option;
		var $options = this.getOptionsButtons();
		if (typeof value === 'number') {
			$option = $options.eq(value);
		} else if (typeof value === 'string') {
			$option = $options.filter('[value="' + value + '"]').eq(0);
		} else if ($(value).hasClass(names.btnClass)) {
			$option = value;
		} else if(value && typeof value === 'object'){
			$option = $options.eq(value.index);
		}
		if ($option.length) {
			$options.removeClass(names.selectedClass + ' ' + names.btnSelectedClassToDeprecate);
			$option.addClass(names.selectedClass + ' ' + names.btnSelectedClassToDeprecate);
			this.$selected = $option;
		}
	};
	ButtonGroup.prototype.getValue = function () {
		return this.$selected.val();
	};

	ButtonGroup.prototype.getIndex = function () {
		return this.getOptionsButtons().index(this.$selected);
	};

	ButtonGroup.prototype.bindEvents = function () {
		var btnGroup = this;
		this.$el.on('click', '.' + names.btnClass, function (evt) {
			evt.stopPropagation();
			var value = $(this).val();
			if (btnGroup.$selected.val() !== value) {
				btnGroup.setValue(value);
				btnGroup.$el.trigger(pluginName + '.change', {
					index: btnGroup.$el.find('.' + names.btnClass).index(btnGroup.$selected),
					value:value
				});
			}
		});
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new ButtonGroup(this, options));
			}
		});
	};

})(jQuery, window, document);
