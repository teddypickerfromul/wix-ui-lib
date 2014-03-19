jQuery.fn.definePlugin('FontStylePicker', function () {
	'use strict';

	var names = {
		fontStylePickerClass: 'font-style-picker',
		presetSelectClass:'font-style-picker-preset-select',
		fontPickerClass: 'font-style-picker-font-picker',
		fontSizeClass: 'font-style-picker-font-size',
		textStyleClass: 'font-style-picker-text-style' 
	};

    var defaultFontDisplayName = 'Arial';
    var defaultFont = 'arial';
    var customFont= 'Custom';

    var boxLikeDrop = '<div class="box-like-drop"><span class="box-like-drop-content">Font Picker</span><span class="box-like-arrow box-like-arrow-down"></span></div>';


    var contentMarkup = '<div class="uilib-divider-row"><span class="font-picker-label">Style:</span><span class="style-place-holder"></span></div>';
        contentMarkup += '<div class="uilib-divider-row"><span class="font-picker-label">Font:</span><span class="font-place-holder"></span></div>';
        contentMarkup += '<div class="uilib-divider-row"><span class="font-picker-label"> </span><span class="props-place-holder"></span></div>';

    var textStyleHtml = '';
    textStyleHtml += '<button value="bold" class="grad-1" style="font-family: serif;font-weight: bold;">B</button>';
    textStyleHtml += '<button value="italic" class="grad-1" style="font-family: serif;font-style: italic;">I</button>';
    textStyleHtml += '<button value="underline" class="grad-1" style="font-family: serif;text-decoration: underline;">U</button>';

    return {
		init : function () {
			this.isParamMode = this.getParamKey();
			this.currentValue = null;
			this.popup = null;
			this.fontSizePicker = null;
			this.textStylePicker = null;
			this.fontPicker = null;
			this.presetSelectPicker = null;
            this.customVal = {};
			this.markup();
            this.setValue(this.options.value);
			this.bindEvents();
		},
		getDefaults : function () {
			return {
				value: 'Body-L'
			};
		},
		markup : function () {
			this.$el.html(boxLikeDrop);
			this.$el.addClass(names.fontStylePickerClass);
			
			this.createPopup();
			this.createFontPicker();
			this.createTextStylePicker();
			this.createFontSizePicker();
            this.createPresetPicker();

			this.popup.content.innerHTML = contentMarkup;
			
			$(this.popup.content).find('.style-place-holder').append(
				this.presetSelectPicker.$el.addClass(names.presetSelectClass)
			);
			
			$(this.popup.content).find('.font-place-holder').append(
				this.fontPicker.$el.addClass(names.fontPickerClass)
			);
			
			$(this.popup.content).find('.props-place-holder').append(
				this.fontSizePicker.$el.addClass(names.fontSizeClass),
				this.textStylePicker.$el.addClass(names.textStyleClass)
			);
			
			//this.popup.open();			
		},
		createFontSizePicker: function(){
			this.fontSizePicker = this.UI().create({
				ctrl: 'Spinner',
				options: {
					size : 'medium'
				},
				appendTo: this.$el
			}).getCtrl();
		},
		createTextStylePicker: function(){
			this.textStylePicker = this.UI().create({
				ctrl: 'ToggleButtonGroup',
				html: textStyleHtml,
				appendTo: this.$el
			}).getCtrl();
		},
		createFontPicker: function(){
			this.fontPicker = this.UI().create({
				ctrl: 'FontPicker',
				appendTo: this.$el
			}).getCtrl();
		},
		createPresetPicker: function(){
			var html = '';
			var that = this;
			var presets = this.getSiteTextPresets();

            Object.keys(presets).sort().forEach(function(presetName){

                var styleFont = that.getStyleFontByReference(presetName) ;
                var font = (styleFont && styleFont.fontFamily) || defaultFont;
                var fontSize = (styleFont && styleFont.size) || '12px';
                var styleCss = ' style="font-family:' + font +'"';
                html += that.createStyleHtmlMarkup(presetName, presetName.replace(/-/g,' '), font, fontSize, styleCss, "");
			});

            // Add the custom font
            html += this.createCustomMarkup();

			this.presetSelectPicker = this.UI().create({
				ctrl: 'Dropdown',
				appendTo: this.$el,
				html: html,
				options:{
					width : 265,
					height : 260,
					value: 1,
					modifier: function($el, $original){

                        // Remove the description of the font style
                        var modifierHtml = that.createSelectedStyleHtmlMarkup($el);
                        $el.html(modifierHtml);
						return $el;
					}
				}
			}).getCtrl();		
			
		},
        createCustomMarkup: function(){
            var fontFamily = (this.fontPicker && this.fontPicker.getValue() && this.fontPicker.getValue().value) || defaultFont;
            var textStyle = (this.textStylePicker && this.textStylePicker.getValue() && this.textStylePicker.getValue()) || {bold : false, italic : false, underline: false};
            var fontSize = (this.fontSizePicker && this.fontSizePicker.getValue()) || 12;

            var textStyleCss = textStyle.bold ? '; font-weight: bold': "";
            textStyleCss += textStyle.italic ? '; font-style: italic': "";
            textStyleCss += textStyle.underline ? '; text-decoration: underline' : "";

            var customStyleCss = ' style="font-family: ' + fontFamily + textStyleCss + '"';

            this.customVal = { size: fontSize, family: fontFamily, preset: customFont, style: textStyle};

            return this.createStyleHtmlMarkup(customFont, customFont, fontFamily, fontSize, customStyleCss, " custom");
        },
        createStyleHtmlMarkup: function(styleName, styleDisplayName, fontFamily, fontSize, styleCss, customClass){
            var fontDisplayName = this.getFontDisplayName(fontFamily) || defaultFontDisplayName;

            return  ('<div data-append-children="true" value="'+ styleName + '" class="font-style-option' + customClass +'" >' +
                        '<div' + styleCss + ' class="font">'+styleDisplayName+'</div>' +
                        '<div class="description">' +
                            '<div class="font-description">' + fontDisplayName + '</div>' +
                            '<div> , ' + fontSize + '</div>' +
                        '</div>' +
                    '</div>');
        },
        createSelectedStyleHtmlMarkup: function(el){
            var value = el.attr('data-value');
            var displayName = (value == customFont? customFont : value.replace(/-/g,' '));
            return  ('<div value="' + value + '">' + displayName + '</div>');
        },
		createPopup: function(){
			var that = this;
			this.popup = this.UI().create({
				ctrl: 'Popup',
				options: {
					appendTo: this.$el,
					title : 'Font Settings',
					content : '',
					footer:'',
					buttonSet: 'okCancel',
					modal : false,
					modalBackground : 'rgba(0,0,0,0.5)',
					height : 'auto',
					width : 287,
                    fixed: true,
					onopen: function(){
						that.$el.append(this.arrow);
						that.currentValue = that.getValue();
					},
					onclose : function (evt) {
						that.updateText();
					},
					oncancel: function(evt) {
						that.setValue(that.currentValue);
						that.triggerChangeEvent(that.getValue());
					},
					onposition: function(){}
				}
			}).getCtrl();
			
			this.popup.setRelativeElement(that.$el.find('.box-like-drop')[0]);
		
		},
		hideArrow:function(){
			$(this.popup.arrow).hide(50);
		},
		showArrow: function(){
			$(this.popup.arrow).show(50);
		},
		bindEvents : function () {
			var that = this;
			this.$el.on('click', '.box-like-drop',function(evt){
				evt.stopPropagation();
				that.popup.toggle();
			});
			this.registerToChangeEventAndDelegate(this.fontSizePicker, this);
			this.registerToChangeEventAndDelegate(this.textStylePicker, this);
			this.registerToChangeEventAndDelegate(this.fontPicker, this);
			this.registerToChangeEventAndDelegate(this.presetSelectPicker, this);
			
			this.$el.on('uilib-dropdown-close', function(evt, plugin){
				if(plugin.isOpen && $(that.popup.arrow).hasClass('popup-arrow-top')){
                    setTimeout(function(){
					    that.showArrow();
                    },50);
				}
			});
			this.$el.on('uilib-dropdown-open', function(evt, plugin){
				if($(that.popup.arrow).hasClass('popup-arrow-top')){
					that.hideArrow();
				}
			});
			
			this.whenDestroy(function(){
				this.fontSizePicker.destroy();
				this.textStylePicker.destroy();
				this.fontPicker.destroy();
				this.presetSelectPicker.destroy();
			});
		},
        getSiteTextPresets: function(){
            var defaultTextPresets = {"Title":{"editorKey":"font_0","lineHeight":"1.1em","style":"normal","weight":"bold","size":"35px","fontFamily":"arial black","value":"font: normal normal bold 35px/1.1em arial black,gadget,sans-serif ; color: #333333;"},"Menu":{"editorKey":"font_1","lineHeight":"1.2em","style":"normal","weight":"bold","size":"17px","fontFamily":"arial","value":"font: normal normal bold 17px/1.2em arial,helvetica,sans-serif ; color: #FFE899;"},"Page-title":{"editorKey":"font_2","lineHeight":"1.2em","style":"normal","weight":"bold","size":"50px","fontFamily":"arial","value":"font: normal normal bold 50px/1.2em arial,helvetica,sans-serif ; color: #133C2A;"},"Heading-XL":{"editorKey":"font_3","lineHeight":"1.2em","style":"normal","weight":"bold","size":"80px","fontFamily":"arial","value":"font: normal normal bold 80px/1.2em arial,helvetica,sans-serif ; color: #133C2A;"},"Heading-L":{"editorKey":"font_4","lineHeight":"1.2em","style":"normal","weight":"bold","size":"50px","fontFamily":"arial","value":"font: normal normal bold 50px/1.2em arial,helvetica,sans-serif ; color: #FFE899;"},"Heading-M":{"editorKey":"font_5","lineHeight":"1.3em","style":"normal","weight":"normal","size":"25px","fontFamily":"arial","value":"font: normal normal normal 25px/1.3em arial,helvetica,sans-serif ; color: #EF6C6C;"},"Heading-S":{"editorKey":"font_6","lineHeight":"1.2em","style":"normal","weight":"normal","size":"18px","fontFamily":"arial","value":"font: normal normal normal 18px/1.2em arial,helvetica,sans-serif ; color: #EF6C6C;"},"Body-L":{"editorKey":"font_7","lineHeight":"1.2em","style":"normal","weight":"normal","size":"16px","fontFamily":"arial","value":"font: normal normal normal 16px/1.2em arial,helvetica,sans-serif ; color: #4D3613;"},"Body-M":{"editorKey":"font_8","lineHeight":"1.2em","style":"normal","weight":"normal","size":"14px","fontFamily":"arial","value":"font: normal normal normal 14px/1.2em arial,helvetica,sans-serif ; color: #4D3613;"},"Body-S":{"editorKey":"font_9","lineHeight":"1.2em","style":"normal","weight":"normal","size":"12px","fontFamily":"arial","value":"font: normal small-caps normal 12px/1.2em arial,helvetica,sans-serif ; color: #4D3613;"},"Body-XS":{"editorKey":"font_10","lineHeight":"1.2em","style":"normal","weight":"normal","size":"10px","fontFamily":"arial","value":"font: normal small-caps normal 10px/1.2em arial,helvetica,sans-serif ; color: #4D3613;"}};
            return ((Wix && Wix.Styles)? Wix.Styles.getSiteTextPresets() : defaultTextPresets) || defaultTextPresets;
        },

        // Get font display name
        getFontDisplayName: function(fontFamily){
            var textPresets = Wix.Styles && Wix.Styles.getSiteTextPresets();
            var editorFonts = Wix.Styles && Wix.Styles.getEditorFonts();

            if (Wix.Styles && textPresets && editorFonts){
                // Go over all editor fonts nad find the correct display name
                for (var index = 0; index < editorFonts.length; ++index){
                    var fonts = editorFonts[index].fonts;
                    for (var index2 = 0; index2 < fonts.length; ++index2) {
                        var findIndex = fonts[index2].cssFontFamily.indexOf(fontFamily);
                        if (findIndex >= 0){
                            return fonts[index2].displayName;
                        }
                    }
                }
            }

            return defaultFontDisplayName;
        },

        getTextPreset:function(presetName){
            var presets = this.getSiteTextPresets();
            var preset = presets[presetName];
            return preset;
        },
        getStyleFontByReference: function(fontReference){
            return (Wix && Wix.Styles)? Wix.Styles.getStyleFontByReference(fontReference) : {};
        },
		handlePluginPresetSelectChange: function(plugin, evt){
			var presets = this.getSiteTextPresets();
			var presetName = this.presetSelectPicker.getValue().value;
			var preset = presets[presetName];
			if(!preset){
                this.setValueFromCustom();
            } else {
                this.setValueFromPreset(presetName, preset);
            }
		},
		checkPresetAgainstState: function(preset, currentState){
			if(currentState.style.underline){
				return false;
			}
			var weight = currentState.style.bold ? 'bold' : 'normal';
			if(weight !== preset.weight){
				return false;
			}
			var style = currentState.style.italic ? 'italic' : 'normal';
			if(style !== preset.style){
				return false;
			}
			if(currentState.family !== preset.fontFamily){
				return false;
			}
			if(currentState.size !== parseInt(preset.size, 10)){
				return false;
			}
			return true;
		},
		getSimilarPresetName: function(){
			var presets = this.getSiteTextPresets();
			var currentState = this.getValue();
			for(var presetName in presets){
				if(presets.hasOwnProperty(presetName)){
					if(this.checkPresetAgainstState(presets[presetName], currentState)){
						return presetName;
					}
				}
			}
			return null;
		},
		handleNonPluginPresetSelectChange: function(plugin, evt){
			var presetName = this.getSimilarPresetName();
			if(presetName){
				this.presetSelectPicker.setValue(presetName);
			} else {

                // Update custom option in the dropdown list with the new selection of size, font family and text style
                this.updateCustomOption();
				this.presetSelectPicker.setValue(customFont);
			}
            this.updateText();
		},
        updateCustomOption : function() {
            if (this.presetSelectPicker){
                var dropdown = this.presetSelectPicker.$el;
                var dropdownOption = dropdown && this.presetSelectPicker.$el.find('.options');
                var customOption = dropdownOption  && dropdownOption.find('.custom');
                if (customOption){
                    customOption.html(this.createCustomMarkup());
                }
            }
        },
		innerChangeHandler: function(plugin, evt){
			if(plugin.$el.hasClass(names.presetSelectClass)){
				this.handlePluginPresetSelectChange(plugin, evt);
			} else {
				this.handleNonPluginPresetSelectChange(plugin, evt);
			}			
			this.triggerChangeEvent(this.getValue());
		},
		registerToChangeEventAndDelegate: function(plugin, ctx){
			plugin.$el.on(plugin.pluginName + '.change', function(evt){
				evt.stopPropagation();
				ctx.innerChangeHandler(plugin, evt);
			});
		},
		updateText: function(){
			var text = this.presetSelectPicker.getValue().value;
			this.$el.find('.box-like-drop-content').text(text);
		},
		getValue : function () {
			var family = this.fontPicker.getValue();
			var val = {
				size:   this.fontSizePicker.getValue(),
				style:  this.textStylePicker.getValue(),
				family: family.value,
				cssFontFamily : family.cssFontFamily,
				preset: this.presetSelectPicker.getValue().value
			};
			if(this.getParamKey()){
				val.fontStyleParam = true;
			}
			return val;
		},
        setValueFromPreset:function(presetName, preset){
            this.setValueWithKnownPreset({
                size: parseInt(preset.size, 10),
                family: preset.fontFamily,
                preset: presetName,
                style:  {
                    bold : preset.weight === 'bold',
                    italic : preset.style === 'italic',
                    underline: false
                }
            });
        },
        setValueFromCustom: function(){

            if(this.validateValue(this.customVal)){
                this.fontSizePicker.setValue(this.customVal.size);
                this.textStylePicker.setValue(this.customVal.style);
                this.fontPicker.setValue(this.customVal.family);
                this.updateText();
            }
        },
		validateValue: function(value){
			if(value && typeof value === 'object'){
				var isSizeValid = typeof value.size === 'number' || value.size instanceof Number;
				var isStyleValid = value.style && typeof value.style === 'object';
				var isFontFamilyValid = value.family && typeof value.family === 'string';
				var isPresetValid = value.preset && typeof value.preset === 'string';
				if(isSizeValid && isStyleValid && isFontFamilyValid && isPresetValid){
					return true;
				}
			}
			return false;
		},
        setValueWithKnownPreset:function(value){
			if(this.validateValue(value)){
				this.fontSizePicker.setValue(value.size);
				this.textStylePicker.setValue(value.style);
				this.fontPicker.setValue(value.family);
				this.presetSelectPicker.setValue(value.preset);
				this.updateText();
			} else {
				throw new Error('Unknown Preset ' + JSON.stringify(value,null,4));
			}
        },
		setValue : function (value) {
			if(typeof value === 'string'){ value = {preset: value}; }
            var preset = this.getTextPreset(value.preset);
            preset ? this.setValueFromPreset(value.preset, preset) : this.setValueWithKnownPreset(value);
		}
	};

});

