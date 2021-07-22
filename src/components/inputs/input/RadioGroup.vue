<template>
	<div
		class="InputGroup"
		v-bind:class="[isDisabled ? 'disabled' : '', inputSize]"
	>
		<div class="GroupWrapper InputWrap" v-bind:class="layoutClass">
			<div
				class="OptionWrapper"
				v-for="optionObj in computedOptions"
				:key="optionObj.option"
			>
				<input
					type="radio"
					:value="optionObj.option"
					:name="describeBy"
					:id="optionObj.controlID"
					:checked="optionObj.isChecked"
					:disabled="isDisabled"
					@change="onchange"
				/>
				<label :for="optionObj.controlID" class="HLayout flow-start">
					<div class="RadioSelector" />
					<span>{{ optionObj.option }}</span>
				</label>
			</div>
		</div>
		<div class="error-message" v-if="!!error">{{ error }}</div>
	</div>
</template>

<script>
import { generateComponentID, normalizeInput } from "../../../utils/utilities";

const LAYOUT = {
	vertical: "VLayout",
	horizontal: "HLayout",
};

const INPUTSIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

export default {
	controlName: "l-input-group-single",

	name: "RadioGroup",

	data: function () {
		return {
			controlID: "",
			choice: this.value,
		};
	},

	props: {
		size: {
			type: String,
			default: "",
			description: "Size of the text.",
			options: Object.keys(INPUTSIZE),
		},
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
		layout: {
			type: String,
			default: "Vertical",
			description: "Layout of the control.",
			options: Object.keys(LAYOUT),
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
					controlID: `${this.controlID}-RadioBtn${index}`,
				};
			});
		},
		layoutClass: function () {
			return normalizeInput(LAYOUT, this.layout);
		},
	},

	methods: {
		onchange: function (event) {
			this.choice = event.target.value;
			!this.isDisabled &&
				!!this._events.change &&
				this.$emit("change", event);
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