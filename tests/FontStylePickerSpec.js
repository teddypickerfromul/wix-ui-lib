describe('FontStylePicker', function () {
    'use strict';

    var element;
    var $element;
    beforeEach(function(){
        $element = $('<div id="fontPicker1" wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>');
        element = $element.appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element);
    });

    it('should set the correct font style name for each item in the dropdown', function(){
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
                if (!$option.hasClass('current-item')){
                    var style = $option.attr('data-value');
                    var styleDisplayName = $option.find('.font').html();
                    expect(styleDisplayName).toBe(givenFontName(style));
                }

            });
        });
    });

    it('should set the correct font class name for each item in the dropdown', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        var $popup = $fontPicker.find("[wix-ctrl='Popup']");
        expect($popup.length).toBe(1);
        var $style = $popup.find("[wix-ctrl='Dropdown']");
        expect($style.length).toBe(1);
        var $options = $style.find('.option');

        _.each($options, function(option){
            var $option = $(option);
            if (!$option.hasClass('current-item')){
                var style = $option.attr('data-value');
                var font = Wix.Styles.getStyleFontByReference();
                var fontEl = $option.find('.font');
                var fontFamily = fontEl.css('font-family');
                expect(fontFamily).toBe('arial');
            }

        });
    });

    it('should set the correct font family for each item in the dropdown', function(){
        var fontsMeta = Wix.Styles.getEditorFonts();

        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        var $popup = $fontPicker.find("[wix-ctrl='FontPicker']");
        expect($popup.length).toBe(1);
        var $font = $popup.find(".dropdown");
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

    it('should handle "Custom" per spec', function(){
        Wix.UI.initializePlugin(element);
        var $fontPicker = $(".font-style-picker");
        var $popup = $fontPicker.find("[wix-ctrl='Popup']");
        expect($popup.length).toBe(1);
        var $style = $popup.find("[wix-ctrl='Dropdown']");
        expect($style.length).toBe(1);

        var customEl = $style.find('.custom');
        expect(customEl).toBeDefined();
        var styleDisplayName = customEl.find('.font').html();
        expect(styleDisplayName).toBe("Custom");

    });

    it('should have only one color picker popup open at a time', function() {
        var oldPopups = $(".uilib-popup");

        Wix.UI.initializePlugin(element);

        $element.find('.box-like-drop').click();

        waitsFor(function () {
            return $element.find(".uilib-popup").length > 0;
        }, "The popup is not shown", 500);

        runs(function () {
            //make sure all old popups are hidden
            _.each(oldPopups, function (popup) {
                expect($(popup).css('display')).toBe('none');
            });

            expect($element.find(".uilib-popup").css('display')).toBe('block');
        });
    });

    function givenFontName(preset){
        if (preset == "Custom") {
            return "Custom";
        }
        return preset.replace(/-/g,' ');
    }
});
