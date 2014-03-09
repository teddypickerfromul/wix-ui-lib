describe('Input', function () {
	'use strict';

	var element;
	var $element;
	beforeEach(function(){
		element = $('<div id="input" wix-ctrl="Input" wix-model="numOfItems"></div>').appendTo('body')[0];
		$element = $(element);
	});

	afterEach(function(){
		Wix.UI.destroy(element);
	});

	describe('Default Options', function () {
		it('should pass validation', function(){
			givenInput();
			Wix.UI.set('numOfItems', 20);
			expect($element.find('.uilib-input').val()).toEqual('20');
		});

		it('should be enabled', function(){
			givenInput();
			expect($element.find('.uilib-input').hasClass('disabled')).toBeFalsy();
		});
	});

	it('should not pass validation when needed', function(){
		var $ctrl = givenInput({validate: true});
		Wix.UI.set('numOfItems', 20);
		expect($element.find('.uilib-input').val()).toEqual('20');
		$ctrl.setValidationFunction(function(value){
			return value < 100;
		});
		$element.find('.uilib-input').val('100').keyup();
		expect($element.find('.uilib-input').hasClass('invalid-input')).toBeTruthy();
	});

	it('should disable the plugin when options has disabled', function(){
		var $ctrl = givenInput({disabled: true});
		var $input = $element.find('.uilib-input');
		expect($input.hasClass('disabled')).toBeTruthy();
		expect($input.attr('disabled')).toBeDefined();
		$ctrl.enable();
		expect($input.hasClass('disabled')).toBeFalsy();
		expect($input.attr('disabled')).not.toBeDefined();
		$ctrl.disable();
		expect($input.hasClass('disabled')).toBeTruthy();
		expect($input.attr('disabled')).toBeDefined();
	});

	describe('Support different text input sizes', function () {
		it('should support medium text input', function(){
			givenInput({size: 'medium'});
			var $input = $element.find('.uilib-input');
			expect($input.hasClass('medium')).toBeTruthy();
		});

		it('should support large text input', function(){
			givenInput({size: 'large'});
			var $input = $element.find('.uilib-input');
			expect($input.hasClass('large')).toBeTruthy();
		});

		it('should support extra large text input', function(){
			givenInput({size: 'x-large'});
			var $input = $element.find('.uilib-input');
			expect($input.hasClass('x-large')).toBeTruthy();
		});

		it('should support big text input', function(){
			givenInput({size: 'big'});
			var $input = $element.find('.uilib-input');
			expect($input.hasClass('big')).toBeTruthy();
		});

		it('should only support defined sizes of inputs', function(){
			givenInput({size: 'wix-foo'});
			var $input = $element.find('.uilib-input');
			expect($input.hasClass('wix-foo')).toBeFalsy();
		});
	});

	function givenInput(options){
		options = options || {};
		$element.attr('wix-options', JSON.stringify(options));
		Wix.UI.initializePlugin(element);
		return $element.getCtrl();
	}
});
