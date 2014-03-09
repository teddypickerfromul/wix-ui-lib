jQuery.fn.definePlugin('ToggleButtonGroup', function($){
	'use strict';
	
	return {
		init: function(){
			this.options.mode = 'toggle';
			this.buttonGroup = this.$el.ButtonGroup(this.options).getCtrl();
		},
		getDefaults: function(){
			return {
				value:0
			}
		},		
		setValue: function (value) {
			return this.buttonGroup.setValue(value);
		},
		getValue: function () {
			return this.buttonGroup.getValue();
		},
		bindEvents: function () {},
		markup: function () {}
	};
	
});
