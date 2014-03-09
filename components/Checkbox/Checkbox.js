jQuery.fn.definePlugin('Checkbox', function($){
	'use strict';
	
	var names = {
		checkboxClass: 'uilib-checkbox',
		checkedClass: 'checked'
	};
	
	return {
		init:function(){
			this.options.value = this.options.value !== undefined ? this.options.value : this.options.checked;
			this.markup();
			this.bindEvents();	
			this.setValue(this.options.checked);
		},
		getDefaults: function(){
			return {
				checked : false,
				preLabel: '',
				postLabel: '',
				value: undefined
			};
		},
		markup: function() {
			
			if(!this.$el.hasClass(names.checkboxClass)){
				this.$el.addClass(names.checkboxClass);
			}
			
			this.$el.append('<span class="uilib-checkbox-check"></span>');

			if(this.options.preLabel){
				this.$el.prepend('<span class="uilib-text uilib-checkbox-preLabel">' + this.options.preLabel + '</span>');
			}
			
			if(this.options.postLabel){
				this.$el.append('<span class="uilib-text uilib-checkbox-postLabel">' + this.options.postLabel + '</span>');
			}
		},
		bindEvents: function() {
			this.$el.on('click', this.toggleChecked.bind(this));
		},
		getValue: function() {
			return this.$el.hasClass(names.checkedClass);
		},
		setValue: function(value) {
			value ? this.$el.addClass(names.checkedClass) : this.$el.removeClass(names.checkedClass);
		},
		toggleChecked: function() {
			this.$el.toggleClass(names.checkedClass);		
			this.triggerChangeEvent(this.getValue());
		}		
	};
	
});
