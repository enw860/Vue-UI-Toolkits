<template></template>

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
	controlName: "l-stopwatch",

	name: "StopWatch",

	data: function () {
		return {};
	},
	props: {
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
	},

	computed: {
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
	},

	methods: {},

	expose_events: {},

	expose_methods: {},
};
</script>