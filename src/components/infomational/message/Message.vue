<template>
	<div>This is a message</div>
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

const STYLE = {
	primary: "msg-primary",
	success: "msg-success",
	danger: "msg-danger",
	info: "msg-info",
	dark: "msg-dark",
	default: "msg-primary",
};

export default {
	controlName: "l-message",

	name: "Message",

	data: function () {
		return {};
	},
	props: {
		value: {
			type: String,
			default: "This is a piece of message",
			description: "Content of display.",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
		messageStyle: {
			type: String,
			default: "default",
			description: "Color theme of the message tile.",
			options: Object.keys(STYLE),
		},
	},

	computed: {
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		styleClass: function () {
			return normalizeInput(STYLE, this.messageStyle);
		},
	},

	methods: {},

	expose_events: {},

	expose_methods: {},
};
</script>