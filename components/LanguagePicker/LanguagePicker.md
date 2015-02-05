# Language Picker
<!-- LanguagePicker -->

Language Picker component, expandable dropdown list of languages. Use it to control the selection of a language supported by the app.

### Example

<div wix-model="lang"  wix-options="{ selectedLanguage: 'En' }" wix-ctrl="LanguagePicker"></div>

### Markup
```html
<div wix-model="lang" wix-ctrl="LanguagePicker"></div>
```

### Options


Name             | Default                                                              | Description
-----------------|----------------------------------------------------------------------|------------
languages        | `['En', 'De', 'Es', 'Fr', 'It', 'Po', 'Pt', 'Ru', 'Ja', 'Ko', 'Tr']` | a list of languages to choose from
height           | `auto`                                                               | expandable list height, extra content will cam be accessed by scrolling the list
selectedLanguage | `En`                                                                 | language code to set as default