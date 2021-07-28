<template>
	<div
		class="DisplayText"
		v-bind:class="[sizeClass, isDisabled]"
		:aria-describedby="describeBy"
		v-bind:style="textStyle"
		v-if="value"
	>
		{{ value }}
	</div>
	<l-sk v-else :textSize="size" width="50%" />
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
	controlName: "l-text",

	name: "DisplayText",

	data: function () {
		return {};
	},

	props: {
		value: {
			type: String,
			default: "Text",
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
			default: "",
			description: "Font color of the text.",
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
			const style = {};

			if (this.fontWeight) {
				style.fontWeight = this.fontWeight;
			}

			if (this.color) {
				style.color = this.color;
			}

			return style;
		},
	},
};
</script>