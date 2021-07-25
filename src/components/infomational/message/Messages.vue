<template>
	<div class="Messages VLayout" v-bind:style="widthStyle">
		<Message
			ref="messages"
			v-for="msg in messages"
			:key="msg.id"
			:data-key="msg.id"
			:value="msg.value"
			:messageStyle="msg.messageStyle"
			:timeout="msg.timeout"
			@onDismiss="onMsgDismissed"
		/>
	</div>
</template>

<script>
import Message from "./Message.vue";

const STYLE = {
	primary: "msg-primary",
	success: "msg-success",
	danger: "msg-danger",
	info: "msg-info",
	dark: "msg-dark",
	default: "msg-primary",
};

export default {
	controlName: "l-messages",

	name: "Messages",

	components: {
		Message,
	},

	props: {
		maxWidth: {
			type: String,
			default: "",
			description: "Maximum width of each messages.",
		},
		messageStyle: {
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
			messages: [],
		};
	},

	computed: {
		widthStyle: function () {
			return this.maxWidth
				? {
						width: this.maxWidth,
						maxWidth: this.maxWidth,
						minWidth: this.maxWidth,
				  }
				: {};
		},
	},

	methods: {
		post: function ({
			value,
			messageStyle = this.messageStyle,
			timeout = this.timeout,
		}) {
			this.messages.push({
				value,
				messageStyle,
				timeout: timeout || this.timeout,
				id: `msg_${this.id_counter}`,
			});
			this.id_counter += 1;
			this.$emit("change", "post");
		},

		clearAll: function () {
			this.messages = [];
			this.$emit("change", "clearAll");
		},

		onMsgDismissed: function (dismissMsg) {
			const id = dismissMsg.$el.getAttribute("data-key");

			// get rid of dismissed msg items
			this.messages = (this.messages || []).reduce((msgs, msg) => {
				return id === msg.id ? msgs : [...msgs, msg];
			}, []);

			this.$emit("change", "dismiss");
		},
	},

	expose_events: {
		"@change(eventType)": {
			description:
				"Triggered when posting/dissmissing/clear all messages.",
		},
	},

	expose_methods: {
		"post(<message>)": {
			description:
				"<message>: {value, messageStyle, timeout} Post a message onto the stack.",
		},
		clearAll: {
			description: "Remove all message from the stack.",
		},
	},
};
</script>