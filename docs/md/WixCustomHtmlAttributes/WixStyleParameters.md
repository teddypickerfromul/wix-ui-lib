### Wix Style Parameters
<!-- WixCustomHTMLAttributes-WixStyleParameters -->

Wix Style parameters, which replace the wix-model parameters, allow an app developer to save specific keys inside the Wix Site. Meaning, they do not need to be saved in the App's database like  wix-model parameters. **Wix.UI** takes care of saving it inside the site using the Wix SDK.

You can use the `wix-param` attribute on supported components. Currently Wix supports the following Components for wix-param:

#### Color Parameters Components
- ColorPicker
- ColorPickerWithOpacity

#### Number Parameters Components
- ButtonGroup
- RadioButton
- Dropdown
- Slider

#### Boolean Parameters Components
- Checkbox

#### Font Parameters Components
- FontPicker
- FontStylePicker

**wix-param** attribute sets the key of the style parameter.

Color Picker component:

```html
<div wix-param="myParam" wix-ctrl="ColorPickerWithOpacity"></div>
```

Font Picker component:

```html
<div wix-param="myFont" wix-ctrl="FontStylePicker"></div>
```

wix-param can also be consumed inside the App's Widget/Page. You can use **Wix SDK** to get all the style parameters that were set in the App's Settings.
```javascript
Wix.Styles.getStyleParams(function(styleParams) {
    //styleParams is a map with all style values
    //{colors:{}, numbers:{}, booleans:{}, fonts:{}}
    //which were configured by the user.
});
```