### Initialization
<!-- WixCustomHTMLAttributes-Initialization -->

There are 2 ways to initialize the components:

* initialize with markup (prefered)
* initialize with javascript (advance)


#### Initialize with markup

Each component can be initialized with a simple markup and two important attributes
`wix-ctrl` and `wix-options`:
```html
<div wix-model="myKey" wix-ctrl="ComponentName" wix-options="{Options}"></div>
```

The **Wix.UI** library manages all components that were decalred through markup or created dynamically.  **Wix.UI.initialize()** must be called on DOM ready to start the compoenets creations process and to display the document body. The compoenets will get created with the options that were specified inside the markup using the `wix-option` attribute.

All the **Wix.UI** components should be initialized after the DOM is ready.
```javascript
$( document ).ready(function(){

    Wix.UI.initialize({});

});
```