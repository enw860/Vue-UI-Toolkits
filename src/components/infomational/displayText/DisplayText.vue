<template>
	<div
		class="DisplayText"
		v-bind:class="[sizeClass, isDisabled]"
		:aria-describedby="describeBy"
		v-bind:style="textStyle"
	>
		{{ value }}
	</div>
</template>

<script>
import "./DisplayText.less";
import { normalizeInput } from "../../../utils/utilities";

export default {
	controlName: "l-text",

	name: "DisplayText",

	data: function () {
		return {
			SIZE: {
				auto: "",
				xsmall: "size-xsmall",
				small: "size-small",
				default: "size-normal",
				normal: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
				xxlarge: "size-xxlarge",
				xxxlarge: "size-xxxlarge",
			},
		};
	},
	props: {
		value: {
			type: String,
			default: "auto",
		},
		size: {
			type: String,
			default: "default",
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		color: {
			type: String,
			default: "",
		},
	},
	computed: {
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		sizeClass: function () {
			return normalizeInput(this.SIZE, this.size);
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
	},
};
</script>