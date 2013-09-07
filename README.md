# UI Library: Starter Kit for Wix 3rd Party Apps


## About
This project is aimed at helping developers in the process of getting new apps to <a href="http://dev.wix.com" target="_blank">Wix Dev Center</a> as quickly as possible. The UI in this project focuses on the App's Settings Panel. The boilerplate offers UI standards and common Javascript components to assist the developer in passing Product tests, and in developing a consistent and uniformed UI for the app.

##### Click here for <a href="http://wix.github.com/wix-ui-lib" target="_blank">demo</a> and documentation.

## Structure & Standards

#### App Intro


First, make an introduction. *This is compulsry according to Wix Apps product style guide.*

###### HTML
    <div class="title">
    	<div class="icon">
        	<div class="logo">
          		<span class="gloss"></span>
            </div>
        </div>

        <div class="divider"></div>
    </div>

You can simply paste your app icon in the CSS `.logo` class:

###### CSS
	.intro .icon .logo {
	  border-radius: 15px;
	  height: 100%;
	  width: 100%;
	  background: url('../../images/wix_icon.png') center;
	}
	
Or, if you're using the precompiled Less sources, neatly nested in the `.intro` block, is the `.logo` class.

###### Less (precompiled)
	.intro {
	    .logo {
			// …
			background: url('@{images}/wix_icon.png') center;
	    }
	}


#### Guest & User

Once your app is running, an **authenticated user mode** should come in handy. Under the `.intro` block you'll find two sections: `.guest` and `.user`. Switch the `.hidden` class between the two to accompany each these state in the app, respectively.

Guests will see the **App Intro**, a **Connect Button**, and a **Text Link** for creating a new account. 

###### Guest
	<div class="guest">
    	<div class="description">
        	<p><!-- App Description --></p>
    	</div>

    	<div class="login-panel">
        	<p class="create-account">Don't have an<br/>account? <a href="#"><strong>Create one</strong></a></p>
        	<button class="submit btn connect">Connect account</button>
    	</div>
	</div>

Authenticated users will see the details of their **Session Details** (User name, e-mail etc) and a **Text Link** for disconnecting the session.

###### User	
	<div class="user hidden">
    	<p>
        	You are now connected to <strong class="user-name">John Doe (john@doe.com)</strong> account<br/>
	        <a class="disconnect-account">Disconnect account</a>
	    </p>
    	<div class="premium">
        	<p class="premium-features">Premium features</p>
        	<button class="submit btn upgrade">Upgrade</button>
    	</div>
  	</div>
  	
If this is irrelevant to your project, simply remove this markup.

#### Box (Container)
Box is the basic container for Wix 3rd Party Settings panel. Boxes are for grouped controls or information blocks. Use them as you like!

    <div class="box">
        <h3>Checkboxes</h3>
        <div class="feature">
            <p>Feature description</p>
            
			<!-- Box content goes here -->
			
        </div>
    </div>

Boxes also contain the `.feature`, which styles a simple paragraph for textual information.

#### List

To group different controls in horizontal view, you can use the `.list` class and structure:

	 <ul class="list">
	     <li>
	         <span class="option">Option Name</span>
	         <!-- Option Markup -->
	     </li>
	 </ul>
	 
This is a simple list with the proper CSS styling to contain all the HTML and JS components offered in the starter kit and present them in a neat horizontal row.

#### Layouts Picker

	<div class="layouts">
	    <figure class="boxes"><figcaption class="radiobutton">Layout 1</figcaption></figure>
	    <figure class="full"><figcaption class="radiobutton">Layout 2</figcaption></figure>
	    <figure class="grid"><figcaption class="radiobutton">Layout 3</figcaption></figure>
	</div>

## Javascript Components


The starter kit Javascript components are basically a set of [jQuery][jquery] Plugins.

[jquery]: http://jquery.com/

#### Accordion

##### Usage	        

	<div class="accordion">
	    <div class="box">
	        <h3>Title</h3>
	        <div class="feature">
	        
	        	// content goes here
	        	
	        </div>
	    </div>
	</div>

Set the Accordion parameters in `accordion.js`. In this case, `box` defines the Wrapper Class, and `feature` defines the content wrapper.

	{
		triggerClass : "box",
		contentClass : "feature"
	}

Initialize the Accordion in `settings.js`:

    $('.accordion').Accordion();

#### Color Picker


##### Usage

Add the following HTML Markup

    <a rel="popover" id="colorpicker1" class="color-selector default"></a>


Include [Twitter Bootstrap][bootstrap] components `Tooltip` and `Popover` dependencies in your main HTML file

	<script type="text/javascript" src="javascripts/bootstrap/bootstrap-tooltip.js"></script>
	<script type="text/javascript" src="javascripts/bootstrap/bootstrap-popover.js"></script>

Next, initialize your color picker on DOM ready like so:

    $('.color-selector').ColorPicker({startWithColor : 'red'});

To subscribe to color-change event:

     $(document).on("colorChanged", function event , data) {
            // data.type now has the id of the color-picker (in case you have more than one
            // data.selected_color has the selected color ('#ffffff' for example)
        });

[bootstrap]: http://twitter.github.com/bootstrap/


#### Radio Button

##### Usage

Add a radio button group to your HTML file:

	<div class="radiobuttons">
		<div id="radioOption1" class="radiobutton"><p>Option 1</p></div>
		<div id="radioOption2" class="radiobutton"><p>Option 2</p></div>
		<div id="radioOption3" class="radiobutton"><p>Option 3</p></div>
	</div>

Initialize the button group and decicde which button is `checked`.

    $('.radiobuttons').Radio({ checked: 0 });

To subscribe to value-change event: 
    
    $(document).on("radioButton.change", function (event, data) {
        // data.type now has the id of the selected option
        // data.checked is true
        });
    
##### Nested Radio Buttons

This is another use case for radio buttons, implemented in the Layout Picker structure:

	<div class="layouts">
		<figure class="boxes"><figcaption class="radiobutton">Layout 1</figcaption></figure>
		<figure class="full"><figcaption class="radiobutton">Layout 2</figcaption></figure>
		<figure class="grid"><figcaption class="radiobutton">Layout 3</figcaption></figure>
	</div>

Next, you specifiy the nested element (`el`) of the radio button:

    $('.layouts').Radio({el: "figure figcaption", checked: 1});

Note &mdash; `.boxes`, `.full` and `.grid` relate to `backgorund-position` of the layout sprite (See `images/layouts.png`):

#### Checkbox

##### Usage

Add a checkbox:

    <div id="checkbox1" class="checkbox">
        <span class ="check"></span>
        <p>Checkbox 1</p>
    </div>

Initialize checkbox, specifying `checked`:

    $('#checkbox1').Checkbox({ checked: true }); 

To subscribe to value-change event: 

    $(document).on("checkbox.change", function (event, data) {
            // data.type now has the id of the changed checkbox
            // data.checked is whether the checkbox is checked or not
        });

#### Slider

##### Usage

Add the slider markup, a simple `div` would do.

    <div class="slider-container">
         0<div id="slider1" class="slider"></div>100
    </div>

Initialize the Slider component with a value.

    $('.slider').Slider({
	    type: "Value",
	    value: 0.5
    });

To subscribe to value-change event: 

    $(document).on("slider.change", function (event, data) {
            // data.type now has the id of the changed slider
            // data.value has the selected value
        });

#### Fixed Positioning Control
---
##### Usage

Add the Fixed position widget control markup, add optional 'placements' array with available placements options (when not specified, all available placements will be shown):

    <div class="glued-positioning"></div>

Initialize the Widget Positioning plugin with binding:

    $('.glued-positioning').GluedPosition({
		placements:[
			'TOP_LEFT',
			'TOP_CENTER',
			'TOP_RIGHT',
			'CENTER_LEFT',
			'CENTER_RIGHT',
			'BOTTOM_LEFT',
			'BOTTOM_CENTER',
			'BOTTOM_RIGHT'
		],
		bindToWidget: true
	});

Or initialize the plugin with user events:

    $('.glued-positioning').GluedPosition({
		placements:['TOP_LEFT','BOTTOM_LEFT'],
        dropDownChange: function() {} ),
        dropDownCreate: function() {} ),
        sliderChange: function() {} ),
        sliderCreate: function() {} )
    });


## Less.js

The starter kit stylesheets are compiled from LESS sources. If you are not familiar with LESS you can find more information [here][lessjs].

[lessjs]: http://mouapp.com "Markdown editor on Mac OS X"

## License

Copyright (c) 2012 Wix.com, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
