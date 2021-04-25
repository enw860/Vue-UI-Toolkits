<template>
	<div
		class="Slider-wrapper"
		v-bind:class="[isDisabled ? 'disabled' : '', inputSize, inputStyle]"
	>
		<div class="Slider-main">
			<div class="Slider-nodes" v-if="inputType === 'slider-select'">
				<div
					class="Slider-node"
					v-for="option in computedOptions"
					:key="option.controlID"
					v-bind:class="[option.isChecked ? 'checked' : '']"
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
					tabindex="0"
					v-bind:style="{
						left: computedValue + '%',
					}"
					@mousedown="rangerDown"
					@mouseup="rangerRelease"
				></div>
			</div>
		</div>
		<div class="Slider-labels"></div>
	</div>
</template>

<script>
import "./Slider.less";
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
			seletedValue: this.value,
		};
	},

	props: {
		value: {
			type: String,
			default: "50",
			description: "Initial selected value of the control.",
		},
		options: {
			type: Array,
			default: () => {
				return [
					{ value: 0, label: "0%" },
					{ value: 100, label: "100%" },
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
	},

	computed: {
		computedValue: function () {
			let value = parseFloat(this.seletedValue);

			this.options.forEach((option, index) => {
				let optPercentage =
					(100 * index) /
					(this.options.length > 1 ? this.options.length - 1 : 1);

				if (option === this.seletedValue) {
					value = optPercentage;
				}
			});

			return value;
		},
		computedOptions: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}

			return this.options.map((option, index) => {
				let optPercentage =
					(100 * index) /
					(this.options.length > 1 ? this.options.length - 1 : 1);

				return {
					...option,
					isChecked: parseFloat(this.computedValue) > optPercentage,
					controlID: `${this.controlID}-opt${index}`,
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
	},

	methods: {
		rangerDown: function () {
			if (this.muteRanger) return;

			if (!this.onHold) {
				this.onHold = true;
				document.addEventListener("mousemove", this.dragRangerHandler);
			}
		},

		rangerRelease: function () {
			if (this.muteRanger) return;

			if (this.onHold) {
				this.onHold = false;
				document.removeEventListener(
					"mousemove",
					this.dragRangerHandler
				);
			}
		},

		dragRangerHandler: function (e) {
			const { getPoints, computeVector } = this;

			// const [center, start, cursor] = getPoints(e);

			console.warn(
				this.$refs._slider_wrapper.getBoundingClientRect(),
				e.target.getBoundingClientRect()
			);
		},

		getPoints: function (e) {
			const { _slider_wrapper } = this.$refs;
			const {
				top,
				left,
				width,
				height,
			} = _slider_wrapper.getBoundingClientRect();

			const center = [left + width / 2, top + height / 2];
			const start = [left + width / 2, top];
			const cursor = [e.clientX, e.clientY];

			return [center, start, cursor];
		},
	},

	watch: {},

	mounted: {},

	expose_events: {},

	expose_methods: {},
};
</script>