describe('Tabs', function () {
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

       var markup = '<div wix-ctrl="Tabs">'+
           '<div class="tabs-pane">'+
           '<h3>Tabs Pane</h3>'+
           '<div class="tabs-content">Tabs Content</div>'+
           '</div>' +
           '<div class="tabs-pane">'+
           '<h3>Tabs Pane</h3>'+
           '<div class="tabs-content">Tabs Content</div>'+
           '</div>'+
           '</div>';


        element = $(markup).appendTo('body')[0];
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
