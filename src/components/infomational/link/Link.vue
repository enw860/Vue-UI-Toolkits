<template>
	<a
		class="Link"
		v-bind:class="[sizeClass, isDisabled ? 'disabled' : '']"
		v-bind:style="textStyle"
		:aria-describedby="describeBy"
		:target="openInNewTab ? '_blank' : '_self'"
		:href="hrefSource"
		@click="onclick"
		>{{ value }}</a
	>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const SIZE = {
	auto: "",
	xsmall: "size-xsmall",
	small: "size-small",
	default: "size-normal",
	normal: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
	xxlarge: "size-xxlarge",
	xxxlarge: "size-xxxlarge",
};

export default {
	controlName: "l-link",

	name: "Link",

	data: function () {
		return {};
	},
	props: {
		value: {
			type: String,
			default: "Link",
			description: "Content of display.",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
		fontWeight: {
			type: Number,
			default: 400,
			description: "Font weight of the text.",
		},
		color: {
			type: String,
			default: "#000000",
			description: "Font color of the text.",
		},
		openInNewTab: {
			type: Boolean,
			default: true,
			description: "Open the link address in a new window.",
		},
		href: {
			type: String,
			default: "javascript:void(0);",
			description: "The relevant link.",
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the link.",
		},
	},

	computed: {
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		textStyle: function () {
			return {
				fontWeight: this.fontWeight,
				color: this.color,
			};
		},
		hrefSource: function () {
			return this.isDisabled ? "" : this.href || "javascript:void(0);";
		},
	},

	methods: {
		onclick: function (event) {
			!this.isDisabled &&
				!!this._events.click &&
				this.$emit("click", event);
		},
	},

	expose_events: {
		"@click": {
			description: "Binded action, triggered on link being clicked.",
		},
	},

	expose_methods: {
		onclick: {
			description: "Programmatically trigger link click event.",
		},
	},
};
</script>