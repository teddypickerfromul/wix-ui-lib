describe('Tooltip', function () {
	'use strict';

	var element;
	var ctrlElement;
	beforeEach(function(){
		element = $('<div wix-ctrl="Spinner" wix-tooltip="{text: \'Some text to show on hover\'}">Help</div>').appendTo('body')[0];
		ctrlElement = $('<div wix-ctrl="Tooltip" wix-options="{ placement: \'top\', text:\'bla bla\'}"</div>').appendTo('body')[0];
	});

	afterEach(function(){
		Wix.UI.destroy(element);
	});

	describe('Default Options', function () {
		it('should place the tool tip on top of the element', function(){
			var $tooltip = givenToolTip();
			expect($tooltip.offset().top).toEqual($(element).offset().top - ($tooltip.outerHeight() + 12));
			expect($tooltip.offset().left).toEqual($(element).offset().left + ($(element).outerWidth() - $tooltip.outerWidth()) / 2);
		});

		it('should support text only', function(){
			var $tooltip = givenToolTip({text:'Some text to show on hover'});
			expect($(element).next().find(".uilib-text").html()).toEqual('Some text to show on hover');
		});

	});

	it('should place the tooltip in the middle of the element for very long text', function(){
		var $tooltip = givenToolTip({text:'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'});
		expect($tooltip.offset().left + $tooltip.outerWidth() / 2).toEqual($tooltip.offset().left + $tooltip.outerWidth() / 2);
	});

	it('should show a tooltip on mouse enter', function(){
		givenToolTip();
		expect($(element).next().hasClass("uilib-tooltip")).toBeTruthy();
	});

	it('should hide a tooltip on mouse leave', function(){
		givenToolTip();
		var event = givenMouseLeaveEvent();
		$(element).trigger(event);

		waitsFor(function(){
			return $('.uilib-tooltip').size() == 0;
		}, "The element won't ever be hidden", 500);

		runs(function(){
			expect($(".uilib-tooltip").size()).toEqual(0);
		});
	});

	it('should hide a tooltip immediately on mouse leave when animation is set to off', function(){
		givenToolTip({animation: false});
		var event = givenMouseLeaveEvent();
		$(element).trigger(event);

		expect($(".uilib-tooltip").size()).toEqual(0);
	});

	it('should fall back to position top if invalid position is giving',function(){
		var $tooltip = givenToolTip({placement:'top'});
		expect($tooltip.offset().top).toEqual($(element).offset().top - ($tooltip.outerHeight() + 12));
	});

	it('should place the tooltip at the bottom when needed', function(){
		var $tooltip = givenToolTip({placement:'bottom'});
		expect($tooltip.offset().top).toEqual($(element).offset().top + $(element).outerHeight() + 12);
	});

	it('should generate tooltip from ctrl direactive', function(){
		Wix.UI.initializePlugin(ctrlElement);
		var event = givenMouseEnterEvent();
		$(ctrlElement).trigger(event);
		expect($(ctrlElement).next().hasClass("uilib-tooltip")).toBeTruthy();
		expect($(ctrlElement).next().find(".uilib-text").html()).toEqual('bla bla');
	});

	function givenMouseEnterEvent() {
		var event = jQuery.Event("mouseenter");
		return event;
	}

	function givenMouseLeaveEvent() {
		var event = jQuery.Event("mouseleave");
		return event;
	}

	function givenToolTip(options){
		options = options || {};
		$(".uilib-tooltip").remove();
		$(element).attr('wix-tooltip', JSON.stringify(options));
		Wix.UI.initializePlugin(element);
		var event = givenMouseEnterEvent();
		$(element).trigger(event);
		return $(".uilib-tooltip");
	}
});
