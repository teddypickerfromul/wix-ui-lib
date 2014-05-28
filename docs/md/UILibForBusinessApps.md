## UI Lib for Business Apps
<!-- UILibForBusinessApps -->

The Wix UI Lib for Business Apps includes customized CSS components to be used in the Dashboard context of the app.
A Business App is part of the “My Account” area of the Wix user’s site, where they can manage their site as well as grow and manage his business. 

This library is a part of the Starter Kit for Wix 3rd Party Applications. 


### Getting Started

Include the minified UI-Lib Dashboard CSS file in your application's HTML along with the Wix SDK.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="./ui-lib-dashboard.min.css"></link>
    </head>
    <body>
        <script src="http://sslstatic.wix.com/services/js-sdk/1.29.0/js/Wix.js"></script>
    </body>
</html>
```

You can then refrence the Upgrage button in your HTML

```html
<button class="uilib-btn btn-upgrade"></button>
```

For a [demo](http://wix.github.io/wix-ui-lib/#demo) and more information [check out the Buttons section in the UI-Lib docs](http://wix.github.io/wix-ui-lib/#components)
