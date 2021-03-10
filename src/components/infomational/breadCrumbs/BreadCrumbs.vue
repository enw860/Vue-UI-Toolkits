<template>
	<div class="BreadCrumbs HLayout" v-bind:class="sizeClass">
		<div
			class="BreadCrumbsStepWrapper HLayout"
			v-for="(step, index) in steps"
			:key="step.name"
		>
			<span class="BreadCrumbsSeparator" v-if="index > 0">{{
				separator
			}}</span>
			<span class="BreadCrumbsStepName">
				<l-link
					v-if="!!step.click"
					:value="step.name"
					:fontWeight="fontWeight"
					:color="color"
					:openInNewTab="false"
					:disabled="index === steps.length - 1"
					:size="size"
					@click="step.click"
				/>
				<span v-else>{{ step.name }}</span>
			</span>
		</div>
	</div>
</template>

<script>
import "./BreadCrumbs.less";
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
	controlName: "l-bread-crumbs",

	name: "BreadCrumbs",

	data: function () {
		return {};
	},
	props: {
		steps: {
			type: Array,
			default: [],
			description: "[{name: <name>, click: <function>}...]",
			validator: (steps) =>
				steps.every((step) => {
					const validName =
						!!step.name && typeof step.name === "string";
					const validFunc =
						!step.click ||
						(!!step.click && typeof step.click === "function");
					return validName && validFunc;
				}),
		},
		size: {
			type: String,
			default: "auto",
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
		separator: {
			type: String,
			default: "/",
			description: "Delimiter of bread crumbs.",
		},
	},
	computed: {
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
	},
};
</script>