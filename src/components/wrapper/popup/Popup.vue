<template>
	<div class="Popup" v-bind:class="sizeClass">
		<slot name="trigger"></slot>
		<div
			ref="menu"
			class="popupContent VLayout"
			v-bind:class="[hide ? 'hide' : '', directionClass]"
			aria-label="popup menu"
		>
			<div
				class="action"
				v-for="(action, index) in actions"
				:key="`action${index}`"
			>
				<div
					role="button"
					v-if="action"
					ref="action"
					:tabindex="action.disabled ? '' : '0'"
					v-bind:class="action.disabled ? 'disabled' : ''"
					@click="action.method"
					@keydown="(event) => onkeydown(action.method, event, index)"
				>
					<a
						v-if="action.icon"
						class="fa"
						v-bind:class="action.icon"
					></a>
					<span>{{ action.name }}</span>
				</div>
				<div v-else class="separator"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../../utils/utilities";

const SIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

const DIRECTION = {
	left: "left",
	right: "right",
};

export default {
	controlName: "l-popup-wrapper",

	name: "Popup",

	timer: null,

	data: function () {
		return {
			hide: true,
		};
	},

	props: {
		value: {
			type: Array,
			default: [],
			description:
				"Options of the popup menu. [{name, icon, method, disabled}...]",
		},
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(SIZE),
		},
		direction: {
			type: String,
			default: "left",
			description: "Position of the icon in pop up menu.",
			options: Object.keys(DIRECTION),
		},
	},

	computed: {
		sizeClass: function () {
			return normalizeInput(SIZE, this.size);
		},
		directionClass: function () {
			return normalizeInput(DIRECTION, this.direction);
		},
		actions: function () {
			return this.value.map((action, index) => {
				return typeof action !== "object"
					? null
					: {
							name: action.name || `Action${index}`,
							icon: action.icon || "",
							method: action.disabled
								? function () {}
								: action.method || function () {},
							disabled: !!action.disabled,
					  };
			});
		},
	},

	methods: {
		onkeydown: function (callback, event, index) {
			const keycode = event.keyCode || event.which;

			if ([13, 32, 38, 40, 27].some((code) => code === keycode)) {
				event.preventDefault();
			}

			if ([13, 32].some((code) => code === keycode)) {
				callback(event);
			} else if (keycode === 38) {
				if (index !== 0) {
					this.$refs.action &&
						this.$refs.action[Math.max(index - 1, 0)] &&
						this.$refs.action[Math.max(index - 1, 0)].focus();
				}
			} else if (keycode === 40) {
				this.$refs.action &&
					this.$refs.action[index + 1] &&
					this.$refs.action[index + 1].focus();
			} else if (keycode === 27) {
				this.hide = true;
				window.removeEventListener(
					"click",
					this.hidePopupWithCheck,
					true
				);
			}
		},
		hidePopupWithCheck: function (event) {
			if (!this.$el.contains(event.target)) {
				this.hide = true;
				window.removeEventListener(
					"click",
					this.hidePopupWithCheck,
					true
				);
			}
		},
		showPopup: function () {
			this.hide = false;
			window.removeEventListener("click", this.hidePopupWithCheck, true);
			window.addEventListener("click", this.hidePopupWithCheck, true);
		},
		hidePopup: function () {
			this.hide = true;
			window.removeEventListener("click", this.hidePopupWithCheck, true);
		},
	},

	expose_methods: {
		showPopup: {
			description: "Programmatically showing the popup menu.",
		},
		hidePopup: {
			description: "Programmatically hiding the popup menu.",
		},
	},

	expose_slots: {
		trigger: {
			description:
				"Trigger control of the popup menu, could be an icon button.",
		},
	},
};
</script>