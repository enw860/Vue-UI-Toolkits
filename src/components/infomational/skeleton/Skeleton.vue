<template>
	<div
		class="Skeleton"
		v-bind:class="[sizeClass]"
		v-bind:style="{ width, height: height || '1em' }"
	/>
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
	controlName: "l-sk",

	name: "Skeleton",

	data: function () {
		return {};
	},

	props: {
		width: {
			type: String,
			default: "80%",
			description: "Width of the skeleton.",
		},
		height: {
			type: String,
			default: "1em",
			description:
				"Height of the skeleton, setting this will overwrite the textsize settings.",
		},
		textSize: {
			type: String,
			default: "default",
			description: "Related to the text size of the cover area",
			options: Object.keys(SIZE),
		},
	},

	computed: {
		sizeClass: function () {
			return normalizeInput(SIZE, this.textSize);
		},
	},

	methods: {},

	expose_events: {},

	expose_methods: {},
};
</script>