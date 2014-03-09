# Tooltip
<!-- Tooltip -->

Tooltip component, enables content annotation on hover.

### Example

<span wix-tooltip=" {placement:'top', text:'I am Hovered'}">Hover me</span>

<div wix-ctrl="Tooltip" wix-options="{placement:'right', text:'click me'}">
	<button class="uilib-btn connect">I have a tooltip!!!</button>
</div>

### Markup
```html
<div wix-tooltip=" {placement:'top', text:'I am Hovered'}">Hover me</div>

<div wix-ctrl="Tooltip" wix-options="{placement:'right', text:'click me'}">
	<button class="uilib-btn connect">I have a tooltip!!!</button>
</div>
```

### Options

Name      | Default           | Description
----------|-------------------|------------
placement | `top`             | tooltip placement `top`, `right`, `left` or `bottom`
text      | `tooltip content` | tooltip text
animation | `true`            | show tooltip with/out animation