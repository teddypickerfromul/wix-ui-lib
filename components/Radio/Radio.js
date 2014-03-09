jQuery.fn.definePlugin('Radio', function ($) {
    'use strict';

    return {
        init: function(){
            this.options.value = this.options.value !== undefined ? this.options.value : this.options.checked;
            this.markup();
            this.setValue(this.options.value);
            this.bindEvents();
        },
        getDefaults: function(){
            return {
                radioBtnGroupClassName:'rb-radio-group',
                radioBtnClassName:'rb-radio',
                checkClassName:'rb-radio-check',
                checkedClassName: 'rb-radio-checked',
                radioValueAttrName:'data-radio-value',
                inline:false,
                checked: 0,
                value:undefined
            };
        },
        markup: function(){
            if(!this.$el.hasClass(this.options.radioBtnGroupClassName)){
                this.$el.addClass(this.options.radioBtnGroupClassName);
            }
            this.radioGroup = this.$el
                .find('['+this.options.radioValueAttrName+']')
                .addClass('uilib-text')
                .addClass(this.options.radioBtnClassName)
                .addClass(this.options.inline ? 'uilib-inline' : '')
                .prepend('<span class="'+ this.options.checkClassName +'"></span>');

        },
        bindEvents: function () {
            var radio = this;
            this.$el.on('click', '.'+this.options.radioBtnClassName, function (e) {
                radio.checkRadio($(this));
            });
        },
        getValue: function () {
            var $el = this.$el.find('.' + this.options.checkedClassName);
            return {
                value : $el.attr(this.options.radioValueAttrName),
                index : this.radioGroup.index($el)
            };
        },
        setValue: function (value) {
            var $el;
            if(typeof value === 'object'){
                value = value.index;
            }
            if(typeof value === 'string'){
                $el = this.$el.find('['+ this.options.radioValueAttrName +'="'+ value +'"]').eq(0);
            } else if (+value >= 0) {
                $el = this.radioGroup.eq(+value);
            }
            $el.length && this.checkRadio($el, true);
        },
        checkRadio: function ($el, silent) {
            if ($el.hasClass(this.options.checkedClassName)) { return; }
            this.radioGroup.removeClass(this.options.checkedClassName);
            $el.addClass(this.options.checkedClassName);
            if(!silent){
				this.triggerChangeEvent(this.getValue())
            }
        }
    };

});