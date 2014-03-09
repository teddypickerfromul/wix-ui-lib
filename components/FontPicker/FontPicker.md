# Font Picker
<!-- FontPicker -->

Font picker component, control the selection of a font family for a text field. The fonts list is taken from the Wix site.

**Note that the selected value will be saved inside the Wix site, there is no need to listen to an onChange event.**

### Example

<div wix-param="fontFamily" wix-ctrl="FontPicker"></div>

### Markup
```html
    <div wix-param="fontFamily" wix-ctrl="FontPicker"></div>
```

### Options

Name   | Default  | Description
-------|----------|------------
value  | `0`      | selected font family index in the list of available fonts
