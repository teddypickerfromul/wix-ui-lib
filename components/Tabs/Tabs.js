jQuery.fn.definePlugin('Tabs', function ($) {
    'use strict';

    var styles = {
        className: 'uilib-tabs'
    };
    var events = {
        click: 'click'
    };

    return {
        init: function(){
            this.markup();
            this.bindEvents();
            this.selectTab($(this.tabs[this.options.value]));
        },
        getDefaults: function(){
            return {
                tabValueAttrName : 'data-tab',
                tabClassName: 'ui-lib-tab',
                selectedClassName: 'selected',
                value : 0
            };
        },
        markup: function(){
            if(!this.$el.hasClass(styles.className)){
                this.$el.addClass(styles.className);
            }
            this.tabs = this.$el.find('li['+this.options.tabValueAttrName+']')
                .addClass(this.options.tabClassName);
            this.tabsContent = this.$el.find('.tab-content > div['+this.options.tabValueAttrName+']');
        },
        bindEvents: function () {
            var tabs = this;
            this.$el.on('click', '.'+this.options.tabClassName, function (e) {
                tabs.selectTab($(this));
            });
        },
        getValue: function () {},
        setValue: function (value) {

        },
        selectTab: function ($el) {
            var tabs = this;
            if ($el.hasClass(tabs.options.selectedClassName)) { return; }
            tabs.tabsContent.hide();
            tabs.tabs.removeClass(tabs.options.selectedClassName);
            var dataTab = $el.attr(tabs.options.tabValueAttrName);
            $el.addClass(tabs.options.selectedClassName);
            $.each(tabs.tabsContent, function(index, value) {
                var $elem = $(value);
                if($elem.attr(tabs.options.tabValueAttrName) === dataTab){
                    $elem.show();
                }
            });
            this.triggerChangeEvent(this.getValue())
            $(document.body).trigger('uilib-update-scroll-bars');
        }
    };

});
