# Tabs
<!-- Tabs -->

Tabs component, dynamic tab functionality to transition through local content.

### Example

<div wix-ctrl="Tabs" wix-options="{value:0}"  style="margin: 0px">
    <ul>
        <li data-tab="tab0"><div>Tab 1</div></li>
        <li data-tab="tab1"><div>Tab 2</div></li>
        <li data-tab="tab2"><div>Tab 3</div></li>
    </ul>
    <div class="tab-content">
        <div data-tab="tab0" class="tab-pane">
            Tab content 1
        </div>
        <div data-tab="tab1" class="tab-pane">
            Tab content 2
        </div>
        <div data-tab="tab2" class="tab-pane">
            Tab content 3
        </div>
    </div>
</div>

### Markup
```html
<div wix-ctrl="Tabs" wix-options="{value:0}"  style="margin: 0px">
    <ul>
        <li data-tab="tab0"><div>Tab 1</div></li>
        <li data-tab="tab1"><div>Tab 2</div></li>
        <li data-tab="tab2"><div>Tab 3</div></li>
    </ul>
    <div class="tab-content">
        <div data-tab="tab0" class="tab-pane">
            Tab content 1
        </div>
        <div data-tab="tab1" class="tab-pane">
            Tab content 2
        </div>
        <div data-tab="tab2" class="tab-pane">
            Tab content 3
        </div>
    </div>
</div>
```

### Example with Wix Scrollbar

<div wix-ctrl="Tabs" wix-options="{value:0}"  style="margin: 0px">
    <ul>
        <li data-tab="tab0"><div>Tab 1</div></li>
        <li data-tab="tab1"><div>Tab 2</div></li>
        <li data-tab="tab2"><div>Tab 3</div></li>
    </ul>
    <div wix-scroll="{height:200}">
        <div class="tab-content">
            <div data-tab="tab0" class="tab-pane" style="height:300px">
                Tab content with scroll
            </div>
            <div data-tab="tab1" class="tab-pane">
                Tab content 2
            </div>
            <div data-tab="tab2" class="tab-pane">
                Tab content 3
            </div>
        </div>
    </div>
</div>

### Markup
```html
<div wix-ctrl="Tabs" wix-options="{value:0}"  style="margin: 0px">
    <ul>
        <li data-tab="tab0"><div>Tab 1</div></li>
        <li data-tab="tab1"><div>Tab 2</div></li>
        <li data-tab="tab2"><div>Tab 3</div></li>
    </ul>
    <div wix-scroll="{height:200}">
        <div class="tab-content">
            <div data-tab="tab0" class="tab-pane" style="height:300px">
                Tab content with scroll
            </div>
            <div data-tab="tab1" class="tab-pane">
                Tab content 2
            </div>
            <div data-tab="tab2" class="tab-pane">
                Tab content 3
            </div>
        </div>
    </div>
</div>
```

### Options

Name            | Default   | Description
----------------|-----------|------------
value           | `0`       | opened pane at index


