<template>
	<div
		class="Badge"
		v-bind:class="vPositionClass"
		v-bind:style="backgroundStyle"
	>
		<div class="badge-content-text">{{ displayingContent }}</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const VPOSITIONS = {
	top: "v-align-top",
	center: "v-align-center",
	bottom: "v-align-bottom",
};

export default {
	controlName: "l-badge",

	name: "Badge",

	data: function () {
		return {};
	},

	props: {
		vPosition: {
			type: String,
			default: "top",
			description: "Position where the badge shows.",
			options: Object.keys(VPOSITIONS),
		},
		content: {
			type: Number,
			default: 99,
			description: "Number of news. Cap in range [-99, 99].",
		},
		backgroundColor: {
			type: String,
			default: "#da1e28",
			description: "Background color of the badge control.",
		},
	},

	computed: {
		vPositionClass: function () {
			return normalizeInput(VPOSITIONS, this.vPosition || "top");
		},
		backgroundStyle: function () {
			return {
				backgroundColor: this.backgroundColor,
			};
		},
		displayingContent: function () {
			return this.content > 99
				? "+99"
				: this.content < -99
				? "-99"
				: this.content || "";
		},
	},
};
</script>