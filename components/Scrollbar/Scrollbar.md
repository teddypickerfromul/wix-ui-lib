# Scrollbar
<!-- Scrollbar -->

Scrollbar, mimic native html scrollbars with Wix style and behaviour across all supported browsers

### Example

<div class="box" wix-scroll="{height:150}">
	<p style="height:600px;background:rgba(255,255,255,0.7)">Content</p>
</div>
<div class="box" wix-ctrl="Scrollbar" wix-options="{height:150}">
	<p style="height:600px;background:rgba(255,255,255,0.7)">Content</p>
</div>

### Markup
```html
<div class="box" wix-scroll="{height:150}">
	<p style="height:600px;background:rgba(255,255,255,0.7)">Content</p>
</div>	
<div class="box" wix-ctrl="Scrollbar" wix-options="{height:150}">
	<p style="height:600px;background:rgba(255,255,255,0.7)">Content</p>
</div>
```

### Options

Name         | Default  | Description
-------------|----------|------------
width        | `auto`   | the scrollbar width
height       | `250px`  | height in pixels of the visible scroll area
position     | `right`  | scrollbar position - left/right
railVisible  | `true`   | whether to show the scroll rail
