# Upgrade Button (available only for Dashboard endpoint)
<!-- Upgrade -->

Upgrade Button component, opens Wix billing page with the given vendorProductId and cycle.

### Example

<div wix-ctrl="Upgrade" wix-options="{text:'Upgrade', vendorProductId:'deluxe'}"></div>

### Markup
```html
<div wix-ctrl="Upgrade" wix-options="{text:'Upgrade', vendorProductId:'deluxe'}"></div>
```

### Options

Name            | Default       | Description
----------------|---------------|------------
class           | `btn-upgrade` | The button style
vendorProductId | ``            | The vendor product id as entered in dev.wix.com 
cycle           | `MONTHLY`     | The billing Cycle could be 'MONTHLY', 'YEARLY' or 'ONE_TIME'