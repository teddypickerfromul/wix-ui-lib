# Color Picker with Opacity
<!-- ColorPickerWithOpacity -->

Color Picker with opacity component, provide Wix style color selection with a 5x5 grid palette. Five main colors in the middle plus two brighter colors and two darker colors in each direction. These colors are defined according to the color palette of Wix user that added your App. In addition a custom style selector is available.

**Note that the selected value will be saved inside the Wix site, there is no need to listen to an onChange event.**

For an explanation on how to choose the default color and how the Wix color Palette works please refer to this [link](http://dev.wix.com/docs/display/DRAF/Color+Selection+Guide).

### Example

<div wix-param="colorWOpacity" wix-ctrl="ColorPickerWithOpacity" wix-options="{startWithColor: 'color-3', startWithOpacity:90}"></div>

### Markup
```html
<div wix-param="colorWOpacity" wix-ctrl="ColorPickerWithOpacity" wix-options="{startWithColor: 'color-3', startWithOpacity:90}"></div>
```

### Options

Name             | Default   | Description
-------------    |---------- |------------
startWithColor   | `color-1` | initial color to show
startWithOpacity |    100    | initial opacity to show
