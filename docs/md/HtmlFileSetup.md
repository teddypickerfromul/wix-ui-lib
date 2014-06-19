## HTML File Setup for App Settings
<!-- HTMLFileSetup -->

To get started, include the minified ui lib JS and CSS files in your App Settings HTML. Also add the `wix-ui` attribute on the body element, this will hide the document until **Wix.UI.initialize** will be called.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="./ui-lib.min.css"></link>
    </head>
    <body wix-ui>
        <header class="box">
            <div class="logo">
                <img width="86" src="images/wix_icon.png" alt="logo"/>
        	</div>
        	<div class="loggedOut">
        		<p><!-- App Description --></p>
        		<div class="login-panel"><!-- App login panel --></div>
        	</div>
        	<div class="loggedIn hidden">
                <!-- App Logged in information -->
        		<div class="premium-panel"><!-- Premium features --></div>
        	</div>
        </header>
        <!-- your settings -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script src="http://sslstatic.wix.com/services/js-sdk/1.31.0/js/Wix.js"></script>
        <script src="ui-lib.min.js"></script>
    </body>
</html>
```