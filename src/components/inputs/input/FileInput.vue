<template>
	<div
		class="InputBox"
		v-bind:class="[inputSize, isDisabled ? 'disabled' : '']"
	>
		<div class="InputWrap InputField HLayout align-center">
			<input
				ref="fileInput"
				type="file"
				@change="onchange"
				:multiple="multipleFile"
			/>
			<l-button
				btnStyle="primary"
				icon="fa-upload"
				:value="btnText"
				:size="size"
				:disabled="isDisabled"
				:aria-describedby="describeBy"
				@click="chooseFiles"
			></l-button>
		</div>
	</div>
</template>

<script>
import "./Inputs.less";
import { normalizeInput } from "../../../utils/utilities";

const INPUTSIZE = {
	small: "size-small",
	default: "size-normal",
	large: "size-large",
	xlarge: "size-xlarge",
};

export default {
	controlName: "l-input-file",

	name: "FileInput",

	data: function () {
		return {
			files: [],
		};
	},

	props: {
		size: {
			type: String,
			default: "default",
			description: "Size of the text.",
			options: Object.keys(INPUTSIZE),
		},
		disabled: {
			type: Boolean,
			default: false,
			description: "Disable the file input button.",
		},
		multipleFile: {
			type: Boolean,
			default: false,
			description: "Enable to choose multiple files.",
		},
	},

	computed: {
		inputSize: function () {
			return this.size
				? normalizeInput(INPUTSIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(INPUTSIZE, "default");
		},
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		btnText: function () {
			const filesCount = this.files.length;
			return !!filesCount
				? `${filesCount} ${
						filesCount === 1 ? "file is" : "files are"
				  } choosen`
				: this.multipleFile
				? "Choose files"
				: "Choose file";
		},
	},

	methods: {
		onchange: function (event) {
			this.files = event.target.files;
			!this.isDisabled &&
				!!this._events.change &&
				this.$emit("change", event);
		},
		getValue: function () {
			return this.files;
		},
		chooseFiles: function (event) {
			this.$refs.fileInput.click();
		},
	},

	expose_events: {
		"@change": {
			description: "Binded action, triggered on value being expanded.",
		},
	},

	expose_methods: {
		getValue: {
			description: "Get the value of the selected files.",
		},
		chooseFiles: {
			description:
				"Programmatically trigger the choose file functionalities.",
		},
	},
};
</script>