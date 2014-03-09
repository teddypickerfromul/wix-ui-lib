###Advance Usage
<!-- WixCustomHTMLAttributes-AdvanceUsage -->

#### Initialize with javascript

In this way you need to subscribe to changes and set values directly on the jQuery plugin.
```javascript
//create plugin on existing element
$('#myElement').PluginName(options);

//init Wix.UI bindings on an Wix ready element
var $el = $('<div wix-ctrl="ColorPicker" wix-model="myColor"
    wix-options="{startWithColor:\'#ffffff\'}">');

Wix.UI.initializePlugin($el);

//init Wix.UI bindings on an Wix ready element and override the options
Wix.UI.initializePlugin($('<div wix-ctrl="ColorPicker" wix-model="myColor">'), {
    startWithColor:'#ffffff'
});
```