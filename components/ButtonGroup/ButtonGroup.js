jQuery.fn.definePlugin('ButtonGroup', function($){
	'use strict';
	
	var names = {
		btnGroupClass : 'btn-group',
		valueAttrName : 'data-value',
		indexAttrName : 'data-index',
		selectedClass : 'btn-selected',
		btnBaseClass : 'uilib-btn',
		btnClass : 'uilib-btn btn-secondary btn-small',
		btnClassToDeprecate : 'btn',
		btnSelectedClassToDeprecate : 'active',
		types:{
			single: 'single',
			toggle: 'toggle'
		}
	};
	
	return {
		init: function(){
			this.$selected = null;
			this.markup();
			this.setValue(this.options.value);
			this.bindEvents();
		},
		getDefaults: function(){
			return {
				value : 0,
				mode: 'single'
			};
		},
		markup: function () {
			this.$el.addClass(names.btnGroupClass);
			this.getOptionsButtons().addClass(names.btnClass + ' ' + names.btnClassToDeprecate);
		},
		getOptionsButtons: function () {
			return this.$el.find('button');
		},
		setValueSingleMode:function(value){
			var $option;
			var $options = this.getOptionsButtons();
			if (typeof value === 'number') {
				$option = $options.eq(value);
			} else if (typeof value === 'string') {
				$option = $options.filter('[value="' + value + '"], ['+names.valueAttrName+'="' + value + '"]').eq(0);
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
		},
		toggleActiveClass:function($el){
			$el.toggleClass(names.selectedClass + ' ' + names.btnSelectedClassToDeprecate);
		},
		setValueToggleMode:function(value){
			var $options = this.getOptionsButtons();
			var className = names.selectedClass + ' ' + names.btnSelectedClassToDeprecate;
			for(var k in value){
				if(value.hasOwnProperty(k)){
					var $option = $options.filter('[value="' + k + '"], ['+names.valueAttrName+'="' + k + '"]').eq(0);
					value[k] ? $option.addClass(className) : $option.removeClass(className);
				}
			}
		},
		setValue: function (value) {
			this.isSingleMode() ? this.setValueSingleMode(value) : this.setValueToggleMode(value);
		},
		getValueFromEl: function($el){
			return $el.attr(names.valueAttrName) || $el.val();
		},
		getValue: function () {
			if(this.isSingleMode()){
				return {
					index: this.getIndex(this.$selected),
					value: this.getValueFromEl(this.$selected)
				};
			} else {
				var obj = {};
				var $options = this.getOptionsButtons();
				var btnGroup = this;
				$options.each(function(){
					var $this = $(this);
					obj[btnGroup.getValueFromEl($this)] = $this.hasClass(names.selectedClass + ' ' + names.btnSelectedClassToDeprecate);
				});
				return obj;
			}
		},
		getIndex: function ($el) {
			return +this.getOptionsButtons().index($el);
		},
		isSingleMode: function(){
			return this.options.mode === names.types.single;
		},
		bindEvents: function () {
			var btnGroup = this;
			
			this.$el.on('click', '.' + names.btnBaseClass, function () {
				btnGroup.isSingleMode() ? handleClickSingle($(this)) : handleClickToggle($(this));
			});
			
			function handleClickToggle($el){
				btnGroup.toggleActiveClass($el);
				btnGroup.triggerChangeEvent(btnGroup.getValue());
			}
			
			function handleClickSingle($el){
				var value = btnGroup.getValueFromEl($el);
				if (btnGroup.getValueFromEl(btnGroup.$selected) !== value) {
					btnGroup.setValue(value);
					btnGroup.triggerChangeEvent(btnGroup.getValue());
				}
			}
		}
	};
	
});
