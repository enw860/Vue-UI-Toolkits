<template>
	<div
		class="InputBox"
		v-bind:class="[inputSize, isDisabled ? 'disabled' : '']"
	>
		<div class="HLayout align-center" v-bind:class="errorClass">
			<textarea
				:value="inputValue"
				:placeholder="placeholderText"
				:disabled="isDisabled"
				:aria-describedby="describeBy"
				:maxlength="charLimit"
				@change="onchange"
				@focue="onfocus"
				@blur="onblur"
				@keyup="onkeyup"
			/>
			<div v-if="charLimit > 0" class="CharCount">
				{{ `${inputValue.length}/${charLimit}` }}
			</div>
		</div>
		<div class="error-message" v-if="!!error">{{ error }}</div>
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
	controlName: "l-input-textarea",

	name: "TextArea",

	data: function () {
		return {
			inputValue: this.value,
		};
	},

	props: {
		placeholder: {
			type: String,
			default: "Textarea",
			description: "Placeholder text of the control.",
		},
		value: {
			type: String,
			default: "",
			description: "Initial value of the control.",
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
		error: {
			type: String,
			default: "",
			description: "Passed in error message. Show error message if any.",
		},
		charLimit: {
			type: Number,
			default: NaN,
			description:
				"Set to limit the upper bound of the input characters.",
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
		placeholderText: function () {
			return this.placeholder || this.$parent.value || "Placeholder";
		},
		errorClass: function () {
			return this.error ? "invalid-input" : "";
		},
	},

	methods: {
		onkeyup: function (event) {
			this.setValue(event.target.value);
		},
		onchange: function (event) {
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

	watch: {
		charLimit: function (newVal, oldVal) {
			this.inputValue = "";
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
			description: "<String> | Set the value programmatically.",
		},
		getValue: {
			description: "<String> | Get the value.",
		},
	},
};
</script>