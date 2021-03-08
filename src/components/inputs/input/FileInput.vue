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

export default {
	name: "l-input-file",
	data: function () {
		return {
			files: [],
		};
	},
	props: {
		size: {
			type: String,
			default: "default",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		multipleFile: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
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
};
</script>