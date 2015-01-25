## UI Lib for Dashboard Apps
<!-- UILibForBusinessApps -->

The Wix UI Lib for Dashboard Apps includes customized CSS components to be used in the user dashboard.

This library is a part of the Starter Kit for Wix 3rd Party Applications. 


### HTML file Setup for Dashboard Apps

Include the minified UI-Lib Dashboard CSS file in your application's HTML along with the Wix SDK.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="./ui-lib-dashboard.min.css"></link>
    </head>
    <body>
        <script type="text/javascript" src="//sslstatic.wix.com/services/js-sdk/1.42.0/js/wix.min.js"></script>
    </body>
</html>
```

You can then reference the Upgrade button in your HTML

```html
<button class="uilib-btn btn-upgrade"></button>
```

For more information [check out the Buttons section in the UI-Lib docs](http://wix.github.io/wix-ui-lib/#Buttons-entry)
