### Dynamic creation of javascript components
<!-- WixCustomHTMLAttributes-DynamicCreationOfjavascriptComponents -->

```javascript
//create plugin and element that are connected to wix-param or wix-model
var jQueryElement = Wix.UI.create({
    id:'myElement', //DOM element id
    ctrl: 'ColorPicker', //wix-ctrl
    param: 'myColor', //wix-param
    model: false, //wix-model
    html: '', //initial innerHTML for the element
    appendTo: 'body', //appendTo selector
    options: { //wix-options
        startWithColor: '#ffffff'
    }
});
```