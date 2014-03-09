# Font Style Picker
<!-- FontStylePicker -->

Font Style Picker component, control the selection of all relevant properties for a text field. The style list is based on the styles that are defined in the site of the Wix user that added your App.

- font style
- font family
- font size
- bold
- italic
- underline

**Note that the selected value will be saved inside the Wix site, there is no need to listen to an onChange event.**

For an explanation on how to choose the default text style and how the Wix Editor styles work please refer to this [link](http://dev.wix.com/docs/display/DRAF/Font+Selection+Guide).

### Example

<div wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>

### Markup
```html
<div wix-param="fontStyle" wix-ctrl="FontStylePicker"></div>
```

### Options

Name   | Default  | Description
-------|----------|------------
value  | `Body-L` | selected font family index in the list of available fonts