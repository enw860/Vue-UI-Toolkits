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
					type="checkbox"
					:value="optionObj.option"
					:name="describeBy"
					:id="optionObj.controlID"
					:checked="optionObj.isChecked"
					:disabled="isDisabled"
					@change="onchange"
				/>
				<label :for="optionObj.controlID" class="HLayout flow-start">
					<div class="CheckboxSelector" />
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
	controlName: "l-input-group-multiple",

	name: "CheckboxGroup",

	data: function () {
		return {
			controlID: "",
			choice: this.value || [],
		};
	},

	props: {
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(INPUTSIZE),
		},
		options: {
			type: Array,
			default: [],
			description: "Range of options.",
		},
		value: {
			type: Array,
			default: [],
			description: "List of selected values.",
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the control.",
		},
		error: {
			type: String,
			default: "",
			description:
				"Passed in error message. Will show error if any value passed in.",
		},
		layout: {
			type: String,
			default: "Vertical",
			description: "Layout of the checkboxes.",
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
					isChecked: this.getSelectedIndexs().indexOf(index) > -1,
					controlID: `${this.controlID}-CheckboxBtn${index}`,
				};
			});
		},
		layoutClass: function () {
			return normalizeInput(LAYOUT, this.layout);
		},
	},

	methods: {
		onchange: function (event) {
			if (this.choice.indexOf(event.target.value) < 0) {
				this.choice = [...this.choice, event.target.value];
			} else {
				this.choice = this.choice.filter(
					(value) => value !== event.target.value
				);
			}

			!this.isDisabled &&
				!!this._events.change &&
				this.$emit("change", event);
		},
		setValueByIndexs: function (indexs) {
			if (indexs.length > 0) {
				this.choice = indexs.reduce((choices, index) => {
					if (index < this.options.length) {
						return [this.options[index], ...choices];
					}
					return choices;
				}, []);
			}
		},
		setValueByValues: function (values) {
			if (values.length > 0) {
				this.choice = this.values.filter(
					(value) => this.options.indexOf(value) > -1
				);
			}
		},
		getSelectedIndexs: function () {
			return this.getSelectedValues().map((value) =>
				this.options.indexOf(value)
			);
		},
		getSelectedValues: function () {
			return this.choice || [];
		},
	},

	expose_events: {
		"@change": {
			description: "Binded action, triggered on value being changed.",
		},
	},

	expose_methods: {
		onchange: {
			description: "Programmatically trigger the on change methods.",
		},
		setValueByIndexs: {
			description: "[<index>] | Set the selected items by indexs.",
		},
		setValueByValues: {
			description: "[<string>] | Set the selected items by values",
		},
		getSelectedIndexs: {
			description: "Get the selected indexs.",
		},
		getSelectedValues: {
			description: "Get the selected values.",
		},
	},
};
</script>