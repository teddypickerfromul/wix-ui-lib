# Toggle Button Group
<!-- ToggleButtonGroup -->

Toggle Button Group component, enables selection of multiple options through a group of horizontally ordered toggle buttons.

### Example

<div wix-model="size" wix-ctrl="ToggleButtonGroup" wix-options="{value: {mini:true, medium:true, large:false}}">
	<button value="mini">Mini</button>
	<button value="medium">Medium</button>
	<button value="large">Large</button>
</div>

### Markup
```html
<div wix-model="size" wix-ctrl="ToggleButtonGroup" wix-options="{value: {mini:true, medium:true, large:false}}">
	<button value="mini">Mini</button>
	<button value="medium">Medium</button>
	<button value="large">Large</button>
</div>
```

### Options

Name         | Default   | Description
-------------|-----------|------------
value        | `0`       | selected buttons for example: `{mini:true,medium:false,large:true}`