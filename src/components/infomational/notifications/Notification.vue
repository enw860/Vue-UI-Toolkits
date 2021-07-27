<template>
	<div
		class="Notification HLayout flow-start"
		v-bind:class="[styleClass, hide ? 'hide-msg' : '']"
	>
		<div v-if="!this.$slots['icon']" class="Notification-icon default-icon">
			<span v-bind:class="['fa', defaultIcon]" />
		</div>
		<slot class="Notification-icon" name="customeIcon"></slot>

		<div class="Notification-body VLayout">
			<l-text class="" :value="title" :fontWeight="600" />
			<l-text class="" :value="content" />
		</div>

		<div class="Notification-ctl">
			<l-button
				value=""
				icon="fa-close"
				btnStyle="transparent"
				@click="dismiss"
			/>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const STYLE = {
	primary: "noti-primary",
	success: "noti-success",
	danger: "noti-danger",
	info: "noti-info",
	dark: "noti-dark",
	default: "noti-primary",
};

export default {
	controlName: "l-notification",

	name: "Notification",

	data: function () {
		return {
			hide: true,
			timer: null,
			timerAnimation: null,
			animationTime: 500,
		};
	},

	props: {
		title: {
			type: String,
			default: "Title for your notification",
			description: "Title of the content.",
		},
		content: {
			type: String,
			default: "This is the content of the notification message",
			description: "Content of display.",
		},

		notificationStyle: {
			type: String,
			default: "default",
			description: "Color theme of the notification tile.",
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
		defaultIcon: function () {
			switch (this.styleClass) {
				case "noti-success":
					return "fa-check-circle";
				case "noti-danger":
					return "fa-exclamation-triangle";
				case "noti-info":
					return "fa-info-circle";
				case "noti-primary":
				case "noti-dark":
				default:
					return "fa-bell";
			}
		},
		styleClass: function () {
			return normalizeInput(STYLE, this.notificationStyle);
		},
	},

	methods: {
		dismiss: function () {
			this.hide = true;
		},
	},

	watch: {
		hide: function (newVal, oldVal) {
			// when the notification being hided
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
			description: "Programmatically dismiss the notification",
		},
	},
};
</script>