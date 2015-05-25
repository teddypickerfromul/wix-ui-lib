jQuery.fn.definePlugin('LanguagePicker', function () {
    'use strict';

    var styles = {
        className: 'uilib-languagePicker'
    };

    var symbToName = {
        'En': 'English',
        'Da': 'Dansk',
        'De': 'Deutsch',
        'Es': 'Español',
        'Fr': 'Français',
        'It': 'Italiano',
        'Nl': 'Nederlands',
        'No': 'Norsk',
        'Pl': 'Polski',
        'Pt': 'Português',
        'Ru': 'Русский',
        'Sv': 'Svenska',
        'Ja': '日本語',
        'Ko': '한국어',
        'Tr': 'Türkçe',
        'He': 'עברית'
    };

    return {
        init: function () {
            this.markup();
            if (symbToName[this.options.selectedLanguage]) {
                this.setValue(this.options.selectedLanguage);
            }
            this.bindEvents();
        },
        markup: function () {
            var $options = _optionsHtml(this.options.languages);
            this.$el.append($options);
            var height = this.options.height;

            if (this.options.height === 'auto') {
                var m = $options.length % 2;
                height = $options.length <= 4 ? $options.length * 26 : ($options.length - m) / 2 * 26;
            }

            this.dropdown = this.$el.Dropdown({
                width: 62,
                height: height,
                optionsWidth: 105,
                modifier: function ($el) {
                    var $globe = $("<span class='globe'></span>");
                    $el.text($el.attr('data-value'));
                    $el.prepend($globe);
                    return $el;
                }
            }).data('plugin_Dropdown');

            if (!this.$el.hasClass(styles.className)) {
                this.$el.addClass(styles.className);
            }
        },
        bindEvents: function () {
            var languagePicker = this;
            this.$el.on('Dropdown.change', function (evt, data) {
                evt.stopPropagation();
                languagePicker.triggerChangeEvent(languagePicker.getValue());
            });
        },
        getDefaults: function () {
            return {
                languages: ['En', 'Da', 'De', 'Es', 'Fr', 'It', 'Nl', 'No', 'Pl', 'Pt', 'Ru', 'Sv', 'Ja', 'Ko', 'Tr', 'He'],
                height: 'auto'
            };
        },
        getValue: function () {
            return this.dropdown.getFullValue();
        },
        setValue: function (value) {
            return this.dropdown.setValue(value);
        }
    };

    function _optionsHtml(langs) {
        return $(langs.map(function (symb) {
            return '<div value="' + symb + '">' + symbToName[symb] + '</div>';
        }).join(''));
    }
});