# UI Library 2.0 - Starter Kit for Wix 3rd Party Apps

## About
This project is aimed at helping developers in the process of getting new apps to <a href="http://dev.wix.com" target="_blank">Wix Dev Center</a> as quickly as possible. The UI in this project focuses on the App's Settings Panel. The boilerplate offers UI standards and common Javascript components to assist the developer in passing Product tests, and in developing a consistent and uniformed UI for the app.

##### Click here for <a href="http://wix.github.com/wix-ui-lib" target="_blank">demo</a> and documentation.

## Overview
Wix UI Library is a extension of the Wix SDK. It provides common CSS, HTML and JS Components which follow Wix product guide for Apps. Wix UI library will deploy itself as a sub namespace of the Wix SDK as Wix.UI.

### Dependencies

Wix UI lib dependencies is jQuery from version 1.9.0 and Wix SDK from version 1.22.0

### Usage

To get started, include the minified JS and CSS files in your App Settings HTML. Also add the `wix-ui` attribute on the body element, this will hide the document until **Wix.UI.initialize** will be called.

    <!doctype html>
    <html>
        <head>
            <link rel="stylesheet" href="./ui-lib.min.css"></link>
        </head>
        <body wix-ui>
            <!-- your settings -->

            <script src="http://sslstatic.wix.com/services/js-sdk/1.22.0/js/Wix.js"></script>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
            <script src="ui-lib.min.js"></script>
        </body>
    </html>


### App Intro

First, make an introduction. *This is compulsory according to Wix Apps product style guide.*

This following markup is for the app intro, description and login panel. 
it will be automatically styled by the UI library.
The login panel is used for connecting your user to his account in your app.

###### HTML
    <header class="box">
    	<div class="logo">
			<img width="86" src="images/wix_icon.png" alt="logo"/>
		</div>
		<div class="logedOut">
			<p><!-- App Description --></p>
			<div class="login-panel"><!-- App login panel --></div>
		</div>
		<div class="logedIn hidden">
            <!-- App Loged in information -->
			<div class="premium-panel"><!-- Premium features --></div>
		</div>
	</header>

You can simply change the img source to your logo

###### HTML
	<div class="logo">
		<img width="86" src="images/wix_icon.png" alt="logo"/>
	</div>
	

### Authentication

Once your app is running, an **authenticated user mode** should come in handy. 
use the `.loggedOut`, `.loggedIn` areas to put the authentication logic there. Switch the `.hidden` class between the two to accompany each of these state in the app, respectively.

Guests will see **Description**, a **Connect Button**, and a **Text Link** for creating a new account. 

###### Logged out User
	<div class="loggedOut">
    	<p><!-- App Description --></p>
    	<div class="login-panel">
        	<p class="create-account">Don't have an<br/>account? <a href="#"><strong>Create one</strong></a></p>
        	<button class="submit btn connect">Connect account</button>
    	</div>
	</div>

Authenticated users will see the details of their **Session Details** (User name, e-mail etc) and a **Link** for disconnecting the session.

Premium panel is used when a user is logged in to your app and you want to offer premium features.

###### Logged in User	
	<div class="loggedIn hidden">
    	<p>
            You are now connected to 
            <strong>John Doe (john@doe.com)</strong>account
            <br/>
	        <a class="disconnect-account">Disconnect account</a>
	    </p>
    	<div class="premium-panel">
        	<p class="premium-features">Premium features</p>
        	<button class="submit btn upgrade">Upgrade</button>
    	</div>
  	</div>

If this is irrelevant to your project, simply remove this markup.

## CSS Styleing

#### Box (Container)
Box is the basic container for Wix 3rd Party Settings panel. Boxes are for grouped controls or information blocks. Use them as you like.

    <div class="box">
		<!-- Box content goes here -->
    </div>

#### List

To group different controls in vertical view, you can use the `.list` class and structure.
This is a simple list with the proper CSS styling to contain all the HTML and JS components offered in the **Wix.UI** and present them in a neat horizontal row.

**wix-label** attribute sets the label before the list item content.

    <ul class="list">
        <li wix-label="Text Color:"></li>
        <li wix-label="Background Color:"></li>
    </ul>

## Javascript Components

The **Wix.UI** Javascript components are basically a set of [jQuery][jquery] Plugins.

[jquery]: http://jquery.com/

### Specil HTML attributes
Wix UI library includes custom attributes which enable components initilization from within the HTML markup.

**wix-ctrl -** component's controller decleration

**wix-options -** component initilization

**wix-param -** sets the key of the style parameter.

**wix-model -** sets a key to access the component value from Wix.UI and subscribe to change events.

All attributes can be prefixed with **data-** to be W3C complient (Optional). 

###Initialization

There are 2 ways to initialize the components 

* initialize with markup (prefered)
* initialize with javascript (advance)


#### Initialize with markup


Each component can be initialized with a simple markup and two important attributes
`wix-ctrl` and `wix-options`

**wix-ctrl - ** Sets the component`s controller that will be conected to the element.

**wix-options - ** Sets the component`s controller options.

In this way all the Javascript component are managed by the **Wix.UI** library. To initialize the components you need to call **Wix.UI.initialize()** then all the components that has `wix-ctrl` attribute will be initialized with the options that you entered to the `wix-option` attribute and the settings window will be visible.

    <div wix-ctrl="ComponentName" wix-options="{Options}"></div>

All the **Wix.UI** components should be initialized after the DOM is ready.
    
    $( document ).ready(function(){
        
        Wix.UI.initialize();
        
    });

#### Initialize with javascript (advance)

In this way you need to subscribe to chages and set values directly on the jQuery plugin.

    $('#myElement').PluginName(options);
    

###Model

In order to set/get component values, you can add a `wix-model` attribute to the component markup this will bind them to the **Wix.UI** model.

**wix-model** attribute sets a key to access the component value from Wix.UI and subscribe to change events.

Then you will be able to use the **Wix.UI.set(key, value)** or **Wix.UI.get(key)** to update the component state and retrive the component value.
    
    <div wix-model="myKey" wix-ctrl="ComponentName" wix-options="{option: 'value'}"></div>

Components that has `wix-model` attribute can be initialized with default values or values that retrieved from your server.

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
            
        });
    </script>
    ...
    
####Subscribe to model change events

You can subscribe to chages in the wix-model with the following code:

    //subscribe to one key change
    Wix.UI.onChange('myKey', function(value, key){
        //do some awesome stuff with the value
    });
    
    //subscribe to changes in all keys
    Wix.UI.onChange('*', function(value, key){
        //do some awesome stuff with the value
    });
    
#### Save Wix.UI Model

When you want to save the state of your components you can simply call the toJSON function on the **Wix.UI** to get it's current state. This saved json representation can be later used to (re)initialize the **Wix.UI**. E.g. you can save it in your database and read on next invocations of the App Settings.

    var componentsValues = Wix.UI.toJSON();

######jQuery Example

    var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();
    
    function saveSettings(){
        $.post('save.php?id=' + widgetId, Wix.Ui.toJSON());
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


###Style Parameters

Wix Style parameters, which replace the wix-model parameters, allow an app developer to save specfifc keys inside the Wix Site. Meaning, they do not need to be saved in the App's database, like  wix-model parameters. **Wix.UI** takes care of saving it inside the site using the Wix SDK.

You can use the `wix-param` attribute on supported components. Currently Wix supports the following Components for wix-param:
- ColorPicker
- ColorPickerWithOpacity

**wix-param** attribute sets the key of the style parameter.

    <div wix-param="myParam" wix-ctrl="ColorPickerWithOpacity"></div>

wix-pram can also be consumed inside the App's Widget/Page. You can use **Wix SDK** to get all the style parameters that were set in the App's Settings.
    
    var styleParams = Wix.getStyleParams(); // returns a map with all styles values

###Style paramerters in a CSS stylesheet

You can use the color style parameters inside a inline CSS style within your widget, its a simple template engine that uses {{value}} to interpolate the style parameters. In order to activate it put `wix-style` attribute on an inline style.

    <style wix-style>
        #myElement {
            background-color: {{style.myParam}}; /* style parameter */
            color: {{color-1}}; /* style from the template */
        }
    </style>
    
Color style parameters can use reserved theme colors in the stylesheet using the following refrenecs:

* white/black - primary white, black if the site theme is invereted
* black/white - primary black, white if the site theme is invereted
* primery-1 - defaults to red
* primery-2 - defaults to blue
* primery-3 - defaults to yellow
* color-1 to color-25 - pallete colors


### Wix.UI Components

- Accordion
- ButtonGroup
- Checkbox
- ColorPicker
- ColorPickerWithOpacity
- Dropdown
- RadioButton
- Slider
- Fixed Positioning Control


#### Accordion

	<div wix-ctrl="Accordion">
	    <div class="acc-pane">
            <h3><!-- Title --></h3>
	        <div class="acc-content">
	        	<!-- content goes here -->
	        </div>
	    </div>
	</div>

#### ColorPicker

    <div wix-ctrl="ColorPicker"></div>
    
#### Color picker with stlye parameter

    <div wix-param="myColor" wix-ctrl="ColorPicker"></div>
    
#### ColorPickerWithOpacity

    <div wix-ctrl="ColorPickerWithOpacity"></div>
    
#### Color picker with opacity with stlye parameter

    <div wix-param="myColor" wix-ctrl="ColorPickerWithOpacity"></div>


#### Radio Button

	<div wix-ctrl="Radio">
		<div data-radio-value="value-1">Option 1</div>
		<div data-radio-value="value-2">Option 2</div>
		<div data-radio-value="value-3">Option 3</div>
	</div>

#### Checkbox

Add the following HTML Markup

    <div wix-ctrl="Checkbox"></div>

#### Slider

    <div wix-ctrl="Slider"></div>

#### Dropdown

    <div wix-ctrl="Dropdown">
		<option value="value-1">Option A</option>
		<option value="value-2">Option B</option>
		<option value="value-3">Option C</option>
	</div>
    

#### Fixed Positioning Control

    <div wix-ctrl="GluedControl"></div>

## License

Copyright (c) 2012 Wix.com, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
