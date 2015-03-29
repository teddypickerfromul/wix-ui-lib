###Style parameters in a CSS stylesheet
<!-- WixCustomHTMLAttributes-StyleParametersInCssStylesheet -->

You can use the color and font style parameters inside a **inline CSS style** within your widget/page. It's a simple template engine that uses {{value}} to interpolate the style parameters. fallback values are separated with spaces {{value fallback}}. In order to activate it put `wix-style` attribute on an inline style.
```html
<style wix-style>
    body {
        background-color: {{style.myParam color-1}}; /* style parameter */
    }
    h1 {
        {{Title}} /* font from the template */
    }
    footer {
        {{style.myFont Body-S}}
        background-color: {{style.myParam}}; /* style parameter */
        color: {{color-1}}; /* style from the template */
    }
    @media(wix-device-type:mobile){ /* wix media query for device type */
        #myElement {
            border: 1px solid {{color-1}}; /* style from the template */
        }
    }
</style>
<body>
    <h1>Wix Title</h1>
    <footer>
        <h2>Footer</h2>
    </footer>
</body>
```

Color style parameters can use reserved theme colors in the stylesheet using the following references:

* white/black - primary white, black if the site theme is inverted
* black/white - primary black, white if the site theme is inverted
* primary-1 - defined by the template
* primary-2 - defined by the template
* primary-3 - defined by the template
* color-1 to color-25 - palette colors

Font style parameters can use reserved fonts and sizes in the stylesheet using the following references:

* Title
* Menu
* Page-title
* Heading-XL
* Heading-L
* Heading-M
* Heading-S
* Body-L
* Body-M
* Body-S
* Body-XS