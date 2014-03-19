# Accordion
<!-- Accordion -->

Accordion component, displays expandable content panes for presenting information in a limited amount of space.
An accordion is divided to a vertical set of panes. By default only a single pane is opened.

### Example

<div wix-ctrl="Accordion">
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
</div>

### Markup
```html
<div wix-ctrl="Accordion">
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
	<div class="acc-pane">
		<h3>Accordion Pane</h3>
		<div class="acc-content">Accordion Content</div>
	</div>
</div>
```

### Options

Name            | Default   | Description
----------------|-----------|------------
animationTime   | `150`     | expand/collapse animation time in ms
ease            | `linear`  | easing function
toggleOpen      | `true`    | allow active pane to be toggled
value           | `0`       | opened pane at index

