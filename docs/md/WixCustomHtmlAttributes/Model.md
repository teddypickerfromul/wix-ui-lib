###Model
<!-- WixCustomHTMLAttributes-Model -->

In order to set/get component values, you should add a `wix-model` attribute to the component markup this will bind them to the **Wix.UI** model. This will allow using the **Wix.UI.set(key, value)** or **Wix.UI.get(key)** methods to update the component value and retrieve the component value.

```html
<div wix-model="myKey" wix-ctrl="ComponentName" wix-options="{option: 'value'}"></div>
```

Components that has `wix-model` attribute can be initialized with default values or values that retrieved from your server.
```html
...
<div wix-model="showTweets" wix-ctrl="Checkbox"></div>

<script>
    $( document ).ready(function(){

      Wix.UI.initialize({
          showTweets: true
      });

      Wix.UI.get('showTweets'); //returns true

      Wix.UI.set('showTweets', false);

      Wix.UI.get('showTweets'); //returns false

      Wix.UI.set('showTweets', false, true); //sets the value and not fire change event

    });
</script>
...
```
####Subscribe to model change events

You can subscribe to changes in the wix-model with the following code:
```javascript
//subscribe to one key change
Wix.UI.onChange('myKey', function(value, key){
    //do some awesome stuff with the value
});

//subscribe to changes in all keys
Wix.UI.onChange('*', function(value, key){
    //do some awesome stuff with the value
});
```
#### Save Wix.UI Model

When you want to save the state of your components you can simply call the toJSON function on the **Wix.UI** to get it's current state. This saved JSON representation can be later used to (re)initialize the **Wix.UI**. E.g. you can save it in your database and read on next invocations of the App Settings.
```javascript
var componentsValues = Wix.UI.toJSON();
```
######jQuery Example
```javascript
var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();

function saveSettings(){
    $.post('save.php?id=' + widgetId, Wix.UI.toJSON());
}

function loadSettings(){
    $.get('load.php?id=' + widgetId, function(data){
        Wix.UI.initialize(data);
    });
}

Wix.UI.onChange('*', function(){
    saveSettings();
});

$( document ).ready(function(){
    loadSettings();
});
```