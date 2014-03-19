describe('Tabs', function () {
    'use strict';

    var element;
	var $element;
    beforeEach(function(){

        var markup = '<div wix-ctrl="Tabs">' +
            '<ul>' +
            '<li data-tab="tab0"><div>Tab 1</div></li>' +
            '<li data-tab="tab1"><div>Tab 2</div></li>' +
            '<li data-tab="tab2"><div>Tab 3</div></li>' +
            '</ul>' +
            '<div class="tab-content">' +
            '<div data-tab="tab0" class="tab-pane">' +
            'Tab content 1' +
            '</div>' +
            '<div data-tab="tab1" class="tab-pane">' +
            'Tab content 2' +
            '</div>' +
            '<div data-tab="tab2" class="tab-pane">' +
            'Tab content 3' +
            '</div>' +
            '</div>' +
            '</div>';

        element = $(markup).appendTo('body')[0];
		$element = $(element);
    });

    afterEach(function(){
        Wix.UI.destroy(element, true);
    });

    it('should add border to pane when tabs have no scroll widget', function(){
        Wix.UI.initializePlugin(element);
        var $tabs = $(".uilib-tabs");
        var panes = $tabs.find(".tab-pane");
        _.each(panes, function(pane){
            expect($(pane).hasClass("border")).toBeTruthy();
        });
    });

});
