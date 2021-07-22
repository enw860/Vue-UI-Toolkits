<template>
	<div
		class="DropDown VLayout"
		v-bind:class="[dropDownSize, isExpanded ? 'expand' : '']"
	>
		<button
			class="DropDownBtn HLayout align-center"
			v-bind:class="dropDownColorStyle"
			@click="toggleDropDown"
		>
			{{ title }}
		</button>
		<div
			class="DropdownContent VLayout"
			v-bind:class="isExpanded ? '' : 'hide'"
			:aria-hidden="!isExpanded"
			:aria-expanded="isExpanded"
		>
			<div class="contentPanel">
				<slot name="content"></slot>
			</div>
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

const COLORSTYLE = {
	default: "",
	dark: "dark-style",
};

export default {
	controlName: "l-dropdown-wrapper",

	name: "Dropdown",

	data: function () {
		return {
			isExpanded: this.expanded,
		};
	},

	props: {
		title: {
			type: String,
			default: "Title",
			description: "Title of the expanded control.",
		},
		expanded: {
			type: Boolean,
			default: false,
			description: "Init state of the expanded control.",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the expanded control",

			options: Object.keys(INPUTSIZE),
		},
		colorStyle: {
			type: String,
			default: "default",
			description: "Color of the expanded control.",
			options: Object.keys(COLORSTYLE),
		},
	},

	computed: {
		dropDownSize: function () {
			return this.size
				? normalizeInput(INPUTSIZE, this.size)
				: normalizeInput(INPUTSIZE, "default");
		},
		dropDownColorStyle: function () {
			return normalizeInput(COLORSTYLE, this.colorStyle);
		},
	},

	methods: {
		toggleDropDown: function (event) {
			if (this.isExpanded) {
				this.collaspeDropDown(event);
			} else {
				this.expandDropDown(event);
			}
		},
		expandDropDown: function (event) {
			this.isExpanded = true;
			!!this._events.expand && this.$emit("expand", event);
		},
		collaspeDropDown: function (event) {
			this.isExpanded = false;
			!!this._events.collaspe && this.$emit("collaspe", event);
		},
	},

	expose_events: {
		"@expand": {
			description: "Binded action, triggered on section being expanded.",
		},
		"@collaspe": {
			description: "Binded action, triggered on section being collasped.",
		},
	},

	expose_methods: {
		toggleDropDown: {
			description: "Programmatically toggle the expanded state.",
		},
		expandDropDown: {
			description: "Programmatically expanding the section.",
		},
		collaspeDropDown: {
			description: "Programmatically collasping the section.",
		},
	},

	expose_slots: {
		content: {
			description: "Body of the expandable section.",
		},
	},
};
</script>