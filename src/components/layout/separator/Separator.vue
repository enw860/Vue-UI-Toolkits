<template>
	<div
		class="Separator"
		v-bind:class="directionClass"
		v-bind:style="style"
	></div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const DIRECTION = {
	horizontal: "divide-horizontal",
	vertical: "divide-vertical",
};

export default {
	controlName: "l-separator",

	name: "Separator",

	data: function () {
		return {};
	},

	props: {
		direction: {
			type: String,
			default: "horizontal",
			description: "Direction of the separator",
			options: Object.keys(DIRECTION),
		},
		color: {
			type: String,
			default: "#000000",
			description: "Color of the separator.",
		},
		thickness: {
			type: Number,
			default: 1,
			description: "Thickness of the separator.",
		},
	},
	computed: {
		directionClass: function () {
			return normalizeInput(DIRECTION, this.direction);
		},
		style: function () {
			return {
				backgroundColor: this.color,
				width:
					this.directionClass === "divide-horizontal"
						? "100%"
						: `${this.thickness}px`,
				height:
					this.directionClass === "divide-horizontal"
						? `${this.thickness}px`
						: "100%",
			};
		},
	},
};
</script>