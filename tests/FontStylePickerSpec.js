describe('LanguagePicker', function () {
    'use strict';

    var element;
    beforeEach(function(){
        element = $('<div wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>').appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element);
    });

    it('should apply wix markup to given wix-ctrl', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        $fontPicker.find('.box-like-drop').click();

        waitsFor(function(){
            return $fontPicker.find("[wix-ctrl='Popup']").length == 1;
        }, "The font picker won't ever be shown", 500);

        runs(function(){
            var $popup = $fontPicker.find("[wix-ctrl='Popup']");
            expect($popup.length).toBe(1);
            var $style = $popup.find("[wix-ctrl='Dropdown']");
            expect($style.length).toBe(1);

            var $options = $style.find('.option');
            _.each($options, function(option){
                var $option = $(option);
                var font = $option.attr('data-value');
                if(font !== 'Custom'){
                    expect($option.hasClass(font)).toBeTruthy();
                }
            });
        });
    });

    it('should handle "Custom" per spec', function(){

    });
});
