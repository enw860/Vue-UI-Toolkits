<template>
	<div
		class="Timer VLayout flow-center align-center"
		v-bind:class="[sizeClass]"
		v-bind:style="textStyle"
	>
		<div>{{ displayTimeObj }}</div>
		<div v-if="!hideCtls">
			<Button
				v-if="timer"
				value="End"
				btnStyle="danger"
				:size="size"
				@click="terminate"
				:disabled="timer < 0"
			/>
			<Button
				v-else
				value="Start"
				btnStyle="primary"
				:size="size"
				@click="start"
			/>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";
import Button from "../button/Button.vue";

const SIZE = {
	auto: "",
	xsmall: "size-xsmall",
	small: "size-small",
	default: "size-normal",
	normal: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
	xxlarge: "size-xxlarge",
	xxxlarge: "size-xxxlarge",
};

const TIMESCALE = [
	{ field: "hh", scale: 60 * 60 * 1, match: "<hh>" },
	{ field: "mm", scale: 60 * 1, match: "<mm>" },
	{ field: "ss", scale: 1, match: "<ss>" },
];

const SECOND_IN_MS = 1000;

export default {
	controlName: "l-stopwatch",

	name: "Stopwatch",

	components: {
		Button,
	},

	data: function () {
		return {
			timer: null,
			remainingSeconds: this.timeObjToSeconds(this.value),
			alertMap: this.alerts.reduce((alertMap, alert) => {
				alertMap[`t_${this.timeObjToSeconds(alert.time)}`] = alert;
				return alertMap;
			}, {}),
		};
	},
	props: {
		value: {
			type: Object,
			default: () => {
				return { hh: 0, mm: 1, ss: 0 };
			},
			description: "hours, minutes, seconds",
		},
		timeFormat: {
			type: String,
			default: "<hh>:<mm>:<ss>",
			description:
				"Will replace <hh>, <mm>, <ss> to corresponding values",
		},
		alerts: {
			type: Array,
			default: () => {
				return [
					{ time: { hh: 0, mm: 0, ss: 30 }, message: "30s left!" },
				];
			},
			description: "Alert user when <time> left",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
		color: {
			type: String,
			default: "#000000",
			description: "Font color of the text.",
		},
		fontWeight: {
			type: Number,
			default: 400,
			description: "Font weight of the text.",
		},
		hideCtls: {
			type: Boolean,
			default: false,
			description: "Hide the control button or not",
		},
	},

	computed: {
		displayTimeObj: function () {
			const timeObj = this.secondsToTimeObj(this.remainingSeconds);
			return TIMESCALE.reduce((str, scale) => {
				const value = String(timeObj[scale.field]).padStart(2, "0");
				return str.replace(scale.match, value);
			}, this.timeFormat);
		},
		alertList: function () {
			return this.alerts.reduce((alertMap, alert) => {
				alertMap;
				return {
					...alert,
					seconds: this.timeObjToSeconds(alert.time),
				};
			}, {});
		},
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		textStyle: function () {
			return {
				fontWeight: this.fontWeight,
				color: this.color,
			};
		},
	},

	methods: {
		timeObjToSeconds: function (timeObj) {
			let totalSeconds = 0;
			TIMESCALE.forEach((scale) => {
				const fieldVal = timeObj[scale.field];
				if (fieldVal && fieldVal > 0) {
					totalSeconds += fieldVal * scale.scale;
				}
			});
			return totalSeconds;
		},
		secondsToTimeObj: function (seconds) {
			let remainingSeconds = seconds;
			const timeObj = { hh: 0, mm: 0, ss: 0 };

			return remainingSeconds <= 0
				? timeObj
				: TIMESCALE.reduce((time, scale) => {
						const fieldValue = Math.floor(
							remainingSeconds / scale.scale
						);
						remainingSeconds -= fieldValue * scale.scale;
						time[scale.field] = fieldValue;
						return time;
				  }, timeObj);
		},
		timerHandler: function () {
			if (this.remainingSeconds <= 0) {
				clearInterval(this.timer);
				return;
			} else {
				this.remainingSeconds -= 1;
			}

			if (this.remainingSeconds === 0) {
				this.terminate();
			} else {
				const alert = this.alertMap[`t_${this.remainingSeconds}`];
				if (alert) {
					!!this._events.alert && this.$emit("alert", alert.message);
				}
			}
		},
		start: function () {
			this.timer = setInterval(this.timerHandler, 1 * SECOND_IN_MS);
			!!this._events.start && this.$emit("start");
		},
		terminate: function () {
			clearInterval(this.timer);
			this.timer = -1;
			!!this._events.finish && this.$emit("finish");
		},
	},

	expose_events: {
		"@alert": {
			description:
				"Binded action, triggered when desiginated time anchor been triggered.",
		},
		"@start": {
			description: "Binded action, triggered on timer start.",
		},
		"@end": {
			description: "Binded action, triggered on timer finish.",
		},
	},

	expose_methods: {
		start: {
			description: "Programmatically start the timer.",
		},
		terminate: {
			description: "Programmatically terminate the timer.",
		},
	},
};
</script>