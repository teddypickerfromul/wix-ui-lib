describe('FontStylePicker', function () {
    'use strict';

    var element;
    var $element;
    var $fontPicker
    beforeEach(function(){
        $element = $('<div id="fontPicker1" wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>');
        element = $element.appendTo('body')[0];

        Wix.UI.initializePlugin(element);
        $fontPicker = $(".font-style-picker");
        $fontPicker.find('.box-like-drop').click();

        waitsFor(function(){
            return $fontPicker.find("[wix-ctrl='Popup']").length == 1;
        }, "The font picker won't ever be shown", 500);
    });

    afterEach(function(){
        Wix.UI.destroy(element, true);
    });

    it('should set the correct font style name for each item in the dropdown', function(){

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
                    var font = Wix.Styles.getStyleFontByReference(style);
                    var fontEl = $option.find('.font');
                    var fontFamily = fontEl.css('font-family');
                    expect(fontFamily).toBe('arial');
                }

            });
        });
    });

    it('should handle "Custom" per spec', function(){
        runs(function(){
            var $popup = $fontPicker.find("[wix-ctrl='Popup']");
            expect($popup.length).toBe(1);
            var $style = $popup.find("[wix-ctrl='Dropdown']");
            expect($style.length).toBe(1);

            var customEl = $style.find('.custom');
            expect(customEl).toBeDefined();
            var styleDisplayName = customEl.find('.font').html();
            expect(styleDisplayName).toBe("Custom");
        });
    });

    it('should have only one color picker popup open at a time', function() {

        var oldPopups = $(".uilib-popup");

        // Init another font style picker
        var $element2 = $('<div id="fontPicker2" wix-param="newFontStyle" wix-ctrl="FontStylePicker"></div>');
        var element2 = $element2.appendTo('body')[0];
        Wix.UI.initializePlugin(element2);
        var $fontPicker2 = $(".font-style-picker");
        $fontPicker2.find('.box-like-drop').click();

        waitsFor(function () {
            return $element2.find(".uilib-popup").length > 0;
        }, "The popup is not shown", 500);

        runs(function () {
            //make sure all old popups are hidden
            _.each(oldPopups, function (popup) {
                expect($(popup).css('display')).toBe('none');
            });

            expect($element2.find(".uilib-popup").css('display')).toBe('block');

            Wix.UI.destroy(element2, true);
        });
    });

    function givenFontName(preset){
        if (preset == "Custom") {
            return "Custom";
        }
        return preset.replace(/-/g,' ');
    }
});
