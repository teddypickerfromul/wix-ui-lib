describe('Slider', function () {
    'use strict';

    var element;
    beforeEach(function () {
        this.addMatchers({
            toBeWixed: function() {
                var $element = this.actual.find('.uilib-slider');
                var $preLabel = this.actual.find('.uilib-slider-preLabel');
                var $postLabel = this.actual.find('.uilib-slider-postLabel');
                var $pin = this.actual.find('.uilib-slider-pin');
                var pinWidth = $pin.css('width') === '19px';
                return $element && $preLabel.length && $postLabel.length && $pin.length && pinWidth;
            }
        });
    });
    beforeEach(function(){
        element = $('<div wix-model="numOfItems" wix-ctrl="Slider" wix-options="{ preLabel:\'0\', postLabel:\'100\'}" class="slider""></div>').appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element, true);
    });

    it('should apply wix markup to given wix-ctrl', function(){
        Wix.UI.initializePlugin(element);
        var $slider = $(".uilib-slider");
        expect($slider).toBeWixed();
    });

    describe('Default Options', function () {
        beforeEach(function(){
            Wix.UI.initializePlugin(element);
        });
        

        it('should not show the tooltip by default', function(){
            var $toolTip = $(element).find('.uilib-slider-tooltip');
            expect($toolTip.length).toBe(0);
        });

        it('should not show a tool tip when you click on the pin by default', function(){
            var $element = $(element);
            var $pin = $element.find(".uilib-slider-pin");
            var $tooltip = $element.find(".uilib-slider-tooltip");

            expect($tooltip.length).toEqual(0);
            $pin.mousedown();
            expect($tooltip.length).toEqual(0);
        });
    });

    it('should set the tooltip value according to the model value when toolTip is set to true', function(){
        var $element = $(element);
        $element.attr('wix-options', '{toolTip:true}');
        Wix.UI.initializePlugin(element);
        var $tooltip = $element.find(".uilib-slider-tooltip");
        Wix.UI.set('numOfItems', 20);
        expect($tooltip.find("div.uilib-text").text()).toEqual('20');
    });


    it('should show a tooltip when the pin moves and hide it when it is static', function(){
        var $element = $(element);
        $element.attr('wix-options', '{toolTip:true}');
        Wix.UI.initializePlugin(element);

        var $pin = $element.find(".uilib-slider-pin");
        var $tooltip = $element.find(".uilib-slider-tooltip");

        expect($tooltip.css('display')).toBe('none');

        $pin.mousedown();
        expect($tooltip.css('display')).toBe('block');

        $(document.body).mouseup();
        expect($tooltip.css('display')).toBe('none');
    });
});
