<template>
	<div
		class="InputBox"
		v-bind:class="[inputSize, isDisabled ? 'disabled' : '']"
	>
		<div class="InputWrap InputField HLayout align-center">
			<input
				type="color"
				:value="inputValue"
				:disabled="isDisabled"
				:aria-describedby="describeBy"
				@change="onchange"
				@focue="onfocus"
				@blur="onblur"
			/>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const INPUTSIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

export default {
	controlName: "l-input-color",

	name: "ColorInput",

	data: function () {
		return {
			inputValue: this.value,
		};
	},

	props: {
		value: {
			type: String,
			default: "#000000",
			description: "Hex value of a color.",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(INPUTSIZE),
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the control.",
		},
	},

	computed: {
		inputSize: function () {
			return this.size
				? normalizeInput(INPUTSIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(INPUTSIZE, "default");
		},
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
	},

	methods: {
		onchange: function (event) {
			this.setValue(event.target.value);
			!this.isDisabled &&
				!!this._events.change &&
				this.$emit("change", event);
		},
		onfocus: function (event) {
			!this.isDisabled &&
				!!this._events.focus &&
				this.$emit("focus", event);
		},
		onblur: function (event) {
			!this.isDisabled &&
				!!this._events.blur &&
				this.$emit("blur", event);
		},
		setValue: function (newVal) {
			if (newVal !== this.inputValue) {
				this.inputValue = newVal;
			}
		},
		getValue: function () {
			return this.inputValue;
		},
	},

	expose_events: {
		"@change": {
			description: "Binded action, triggered on value being changed.",
		},
		"@focus": {
			description: "Binded action, triggered on the control being focus.",
		},
		"@blur": {
			description: "Binded action, triggered on the control being blur.",
		},
	},

	expose_methods: {
		onchange: {
			description: "Programmatically trigger the on change method.",
		},
		setValue: {
			description: "<String> | Set the color hex value.",
		},
		getValue: {
			description: "<String> | Get the select color hex value.",
		},
	},
};
</script>