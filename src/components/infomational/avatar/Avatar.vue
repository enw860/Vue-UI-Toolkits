<template>
	<div
		class="Avatar"
		v-bind:class="[shapeClass, avatarSizeClass, isActive ? '' : 'disabled']"
		v-bind:tabindex="clickable && isActive ? '0' : ''"
		@click="onclick"
	>
		<div
			class="AvatarContent VLayout flow-center align-center"
			v-bind:style="avatarStyle"
		>
			<div class="disabler"></div>
			<img v-if="avatarContentType === 'image'" v-bind:src="content" />
			<i
				v-else-if="avatarContentType === 'icon'"
				v-bind:class="['fa', content]"
				v-bind:style="avatarIconColor"
			></i>
			<div v-else v-bind:style="avatarIconColor">{{ avatarContent }}</div>
		</div>

		<slot name="badge"></slot>
	</div>
</template>

<script>
import { normalizeInput, randDarkColor } from "../../../utils/utilities";

const SHAPES = {
	round: "avatar-round",
	square: "avatar-square",
};

const SIZES = {
	default: "avatar-normal",
	small: "avatar-small",
	large: "avatar-large",
	xlarge: "avatar-xlarge",
};

const TYPES = {
	text: "text",
	image: "image",
	icon: "icon",
};

export default {
	controlName: "l-avatar",

	name: "Avatar",

	data: function () {
		return {};
	},

	props: {
		isActive: {
			type: Boolean,
			default: true,
			description: "Active state of the control.",
		},
		shape: {
			type: String,
			default: "round",
			description: "Shape of the control.",
			options: Object.keys(SHAPES),
		},
		type: {
			type: String,
			default: "text",
			description: "Type of the control.",
			options: Object.keys(TYPES),
		},
		avatarSize: {
			type: String,
			default: "default",
			description: "Size of the control.",
			options: Object.keys(SIZES),
		},
		avatarColor: {
			type: String,
			description:
				"Background color of the avatar (for text and icon type). If not unset, an random color will picked for you.",
		},
		iconColor: {
			type: String,
			default: "#ffffff",
			description: "Color of the icon.",
		},
		content: {
			type: String,
			default: "avatar",
			description:
				"Name to the text type; fontawesome class name to the icon type; url for the image type.",
		},
	},

	computed: {
		shapeClass: function () {
			return normalizeInput(SHAPES, this.shape);
		},
		avatarSizeClass: function () {
			return normalizeInput(SIZES, this.avatarSize);
		},
		avatarContentType: function () {
			return normalizeInput(TYPES, this.type);
		},
		avatarContent: function () {
			if (this.avatarContentType === "text") {
				let words = this.content
					.split(" ")
					.map((word) => word[0].toUpperCase());
				return words.length > 1
					? words.splice(0, 2).join("")
					: words.length === 0
					? ""
					: words[0];
			} else {
				return this.content;
			}
		},
		clickable: function () {
			return !!this._events.click;
		},
		avatarStyle: function () {
			return {
				backgroundColor:
					this.avatarColor || randDarkColor(this.content),
			};
		},
		avatarIconColor: function () {
			return {
				color: this.iconColor,
			};
		},
	},

	methods: {
		onclick: function (event) {
			!!this.clickable && this.isActive && this.$emit("click", event);
		},
	},

	expose_events: {
		"@click": {
			description: "Binded action, triggered on avatar being clicked.",
		},
	},

	expose_methods: {
		onclick: {
			description: "Programmatically trigger avatar click event.",
		},
	},

	expose_slots: {
		badge: {
			description: "Design for embedding badge control.",
		},
	},
};
</script>
