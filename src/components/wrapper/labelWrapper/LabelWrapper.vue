<template>
	<div
		class="LabelWrapper"
		v-bind:class="[
			labelPositionClass,
			labelSize,
			isDisabled ? 'disabled' : '',
		]"
	>
		<label :id="controlID" class="Label">{{ this.labelContent }}</label>
		<slot name="labelContent"></slot>
	</div>
</template>

<script>
import "./LabelWrapper.less";
import { normalizeInput, generateComponentID } from "../../../utils/utilities";

const POSITION = {
	left: "label-left",
	top: "label-top",
};

const LABELSIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

export default {
	controlName: "l-label-wrapper",

	name: "LabelWrapper",

	data: function () {
		return {
			controlID: "",
		};
	},

	props: {
		value: {
			type: String,
			default: "Default label",
			description: "Context of the label.",
		},
		position: {
			type: String,
			default: "top",
			description: "Position of the label.",
			options: Object.keys(POSITION),
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the label and the inner control size.",
			options: Object.keys(LABELSIZE),
		},
		required: {
			type: Boolean,
			default: false,
			description: "State if the field is required.",
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disabled the label and the inner context.",
		},
	},

	computed: {
		labelPositionClass: function () {
			return normalizeInput(POSITION, this.position);
		},
		labelSize: function () {
			return normalizeInput(LABELSIZE, this.size);
		},
		labelContent: function () {
			return this.required ? "*" + this.value : this.value;
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
		isDisabled: function () {
			return this.$parent.sdisabled || this.disabled;
		},
	},

	expose_slots: {
		labelContent: {
			description: "Body of the wrapped section.",
		},
	},
};
</script>