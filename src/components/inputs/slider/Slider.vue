<template>
	<div
		class="Slider-wrapper"
		v-bind:class="[isDisabled ? 'disabled' : '', inputSize, inputStyle]"
	>
		<div class="Slider-main">
			<div class="Slider-nodes" v-if="inputType === 'slider-select'">
				<div
					class="Slider-node"
					v-bind:tabindex="mute || isDisabled ? '1' : '0'"
					v-for="option in computedOptions"
					:key="option.controlID"
					v-bind:class="[option.isChecked ? 'checked' : '']"
					@click="(e) => setOption(e, 'click', option.value)"
					@keypress="(e) => setOption(e, 'keypress', option.value)"
					v-bind:data-tooltip="option.label || option.value"
					v-bind:style="{
						left: option.left,
					}"
				></div>
			</div>

			<div class="Slider-track" ref="_slider_wrapper">
				<div
					class="Slider-value"
					v-bind:style="{
						width: computedValue + '%',
					}"
				></div>
				<div
					class="Slider-thumb"
					v-bind:data-tooltip="selectedValue"
					v-bind:tabindex="muteRanger || isDisabled ? '1' : '0'"
					v-bind:style="{
						left: computedValue + '%',
					}"
					@mousedown="rangerDown"
					@mouseup="rangerRelease"
					@touchstart="rangerDown"
					@touchend="rangerRelease"
					@keydown="modifyValue"
				></div>
			</div>
		</div>
		<div class="Slider-labels"></div>
	</div>
</template>

<script>
import { generateComponentID, normalizeInput } from "../../../utils/utilities";

const SIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

const STYLE = {
	primary: "slider-primary",
	success: "slider-success",
	danger: "slider-danger",
	info: "slider-info",
};

const TYPE = {
	range: "slider-ranger",
	select: "slider-select",
};

export default {
	controlName: "l-input-slider",

	name: "Slider",

	data: function () {
		return {
			controlID: "",
			onHold: false,
			selectedValue: this.value,
		};
	},

	props: {
		value: {
			type: Number,
			default: 50,
			description: "Initial value of the control.",
		},
		min: {
			type: Number,
			default: 0,
			description: "Min value of the control.",
		},
		max: {
			type: Number,
			default: 100,
			description: "Max value of the control.",
		},
		options: {
			type: Array,
			default: () => {
				return [
					{ value: 0, label: "OPT1" },
					{ value: 25, label: "OPT2" },
					{ value: 50, label: "OPT3" },
					{ value: 100, label: "OPT4" },
				];
			},
			description:
				"Options of the control. Min and max for ranger type and nodes of select type.",
		},
		type: {
			type: String,
			default: "ranger",
			options: Object.keys(TYPE),
			description: "The slider type of the control.",
		},
		size: {
			type: String,
			default: "default",
			options: Object.keys(SIZE),
			description: "Size of the control.",
		},
		sliderStyle: {
			type: String,
			default: "primary",
			options: Object.keys(STYLE),
			description: "Color style of the control.",
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the control.",
		},
		mute: {
			type: Boolean,
			default: false,
			description: "Mute sliders",
		},
	},

	computed: {
		computedValue: function () {
			let percentage =
				(this.selectedValue - this.min) / (this.max - this.min);
			percentage = percentage < 0 ? 0 : Math.min(percentage, 100);
			return Math.round(percentage * 1000) / 10;
		},
		computedOptions: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}

			return this.options.map((option, index) => {
				let percentage =
					(option.value - this.min) / (this.max - this.min);
				percentage = percentage < 0 ? 0 : Math.min(percentage, 100);
				percentage = Math.round(percentage * 1000) / 10;

				return {
					...option,
					isChecked: parseFloat(this.selectedValue) >= option.value,
					controlID: `${this.controlID}-opt${index}`,
					left: percentage + "%",
				};
			});
		},
		inputSize: function () {
			return this.size
				? normalizeInput(SIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(SIZE, "default");
		},
		inputStyle: function () {
			return normalizeInput(STYLE, this.sliderStyle);
		},
		inputType: function () {
			return normalizeInput(TYPE, this.type);
		},
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		muteRanger: function () {
			return (
				this.mute || [TYPE["select"], "select"].indexOf(this.type) >= 0
			);
		},
	},

	methods: {
		rangerDown: function () {
			if (this.muteRanger || this.isDisabled) return;

			if (!this.onHold) {
				this.onHold = true;
				["mousemove", "touchmove"].map((e) =>
					document.addEventListener(e, this.dragRangerHandler)
				);
			}
		},
		rangerRelease: function (event, force) {
			if (!force) {
				if (this.muteRanger || this.isDisabled) return;
			}

			if (this.onHold) {
				this.onHold = false;
				["mousemove", "touchmove"].map((e) =>
					document.removeEventListener(e, this.dragRangerHandler)
				);

				if (!force) {
					this.$emit("change", this.getValue());
				}
			}
		},
		dragRangerHandler: function (e) {
			const { _slider_wrapper } = this.$refs;

			if (!_slider_wrapper) return;

			// prevent default action like swipe up and down
			e.preventDefault();

			const { left, width } = _slider_wrapper.getBoundingClientRect();

			let cursorPositionX = e.clientX;
			if (e.type.indexOf("touch") >= 0) {
				cursorPositionX = e.touches[0].clientX;
			}

			let percentage = (cursorPositionX - left) / width;
			percentage = Math.round(percentage * 1000) / 1000;
			percentage =
				percentage < 0
					? Math.max(0, percentage)
					: Math.min(percentage, 1);

			const value = (this.max - this.min) * percentage + this.min;
			this.setValue(Math.round(value));
		},
		setOption: function (event, type, value) {
			if (this.mute || this.isDisabled) return;

			let changeValue = false;
			if (type === "click") {
				changeValue = true;
			} else if (type === "keypress") {
				const keycode = event.keyCode || event.which;
				if ([13, 32].some((code) => code === keycode)) {
					changeValue = true;
				}
			}

			if (changeValue) {
				this.setValue(value);
			}
		},
		modifyValue: function (event) {
			if (this.muteRanger || this.isDisabled) return;

			const keycode = parseInt(event.keyCode || event.which);
			if ([37].some((code) => code === keycode)) {
				// left key
				this.setValue(this.selectedValue - 1);
			} else if ([39].some((code) => code === keycode)) {
				// right key
				this.setValue(this.selectedValue + 1);
			}
		},
		adjustSelectedValue: function () {
			// move the slider to a reasonable position
			if ([TYPE["range"], "range"].indexOf(this.type) >= 0) {
				if (this.selectedValue < this.min) {
					this.selectedValue = this.min;
				} else if (this.selectedValue > this.max) {
					this.selectedValue = this.max;
				}
			} else if ([TYPE["select"], "select"].indexOf(this.type) >= 0) {
				if (
					!this.options
						.map((opt) => opt.value)
						.some((opt) => opt === this.selectedValue)
				) {
					this.selectedValue = this.options[0].value;
				}
			}
		},
		setValue: function (value) {
			if (this.isDisabled) return;
			this.selectedValue = value;
			this.$emit("change", this.getValue());
		},
		getValue: function () {
			if (this.type === "select") {
				for (let i = 0; i < this.options.length; i++) {
					const opt = this.options[i];
					if (opt.value === this.selectedValue) {
						return opt;
					}
				}
			}
			return this.selectedValue;
		},
	},

	watch: {
		muteRanger(newVal, oldVal) {
			// force cancel the mouse move event
			this.rangerRelease(null, true);
		},
		inputType(newVal, oldVal) {
			this.adjustSelectedValue();
		},
		options(newVal, oldVal) {
			this.adjustSelectedValue();
		},
		min(newVal, oldVal) {
			this.adjustSelectedValue();
		},
		max(newVal, oldVal) {
			this.adjustSelectedValue();
		},
		selectedValue(newVal, oldVal) {
			this.adjustSelectedValue();
		},
	},

	mounted: function () {},

	expose_events: {
		"@change": {
			description:
				"Binded action, triggered when slider value has been changed.",
		},
	},

	expose_methods: {
		getValue: {
			description: "Get value at the slider cursor position.",
		},
	},
};
</script>