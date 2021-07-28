# sharkquila_ui_toolkit

![NPM License](https://img.shields.io/npm/l/sharkquila_ui_toolkit)
![npm](https://img.shields.io/npm/v/sharkquila_ui_toolkit)
![npm bundle size](https://img.shields.io/bundlephobia/min/sharkquila_ui_toolkit)
	
Sharkquila UI toolkits were designed for minimizing the amount of effot that spend on writting the basic UI components while building a website. Those toolkits will handle not only the visual effects of the control but also provide a standardlize UX experience across all the pages.

All the stylesheets were written in less, you will need to use webpack:less-loader or any equivalent tools to bake the style into your own project.

You can initiate your own project with this [template](https://github.com/enw860/sharkquila_quick_startup) as a quick startup. 

To need a less file to load all the relavent styles:
```less
@import "sharkquila_ui_toolkit/src/style/theme/index.less";

// add custom theme variable here (themable feature)

@import "sharkquila_ui_toolkit/src/components/index.less";
```

Please view the [Demo repo](https://github.com/enw860/sharkquila_ui_demo) page for more information.

Or, see the demo site at [Docker image](https://hub.docker.com/repository/docker/wulionel/sharkquila_ui)

## Install

Install the package using [npm](https://www.npmjs.com/package/sharkquila_ui_toolkit):

```js
npm install sharkquila_ui_toolkit
```

## Usage

Firstly, installing plugins at the mounting file.

```js
import Vue from 'vue';
import SKPlugins from "sharkquila_ui_toolkit";

// import your root style.less file here
import "./style/style.less";

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

## Available controls

### Informational

*[l-messages](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/message/Messages.vue)

*[l-notifications](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/notifications/Notifications.vue)

*[l-timer](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/timer/Timer.vue)

*[l-skeleton](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/skeleton/Skeleton.vue)


[l-avatar](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/avatar/Avatar.vue)

[l-badge](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/badge/Badge.vue)

[l-bread-crumbs](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/breadCrumbs/BreadCrumbs.vue)

[l-button](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/button/Button.vue)

[l-clock](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/clock/Clock.vue)

[l-text](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/displayText/DisplayText.vue)

[l-html-text-loader](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/htmlTextLoader/HTMLTextLoader.vue)

[l-link](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/infomational/link/Link.vue)

### Inputs

*[l-input-slider](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/slider/Slider.vue)

[l-input-color](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/ColorInput.vue)

[l-input-file](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/FileInput.vue)

[l-input-text](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/InputText.vue)

[l-input-number](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/Number.vue)

[l-input-password](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/Password.vue)

[l-input-textarea](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/TextArea.vue)

[l-input-single-select](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/SingleSelect.vue)

[l-input-group-single](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/RadioGroup.vue)

[l-input-group-multiple](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/input/CheckboxGroup.vue)

[l-toggle](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/inputs/toggle/Toggle.vue)

### Layout

[l-separator](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/layout/separator/Separator.vue)

[l-slideout](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/layout/slideout/Slideout.vue)

### Wrapper

[l-dropdown-wrapper](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/wrapper/dropDown/Dropdown.vue)

[l-label-wrapper](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/wrapper/labelWrapper/LabelWrapper.vue)

[l-popup-wrapper](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/wrapper/popup/Popup.vue)

[l-tooltip-wrapper](https://github.com/enw860/sharkquila_ui_toolkit/blob/main/src/components/wrapper/tooltip/Tooltip.vue)