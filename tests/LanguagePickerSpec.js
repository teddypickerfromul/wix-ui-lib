describe('LanguagePicker', function () {
    'use strict';

    var element;
    beforeEach(function () {
        this.addMatchers({
            toBeWixed: function() {
                var $option = this.actual.find('.selected .option');
                var $globe = this.actual.find('.selected .option span.globe');
                var $options = this.actual.find('.options .option');
                return $option.length && $globe.length && $options.length === 11;
            }
        });
    });
    beforeEach(function(){
        element = $('<div wix-model="languagePicker" wix-ctrl="LanguagePicker"></div>').appendTo('body')[0];
    });

    afterEach(function(){
        Wix.UI.destroy(element);
    });

    it('should apply wix markup to given wix-ctrl', function(){
        Wix.UI.initializePlugin(element);
        var $languagePicker = $(".uilib-languagePicker");
        expect($languagePicker).toBeWixed();
    });

    it('should add supported languages to picker', function(){
        Wix.UI.initializePlugin(element);
        var $languagePicker = $(".uilib-languagePicker");
        var langs = givenLanguagesWeSupport();
        _.each($languagePicker.find('.options .option'), function(element){
            expect(_.indexOf(langs,$(element).text())).toBeGreaterThan(-1);
        });
    });

    describe('Default Options', function () {
        beforeEach(function(){
            Wix.UI.initializePlugin(element);
        });
        it('should set selected language to En', function(){
            var $languagePicker = $(".uilib-languagePicker");
            var $selected =  $languagePicker.find('.selected .option');
            expect($selected.text()).toBe('En');
        });

        it('should add a globe span to selected option', function(){
            var $languagePicker = $(".uilib-languagePicker");
            var $selected =  $languagePicker.find('.selected .option');
            expect($selected.find("span.globe").length).toEqual(1);
        });
    });

    it('should set selected value from the option data-value', function(){
        Wix.UI.initializePlugin(element);
        var $languagePicker = $(".uilib-languagePicker");
        var $deutsch = $languagePicker.find('.options .option:nth-child(2)');
        $deutsch.click();
        var $selected =  $languagePicker.find('.selected .option');
        expect($selected.text()).toBe($deutsch.attr('data-value'));
    });

    it('should trigger ChangeEvent when option is selected', function(){
        Wix.UI.initializePlugin(element);
        var $languagePicker = $(".uilib-languagePicker");
        var $es = $languagePicker.find('.options .option:nth-child(3)');
        $es.click();
        expect(Wix.UI.get($(element).attr('wix-model')).value).toEqual('Es');
        expect(Wix.UI.get($(element).attr('wix-model')).index).toEqual(2);
    });

    function givenLanguagesWeSupport() {
       return ['English', 'Deutsch', 'Español', 'Français', 'Italiano', 'Polski', 'Português', 'Русский', '日本語', '한국어', 'Türkçe'];
    }
});
