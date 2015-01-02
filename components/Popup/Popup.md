# Popup
<!-- Popup -->

Popup component.

### Example

<button class="uilib-btn btn-secondary" id="popupAnchorBtn">Open Popup</button>
<button class="uilib-btn btn-secondary" id="modalAnchorBtn">Open Modal</button>

<script>

var popup = Wix.UI.create({ctrl: 'Popup',
                        options: { buttonSet: 'okCancel', fixed:true}});

var modal = Wix.UI.create({ctrl: 'Popup',
                        options: {
                             modal:true,
                             buttonSet: 'okCancel',
                             fixed:true,
                             title:'Modal'
                         }});

$('#popupAnchorBtn').on('click', function(evt){
    evt.stopPropagation();
    popup.getCtrl().open();
});

$('#modalAnchorBtn').on('click', function(evt){
    evt.stopPropagation();
    modal.getCtrl().open();
});

</script>

### HTML
```html
<button class="uilib-btn btn-secondary" id="popupAnchorBtn">Open Popup</button>
<button class="uilib-btn btn-secondary" id="modalAnchorBtn">Open Modal</button>
```

### JS

```javascript
var popup = Wix.UI.create({ctrl: 'Popup',
                        options: {buttonSet: 'okCancel', fixed:true}});
	
var modal = Wix.UI.create({ctrl: 'Popup',
                        options: {
                             modal:true,
                             buttonSet: 'okCancel',
                             fixed:true,
                             title:'Modal'
                         }});
	
$('#popupAnchorBtn').on('click', function(evt){
    evt.stopPropagation();
    popup.getCtrl().open();
});
	
$('#modalAnchorBtn').on('click', function(evt){
    evt.stopPropagation();
    modal.getCtrl().open();
});
```

### Options

Name            | Default           | Description
----------------|-------------------|------------
appendTo        | `body`            | HTML element to append the popup to
title           | `Popup`           | popup text title
content         | ``                | inner content
footer          | ``                | footer content
modal           | `false`           | modal indication
modalBackground | `rgba(0,0,0,0.5)` | background color for the popup
height          | `auto`            | popup height in pixels
width           | `300`             | popup width in pixels
onclose         | `function(){}`  | on close callback function
oncancel        | `function(){}`   | on cancel callback function
onopen          | `function(){}`   | on open callback function
onposition      | `function(){}`    | on position callback function