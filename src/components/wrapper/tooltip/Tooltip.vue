<template>
	<div
		class="Tooltip"
		v-bind:class="tooltipSize"
		@mouseenter="hoverToggle"
		@mouseleave="hoverToggle"
	>
		<slot name="content"></slot>
		<div
			:id="labelID"
			:aria-hidden="isVisible"
			role="tooltip"
			class="tooltipContent"
			v-bind:class="[sClass, mClass, isVisible ? 'show' : 'hide']"
		>
			<div class="tooltipText">{{ value }}</div>
		</div>
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

const MPOS = {
	top: "m-top",
	bottom: "m-bottom",
	left: "m-left",
	right: "m-right",
};

const SPOS = {
	start: "s-start",
	center: "s-center",
	end: "s-end",
};

export default {
	controlName: "l-tooltip-wrapper",

	name: "Tooltip",

	data: function () {
		return {
			isVisible: false,
		};
	},

	props: {
		value: {
			type: String,
			default: "Tooltip",
			description: "Text show in the tooltip box.",
		},
		mPosition: {
			type: String,
			default: "top",
			description: "Vertical position of the tooltip.",
			options: Object.keys(MPOS),
		},
		sPosition: {
			type: String,
			default: "start",
			description: "Horizontal position of the tooltip.",
			options: Object.keys(SPOS),
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(INPUTSIZE),
		},
		displayOnHover: {
			type: Boolean,
			default: true,
			description: "Show the tooltip on hover.",
		},
	},

	computed: {
		tooltipSize: function () {
			return this.size
				? normalizeInput(INPUTSIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(INPUTSIZE, "default");
		},
		mClass: function () {
			return normalizeInput(MPOS, this.mPosition);
		},
		sClass: function () {
			return normalizeInput(SPOS, this.sPosition);
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
	},

	methods: {
		hoverToggle: function (event) {
			if (this.displayOnHover) {
				this.toggleTooltip(event);
			}
		},
		toggleTooltip: function (event) {
			if (this.isVisible) {
				this.hideTooltip(event);
			} else {
				this.showTooltip(event);
			}
		},
		showTooltip: function (event) {
			this.isVisible = true;
			!!this._events.show && this.$emit("show", event);
		},
		hideTooltip: function (event) {
			this.isVisible = false;
			!!this._events.hide && this.$emit("hide", event);
		},
	},

	expose_events: {
		"@show": {
			description: "Binded action, triggered on tooltip being shown.",
		},
		"@hide": {
			description: "Binded action, triggered on tooltip being hided.",
		},
	},

	expose_methods: {
		toggleTooltip: {
			description: "Programmatically toggling the tooltip.",
		},
		showTooltip: {
			description: "Programmatically showing the tooltip.",
		},
		hideTooltip: {
			description: "Programmatically hiding the tooltip.",
		},
	},

	expose_slots: {
		content: {
			description: "Content of the tooltip control.",
		},
	},
};
</script>