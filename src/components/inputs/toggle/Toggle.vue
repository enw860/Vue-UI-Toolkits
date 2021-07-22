<template>
	<div class="Toggle" v-bind:class="isDisabled ? 'disabled' : ''">
		<div
			:aria-describedby="describedby"
			class="toggle-wrapper"
			v-bind:class="[sizeClass, styleClass]"
			tabindex="0"
			@click="onToggle"
			@keypress="onKeyPress"
		>
			<div
				class="toggle-pill"
				v-bind:class="currentState ? 'active' : ''"
			>
				<div class="toggle-toggler"></div>
			</div>
			<div class="toggle-label">
				<div
					class="toggle-label-on"
					v-bind:class="currentState ? '' : 'hide'"
				>
					<span v-if="isTextType">{{ onLabel }}</span>
					<a v-else class="fa" v-bind:class="onLabel"></a>
				</div>
				<div
					class="toggle-label-off"
					v-bind:class="!currentState ? '' : 'hide'"
				>
					<span v-if="isTextType">{{ offLabel }}</span>
					<a v-else class="fa" v-bind:class="offLabel"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../../utils/utilities";

const LABELTYPE = {
	text: "TEXT",
	icon: "ICON",
};

const SIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

const STYLE = {
	primary: "toggle-primary",
	success: "toggle-success",
	danger: "toggle-danger",
	info: "toggle-info",
	default: "toggle-primary",
};

export default {
	controlName: "l-toggle",

	name: "Toggle",

	data: function () {
		return {
			currentState: this.state,
		};
	},

	props: {
		state: {
			type: Boolean,
			default: false,
			description: "Initial state of the toggle control.",
		},
		onLabel: {
			type: String,
			default: "On",
			description:
				"On label, text label when label type is text, otherwise it represent the fontawsome icon class.",
		},
		offLabel: {
			type: String,
			default: "Off",
			description:
				"Off label, text label when label type is text, otherwise it represent the fontawsome icon class.",
		},
		labelType: {
			type: String,
			default: "text",
			description: "Type of the toggle label.",
			options: Object.keys(LABELTYPE),
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the toggle.",
		},
		toggleStyle: {
			type: String,
			default: "default",
			description: "Style of the toggle control.",
			options: Object.keys(STYLE),
		},
	},

	computed: {
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		styleClass: function () {
			return normalizeInput(STYLE, this.toggleStyle);
		},
		isTextType: function () {
			return normalizeInput(LABELTYPE, this.labelType) === "TEXT";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		describedby: function () {
			return this.$parent.labelID || "";
		},
	},

	methods: {
		onToggle: function (event) {
			this.currentState = !this.currentState;
			event.target.checked = this.currentState;
			!this.isDisabled &&
				!!this._events.toggle &&
				this.$emit("toggle", event);
		},
		onKeyPress: function (event) {
			if (
				[13, 32].some((code) => code === (event.keyCode || event.which))
			) {
				this.onToggle(event);
			}
		},
		getState: function () {
			return this.currentState;
		},
	},

	expose_events: {
		"@toggle": {
			description: "Binded action, triggered on toggle being toggled.",
		},
	},

	expose_methods: {
		onToggle: {
			description: "Programmatically trigger the toggle control.",
		},
		getState: {
			description: "Get the on or off state.",
		},
	},
};
</script>