### Get component controller instance dynamically
<!-- WixCustomHTMLAttributes-GetComponentControllerInstanceDynamically -->

```javascript
//get the plugin instance from jQuery element
var pluginInstance = jQueryElement.getCtrl();
var pluginInstance = $('#myElement').getCtrl();
```

#### Dynamic component destruction

when you need to remove a component form the page to avoid memeory leaks use **Wix.UI.destroyPlugin**
```javascript
//destroy the component and remove all listeners
Wix.UI.destroy($('#myElement'));

//destroy the component, remove all listeners and delete the model key
Wix.UI.destroy($('#myElement'), true);
```