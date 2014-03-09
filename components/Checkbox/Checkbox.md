# Checkbox
<!-- Checkbox -->

Checkbox component, mimic native HTML checkbox by applying Wix style.

### Example

<div wix-model="preChecked" wix-ctrl="Checkbox" wix-options="{preLabel:'Check me...', checked:true}"></div>
<div wix-model="checkMe" wix-ctrl="Checkbox"></div>

### Markup
```html
<div wix-model="preChecked" wix-ctrl="Checkbox" wix-options="{preLabel:'Check me...', checked:true}"></div>
<div wix-model="checkMe" wix-ctrl="Checkbox"></div>
```

### Options

Name         | Default | Description
-------------|---------|------------
checked      | `false` | the checkbox checked value
preLabel     | ``      | a preceding label/text
postLabel    | ``      | a postfix label/text