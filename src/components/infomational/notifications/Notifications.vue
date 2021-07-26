<template>
	<div class="Notifications VLayout" v-bind:style="widthStyle">
		<Notification
			ref="notifications"
			v-for="noti in notifications"
			:key="noti.id"
			:data-key="noti.id"
			:title="noti.title"
			:content="noti.content"
			:notificationStyle="noti.notificationStyle"
			:timeout="noti.timeout"
			@onDismiss="onDismissed"
		/>
	</div>
</template>

<script>
import Notification from "./Notification.vue";

const STYLE = {
	primary: "noti-primary",
	success: "noti-success",
	danger: "noti-danger",
	info: "noti-info",
	dark: "noti-dark",
	default: "noti-primary",
};

export default {
	controlName: "l-notifications",

	name: "Notifications",

	components: {
		Notification,
	},

	props: {
		width: {
			type: String,
			default: "",
			description:
				"Width of notification, ecllips shows on text overflow.",
		},
		notificationStyle: {
			type: String,
			default: "default",
			description:
				"If incoming post does not provide style info then use this as the default style.",
			options: Object.keys(STYLE),
		},
		timeout: {
			type: Number,
			default: NaN,
			description:
				"If incoming post does not provide timeout info then use this as the default style.",
		},
	},

	data: function () {
		return {
			id_counter: 0,
			notifications: [],
		};
	},

	computed: {
		widthStyle: function () {
			return this.width
				? {
						width: this.width,
						maxWidth: this.width,
						minWidth: this.width,
				  }
				: {};
		},
	},

	methods: {
		post: function ({
			title,
			content,
			notificationStyle = this.notificationStyle,
			timeout = this.timeout,
		}) {
			this.notifications.push({
				title,
				content,
				notificationStyle,
				timeout: timeout || this.timeout,
				id: `noti_${this.id_counter}`,
			});
			this.id_counter += 1;
			this.$emit("change", "post");
		},

		clearAll: function () {
			this.notifications = [];
			this.$emit("change", "clearAll");
		},

		onDismissed: function (dismissNoti) {
			const id = dismissNoti.$el.getAttribute("data-key");

			// get rid of dismissed notification item
			this.notifications = (this.notifications || []).reduce(
				(notis, noti) => {
					return id === noti.id ? notis : [...notis, noti];
				},
				[]
			);

			this.$emit("change", "dismiss");
		},
	},

	expose_events: {
		"@change(eventType)": {
			description:
				"Triggered when posting/dissmissing/clear all notifications.",
		},
	},

	expose_methods: {
		"post(<notification>)": {
			description: "<notification>: .",
		},
		clearAll: {
			description: "Remove all notifications from the stack.",
		},
	},
};
</script>