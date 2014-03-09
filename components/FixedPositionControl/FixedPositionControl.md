# Fixed Position Control
<!-- FixedPositionControl -->

Fixed position control component, enables positioning of a Fixed Position widget in the Wix editor. This control is already synchronized with the Wix site there's no need for wis-model or wix-param.

### Example

<div wix-ctrl="FixedPositionControl"></div>

### Markup
```html
<div wix-ctrl="FixedPositionControl"></div>
```

### Options

Name         | Default                                                                                                                     | Description
-------------|-----------------------------------------------------------------------------------------------------------------------------|------------
placements   | `['TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'CENTER_LEFT', 'CENTER_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT']`    | Supported placements
bindToWidget | `true`                                                                                                                      | whether to attach this control data to a widget in the Wix editor