jQuery.fn.definePlugin('Input', function ($) {
    'use strict';

    var classNames = {
        inputClass: 'uilib-input',
        validInputClass: 'valid-input',
        invalidInputClass: 'invalid-input',
        disabledClass:'disabled',
        largeClass: 'large',
        mediumClass: 'medium',
        xLargeClass: 'x-large',
        bigClass: 'big'

    };

    return {
        init: function(){
            this.markup();
            this.setValue(this.options.value);
            this.bindEvents();
        },
        setValidationFunction:function(validationFunction){
            if(typeof validationFunction === 'function'){
                this.options.validate = true;
                this.options.validation = validationFunction;
            } else {
                throw new Error('You must provide a valid validation function.');
            }
        },
        getDefaults: function(){
            return {
                value:'',
                validate: false,
                required: false,
                type: 'text',
                placeholder: 'Text input',
                disabled : false,
                size: 'default',
                validation: function(){
                    return true;
                }
            };
        },
        markup: function () {
            this.$input = $('<input>').attr('type', this.options.type).attr('placeholder', this.options.placeholder).addClass(classNames.inputClass);
            if (this.options.disabled){
                this.disable();
            }
            switch (this.options.size) {
                case 'large':
                    this.$input.addClass(classNames.largeClass);
                    break;
                case 'medium':
                    this.$input.addClass(classNames.mediumClass);
                    break;
                case 'x-large':
                    this.$input.addClass(classNames.xLargeClass);
                    break;
                case 'big':
                    this.$input.addClass(classNames.bigClass);
                    break;
            }

            this.$el.append(this.$input);
        },
        bindEvents: function () {
            var input = this;
            input.$input.on('blur', function(){
                input.setValue(input.$input.val());
                input.triggerChangeEvent(input.getValue());
            });
            input.$input.on('keyup',function(){
                input.setValue(input.$input.val());
            });
        },
        getValue: function () {
            return this.value;
        },
        setValue: function (value) {
            var isPassRequiredValidation = this.options.required ? !!value.length : true;
            var isDifferentValue = (this.$input.val() !== this.value || value !== this.value);
            if(isPassRequiredValidation && this.options.validation(value) && isDifferentValue && this.$input[0].checkValidity()){
                if(this.options.type == 'number' && !isNaN(parseFloat(value)) && isFinite(value)){
                    value = Math.round(value);
                }
                this.lastValue = this.getValue();
                if (value !== this.$input.val()) {
                    this.$input.val(value);
                }
                this.value = value;
                if(this.options.validate || this.options.validation(value)){
                    this.$input.removeClass(classNames.invalidInputClass).addClass(classNames.validInputClass);
                }
            } else if(this.$input.val() !== this.value || this.options.type == 'number'){
                this.value = '';
                if((this.options.validate && (this.$input.val() !== '')) || !this.$input[0].checkValidity()){
                    this.$input.removeClass(classNames.validInputClass).addClass(classNames.invalidInputClass);
                }
                else {
                    this.$input.removeClass(classNames.invalidInputClass);
                }
            }
            else if (this.$input.val() === '' && this.$input[0].checkValidity()){
                this.$input.removeClass(classNames.invalidInputClass);
            }

        },
        disable: function () {
            this.$input.addClass(classNames.disabledClass);
            this.$input.attr('disabled', 'disabled');
        },
        enable: function () {
            this.$input.removeClass(classNames.disabledClass);
            this.$input.removeAttr('disabled', 'disabled');
        },
        isDisabled: function () {
            return this.$input.hasClass(classNames.disabledClass);
        }
    };

});
