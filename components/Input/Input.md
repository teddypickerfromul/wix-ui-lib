# Input
<!-- Input -->

Input component, mimic native HTML input element with Wix style and behaviour.
Input also can accept validation function.

### Example

<div wix-model="myText" wix-ctrl="Input"></div>

### Markup
```html
<div wix-model="myText" wix-ctrl="Input"></div>
```

### Example with validation

<div wix-model="mySmallNumber" wix-ctrl="Input" wix-options="{placeholder: 'Number input', type: 'number'}"></div>

### HTML
```html
<div wix-model="mySmallNumber" wix-ctrl="Input" wix-options="{placeholder: 'Number input', type: 'number'}"></div>
```

### JS
```js
    $("[wix-model='mySmallNumber']").getCtrl().setValidationFunction(function(value){
            return value < 100;
    });
```

### Options

Name        | Default   | Description
------------|-----------|------------
placeholder | ``        | text for the input placeholder
size        | `default` | input size options are `default`, `medium`, `large`, `x-large` and `big`
disabled    | `false`   | whether this text input is disabled
type        |  'text'   | type of the content to display, options are: 'text', 'number' and 'password'
