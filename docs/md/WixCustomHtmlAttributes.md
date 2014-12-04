## Wix custom HTML attributes
<!-- WixCustomHTMLAttributes -->

The Wix UI Lib defines custom attributes which enable components initialization from within the HTML markup.

**wix-ctrl -** component's controller declaration.

**wix-options -** component initialization options.

**wix-ctrl:{options} -** an alternative for combining the two attributes in one.

**wix-param -** defines style parameter key for a component - will be saved inside the site and not accessible for the app.

**wix-model -** defines app model key for a component - this is a two way data item that it's value is accessible by the app through the Wix.UI.get/set methods. Changes to this item can tracked by subscribing to change events Wix.UI.onChange method.

`Warning: wix-param & wix-model are mutually exclusive and cannot co-exist on the same controller. Only one of them should be used.`

All attributes can be prefixed with **data-** to be W3C compliant (Optional).
