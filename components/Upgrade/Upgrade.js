jQuery.fn.definePlugin('Upgrade', function ($) {
    'use strict';

    return {
        init: function () {
            this.markup();
            this.bindEvents();
        },
        getDefaults: function () {
            return {
                class: 'btn-upgrade',
                vendorProductId: '',
                cycle: 'MONTHLY'
            };
        },
        markup: function () {
            var className = "submit uilib-btn " + this.options.class;
            this.$el.append('<button class="' + className + '">' + this.options.text + '</button>');
        },
        bindEvents: function () {
            this.$el.find('.uilib-btn').on('click', this.upgrade.bind(this));
        },
        getValue: function () {
        },
        setValue: function (value) {
        },
        upgrade: function () {
            var vendorProductId = this.options.vendorProductId;
            Wix.Billing.openBillingPageForProduct(vendorProductId, this.options.cycle, function () {
                var popup = Wix.UI.create({ctrl: 'Popup',
                    options: {buttonSet: 'okCancel', fixed: true, title: 'Ooops something when wrong...', content: vendorProductId + ' was not found.'}});
                popup.getCtrl().open();
            });
        }
    };

});
