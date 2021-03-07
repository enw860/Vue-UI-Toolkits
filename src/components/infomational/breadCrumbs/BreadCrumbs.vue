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

export default {
	controlName: "l-bread-crumbs",

	name: "BreadCrumbs",

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
		steps: {
			type: Array,
			default: [],
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
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		color: {
			type: String,
			default: "",
		},
		separator: {
			type: String,
			default: "/",
		},
	},
	computed: {
		sizeClass: function () {
			return normalizeInput(this.SIZE, this.size);
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
	},
};
</script>