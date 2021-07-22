<template>
	<div
		class="InputBox"
		v-bind:class="[inputSize, isDisabled ? 'disabled' : '']"
	>
		<div
			class="SingleSelect InputField InputWrap HLayout align-center"
			v-bind:class="errorClass"
		>
			<select :id="describeBy" :value="choice" @change="onchange">
				<option
					v-for="(optionObj, index) in computedOptions"
					:key="optionObj.option + index"
					:selected="optionObj.isChecked"
					:value="optionObj.option"
				>
					{{ optionObj.option }}
				</option>
			</select>
		</div>
		<div class="error-message" v-if="!!error">{{ error }}</div>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../../utils/utilities";

const INPUTSIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

export default {
	controlName: "l-input-single-select",

	name: "SingleSelect",

	data: function () {
		return {
			choice: this.value,
		};
	},

	props: {
		options: {
			type: Array,
			default: () => [],
			description: "Range of options.",
		},
		value: {
			type: String,
			default: "",
			description: "Init selected value.",
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
		errorClass: function () {
			return this.error ? "invalid-input" : "";
		},
		computedOptions: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}

			return this.options.map((option, index) => {
				return {
					option,
					isChecked: index === this.getSelectedIndex(),
					controlID: `${this.controlID}-SingleSelectOption${index}`,
				};
			});
		},
	},

	methods: {
		onchange: function (event) {
			this.setValueByValue(event.target.value);
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
		setValueByIndex: function (index) {
			if (index > -1 && index < this.options.length) {
				this.setValueByValue(this.options[index]);
			}
		},
		setValueByValue: function (value) {
			if (this.options.indexOf(value) > -1) {
				this.choice = value;
			}
		},
		getSelectedIndex: function () {
			return this.options.indexOf(this.choice);
		},
		getSelectedValue: function () {
			return this.choice || "";
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
		setValueByIndex: {
			description: "<String> | Set the select item by index.",
		},
		setValueByValue: {
			description: "<String> | Set the select item by value.",
		},
		getSelectedIndex: {
			description: "Get the select item index.",
		},
		getSelectedValue: {
			description: "Get the select item value.",
		},
	},
};
</script>