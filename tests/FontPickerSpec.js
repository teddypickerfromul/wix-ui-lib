describe('FontPicker', function () {
    'use strict';

    var element;
    var $element, $style, $testEl;
    var $fontPicker;
    beforeEach(function(){
        $element = $('<div id="fontPicker2" wix-param="fontStyle2" wix-ctrl="FontPicker"></div>');
        element = $element.appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element);
    });

    it('should set the correct font family for each item in the dropdown', function(){
        var fontsMeta = Wix.Styles.getEditorFonts();
        Wix.UI.initializePlugin(element);
        var $fontPicker = $("#fontPicker2");
        var $font = $fontPicker.find(".dropdown");
        expect($font.length).toBe(1);
        var $options = $font.find('.option');

        _.each($options, function(option){
            var $option = $(option);
            if (!$option.hasClass('current-item')){
                var cssFontFamily = $option.attr('data-value-extended');
                var fontFamily = $option.attr('data-value');
                var origCssFontFamily = $.grep(fontsMeta[0].fonts, function(font){ return font.fontFamily == fontFamily; });
                var cssFontFamilies = origCssFontFamily[0].cssFontFamily.replace(/\"/g, '\'');
                expect(cssFontFamily).toBe(cssFontFamilies);
            }

        });
    });
});
