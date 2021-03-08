# sharkquila_ui_toolkits

The toolkits were designed for minimizing the amount of effot that spend on writting basic UI components while building a website. Those high quality toolkits will handle not only the UI details but also provide a standardlize UX experience across all of your pages.

## Install

Install the package using npm:

```js
npm install sharkquila_ui_toolkits
```

## Usage

Firstly, installing plugins at the mounting file.

```js
import Vue from 'vue';
import SKPlugins from "sharkquila_ui_toolkits";

Vue.use(SKPlugins)

new Vue({
    ...
}).$mount('#main');
```

Then you can referring the pre-defined control by calling its name directly.

```js
<template>
    <l-label-wrapper 
        value="Title:" 
        size="small"
    >
        <l-input-text
            slot="labelContent"
            @blur="updateOnLabel"
        />
    </l-label-wrapper>
</template>
<script>
export default {
    name: "<name>",
    data: function () {},
    ...
}
</script>
```

Please view the [Demo repo]() & [Demo site]() page for more information.

## Available controls

### Informational

[l-avatar](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/avatar/Avatar.vue)

[l-badge](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/badge/Badge.vue)

[l-bread-crumbs](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/breadCrumbs/BreadCrumbs.vue)

[l-button](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/button/Button.vue)

[l-clock](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/clock/Clock.vue)

[l-text](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/displayText/DisplayText.vue)

[l-html-text-loader](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/htmlTextLoader/HTMLTextLoader.vue)

[l-link](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/infomational/link/Link.vue)

### Inputs

[l-input-color](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/ColorInput.vue)

[l-input-file](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/FileInput.vue)

[l-input-text](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/InputText.vue)

[l-input-number](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/Number.vue)

[l-input-password](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/Password.vue)

[l-input-textarea](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/TextArea.vue)

[l-input-single-select](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/SingleSelect.vue)

[l-input-group-single](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/RadioGroup.vue)

[l-input-group-multiple](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/input/CheckboxGroup.vue)

[l-toggle](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/inputs/toggle/Toggle.vue)

### Layout

[l-separator](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/layout/separator/Separator.vue)

[l-slideout](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/layout/slideout/Slideout.vue)

### Wrapper

[l-dropdown-wrapper](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/wrapper/dropDown/Dropdown.vue)

[l-label-wrapper](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/wrapper/labelWrapper/LabelWrapper.vue)

[l-popup-wrapper](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/wrapper/popup/Popup.vue)

[l-tooltip-wrapper](https://github.com/enw860/sharkquila_ui_toolkits/blob/main/src/components/wrapper/tooltip/Tooltip.vue)