<template>
	<div
		class="Separator"
		v-bind:class="directionClass"
		v-bind:style="style"
	></div>
</template>

<script>
import "./Separator.less";
import { normalizeInput } from "../../../utils/utilities";

export default {
	controlName: "l-separator",
	name: "Separator",
	data: function () {
		return {
			DIRECTION: {
				horizontal: "divide-horizontal",
				vertical: "divide-vertical",
			},
		};
	},
	props: {
		direction: {
			type: String,
			default: "horizontal",
		},
		color: {
			type: String,
			default: "",
		},
		thickness: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		directionClass: function () {
			return normalizeInput(this.DIRECTION, this.direction);
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