describe('Spinner', function () {
    'use strict';

    var element;
	var $element;
    beforeEach(function () {
        this.addMatchers({
            toBeWixed: function() {
                var $input = this.actual.find('input');
                var $upArrow = this.actual.find('.up-arrow');
                var $downArrow = this.actual.find('.down-arrow');
                return $input.length && $upArrow.length && $downArrow.length;
            }
        });
    });
    beforeEach(function(){
        element = $('<div wix-model="numOfItems" wix-ctrl="Spinner"></div>').appendTo('body')[0];
		$element = $(element);
    });

    afterEach(function(){
        Wix.UI.destroy(element, true);
    });

    it('should apply wix markup to given wix-ctrl', function(){
        Wix.UI.initializePlugin(element);
        var $spinner = $(".uilib-spinner");
        expect($spinner).toBeWixed();
    });

    describe('Default Options', function () {
        beforeEach(function(){
            Wix.UI.initializePlugin(element);
        });
        it('should not allow value to be negative', function(){
			$element.find('.down-arrow').mousedown();
            expect(Wix.UI.get('numOfItems')).toBe(0);
        });

        it('should increase and decrease the value by 1', function(){
			$element.find('.up-arrow').mousedown();
            expect(Wix.UI.get('numOfItems')).toBe(1);

			$element.find('.down-arrow').mousedown();
            expect(Wix.UI.get('numOfItems')).toBe(0);
        });

        it('should not allow value to exceed 1000', function(){
            var $up = $element.find('.up-arrow');
            for(var i=0; i<1010; i++){
                $up.mousedown();
            }
            expect(Wix.UI.get('numOfItems')).toEqual(1000);
        });

		it('should set a default spinner size', function(){
			expect($element.hasClass('default')).toBeTruthy();

		});
    });

    it('should set value to 0 if input is not numeric', function(){
        Wix.UI.initializePlugin(element);
		$element.find('input').val('wix was here').focusout();
        expect(Wix.UI.get('numOfItems')).toBe(0);
    });

    it('should change control value on input focusout', function(){
        Wix.UI.initializePlugin(element);
		$element.find('input').val('5').focusout();
        expect(Wix.UI.get('numOfItems')).toBe(5);
    });

    it('should change control value on enter press', function(){
        Wix.UI.initializePlugin(element);
        var $input = $element.find('input');
        $input.val('5');
        var event = givenEnterPressedEvent();
        $input.trigger(event);
        expect(Wix.UI.get('numOfItems')).toBe(5);
    });

    it('should take the current input value when spinning', function(){
        Wix.UI.initializePlugin(element);
		$element.find('input').val('4').focusout();
        expect(Wix.UI.get('numOfItems')).toBe(4);

        var $up = $element.find('.up-arrow');
        $up.mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(5);

        var $down = $element.find('.down-arrow');
        $down.mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(4);
    });

    it('should change control value on mousedown per given step', function(){
        $(element).attr('wix-ctrl', 'Spinner:{step:2}')
        Wix.UI.initializePlugin(element);
        var $up = $element.find('.up-arrow');
        $up.mousedown().mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(4);

        var $down = $element.find('.down-arrow');
        $down.mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(2);
    });

    it('should change control value on mousedown per given step and precision', function(){
        var options = { step: 0.1,
                        precision: 2
        };
        $(element).attr('wix-ctrl', 'Spinner:' + JSON.stringify(options));
        Wix.UI.initializePlugin(element);
        var $up = $element.find('.up-arrow');
        $up.mousedown().mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(0.2);

        var $down = $element.find('.down-arrow');
        $down.mousedown();
        expect(Wix.UI.get('numOfItems')).toBe(0.1);
    });

    it('should work when setting custom maxValue as a string and setting to a floating value', function(){
        var options = {  maxValue: '500' };
        $(element).attr('wix-ctrl', 'Spinner:' + JSON.stringify(options));

        Wix.UI.initializePlugin(element);
        var $input = $element.find('input');
        $input.val('57.37704918032787');
        var event = givenEnterPressedEvent();
        $input.trigger(event);
        expect(Wix.UI.get('numOfItems')).toBe(57);
    });

	it('should support medium spinner sizes', function(){
		givenSpinner({ size: 'medium' });
		expect($element.hasClass('default')).toBeFalsy();
		expect($element.hasClass('medium')).toBeTruthy();
	});

	it('should support large spinner sizes', function(){
		givenSpinner({ size: 'large' });
		expect($element.hasClass('default')).toBeFalsy();
		expect($element.hasClass('large')).toBeTruthy();
	});

	it('should default to default size when not supported size is given', function(){
		givenSpinner({ size: 'wix-foo' });
		expect($element.hasClass('default')).toBeTruthy();
	});

	function givenSpinner(options){
		options = options || {};
		$element.attr('wix-options', JSON.stringify(options));
		Wix.UI.initializePlugin(element);
		return $element.getCtrl();
	}

    function givenEnterPressedEvent() {
        var event = jQuery.Event("keypress");
        event.which = 13;
        return event;
    }
});
