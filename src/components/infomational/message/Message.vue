<template>
	<div
		class="Message HLayout align-canter"
		v-bind:class="[styleClass, hide ? 'hide-msg' : '']"
	>
		<span>{{ value }}</span>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const STYLE = {
	primary: "msg-primary",
	success: "msg-success",
	danger: "msg-danger",
	info: "msg-info",
	dark: "msg-dark",
	default: "msg-primary",
};

export default {
	controlName: "l-message",

	name: "Message",

	data: function () {
		return {
			hide: true,
			timer: null,
			timerAnimation: null,
			animationTime: 400,
		};
	},

	props: {
		value: {
			type: String,
			default: "This is a piece of message",
			description: "Content of display.",
		},
		messageStyle: {
			type: String,
			default: "default",
			description: "Color theme of the message tile.",
			options: Object.keys(STYLE),
		},
		timeout: {
			type: Number,
			default: NaN,
			description:
				"Dissmiss the message after N ms, NaN for perminate messages",
		},
	},

	computed: {
		styleClass: function () {
			return normalizeInput(STYLE, this.messageStyle);
		},
	},

	methods: {
		dismiss: function () {
			this.hide = true;
		},
	},

	watch: {
		hide: function (newVal, oldVal) {
			// when the message being hide
			if (newVal !== oldVal && newVal) {
				this.timerAnimation = setTimeout(() => {
					// trigger the external onDismiss event when the animation is done
					this.$emit("onDismiss", this);
				}, this.animationTime);
			}
		},
	},

	mounted: function () {
		// delay for 100ms for playing the init animation
		setTimeout(() => {
			if (this.timeout) {
				this.timer = setTimeout(() => {
					this.dismiss();
				}, this.timeout + this.animationTime);
			}

			this.hide = false;
		}, 100);
	},

	beforeDestroy() {
		// clear all timers
		if (this.timerAnimation) {
			clearTimeout(this.timerAnimation);
			this.timerAnimation = null;
		}

		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	},

	expose_events: {},

	expose_methods: {
		dismiss: {
			description: "Programmatically dismiss the message",
		},
	},
};
</script>