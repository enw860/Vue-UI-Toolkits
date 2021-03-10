<template>
	<div
		class="Button HLayout flow-between align-center"
		v-bind:class="[sizeClass, styleClass, isDisabled ? 'disabled' : '']"
		:role="isClickable ? 'button' : 'img'"
		:tabindex="isClickable && !isDisabled ? '0' : ''"
		:aria-disabled="isClickable && !isClickable"
		:aria-describedby="labelID"
		@click="onclick"
		@keypress="onkeypress"
	>
		<a
			v-if="!!icon && iconPositionNorm === 'left'"
			class="fa"
			v-bind:class="icon"
		></a>

		<span v-if="!!value">{{ value }}</span>

		<a
			v-if="!!icon && iconPositionNorm === 'right'"
			class="fa"
			v-bind:class="icon"
		></a>
	</div>
</template>

<script>
import "./Button.less";
import { normalizeInput, generateComponentID } from "../../../utils/utilities";

const ICON_POSITION = {
	left: "left",
	right: "right",
};

const SIZE = {
	small: "size-small",
	normal: "size-normal",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

const STYLE = {
	primary: "btn-primary",
	success: "btn-success",
	danger: "btn-danger",
	info: "btn-info",
	dark: "btn-dark",
	white: "btn-white",
	default: "btn-white",
	transparent: "btn-transparent",
};

export default {
	controlName: "l-button",

	name: "Button",

	data: function () {
		return {};
	},

	props: {
		size: {
			type: String,
			default: "default",
			description: "Size of the button control.",
			options: Object.keys(SIZE),
		},
		value: {
			type: String,
			default: "Button",
			description: "Context of button control.",
		},
		icon: {
			type: String,
			default: "",
			description: "Fontawsome icon class, e.g fa-apple.",
		},
		iconPosition: {
			type: String,
			default: "left",
			options: Object.keys(ICON_POSITION),
			description: "Position of the icon.",
		},
		btnStyle: {
			type: String,
			default: "default",
			description: "Predefined button color styles.",

			options: Object.keys(STYLE),
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Whether the button is disabled or not.",
		},
	},

	computed: {
		iconPositionNorm: function () {
			return normalizeInput(ICON_POSITION, this.iconPosition);
		},

		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		styleClass: function () {
			return normalizeInput(STYLE, this.btnStyle);
		},
		hasIcon: function () {
			return !!this.icon;
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		isClickable: function () {
			return !!this._events.click;
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
	},

	methods: {
		onclick: function (event) {
			!this.isDisabled &&
				!!this._events.click &&
				this.$emit("click", event);
		},
		onkeypress: function (event) {
			if (
				[13, 32].some((code) => code === (event.keyCode || event.which))
			) {
				this.onclick(event);
			}
		},
	},

	expose_events: {
		"@click": {
			description: "Binded action, triggered on button being clicked.",
		},
	},

	expose_methods: {
		onclick: {
			description: "Programmatically trigger button click event.",
		},
	},
};
</script>