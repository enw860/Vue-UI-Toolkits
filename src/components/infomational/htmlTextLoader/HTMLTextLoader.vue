<template>
	<div class="HTMLTextLoaderWrapper">
		<div class="HTMLTextHeaderWrapper HLayout flow-end">
			<span>{{ type }}</span>
		</div>
		<div ref="loader" class="HTMLTextLoader"></div>
		<div class="HTMLTextFooterWrapper HLayout flow-end"></div>
	</div>
</template>

<script>
export default {
	controlName: "l-html-text-loader",

	name: "HTMLTextLoader",

	data: function () {
		return {
			lineCounter: 0,
			parsedTags: [],
			SYNTAX: {
				COMMENT_TAG: {
					name: "comment_tag",
					expression: /^(<!--)(.*)(-->)$/,
				},
				CLOSE_TAG: {
					name: "close_tag",
					expression: /^(<\/)([\w+-?]+)\s*(>)$/,
				},
				SELF_CLOSE_TAG: {
					name: "self_close_tag",
					expression: /^(<)([\w+-?]+)\s*(.*)(\/>)$/,
				},
				OPEN_TAG: {
					name: "open_tag",
					expression: /^(<)([\w+-?]+)\s*(.*)(>)$/,
				},
				INLINE_TEXT: {
					name: "inline_text",
					expression: /.+/,
				},
				ATTRIBUTE: {
					name: "attribute",
					expression: /([:@]?[a-zA-Z](-?[a-zA-Z0-9])*)(="[^"]*")\s*/,
				},
				STATUS: {
					name: "status",
					expression: /([a-zA-Z](-?[a-zA-Z0-9])*)\s*/,
				},
			},
		};
	},

	props: {
		value: {
			type: String,
			default: "",
			description: "DOM style code.",
		},
		type: {
			type: String,
			default: "<HTML>",
			description: "Type label of the control.",
		},
		wrapOffset: {
			type: Number,
			default: 3,
			description: "Min number of attributes will trigger tag wrap up.",
		},
	},

	methods: {
		getTag: function (value = "") {
			let tagStart = -1;
			let openQuotes = [];
			let QUOTES = ['"', "'", "`"];

			if (!value) {
				return null;
			}

			for (let index = 0; index < value.length; index++) {
				const c = value[index];

				if (c === "<" && tagStart < 0) {
					tagStart = index;
				} else if (
					c === ">" &&
					openQuotes.length === 0 &&
					tagStart > -1
				) {
					return {
						matchedStr: value.substring(tagStart, index + 1),
						tagStart: tagStart,
						endIndex: index,
					};
				} else if (QUOTES.indexOf(c) > -1 && tagStart > -1) {
					if (openQuotes[openQuotes.length - 1] === c) {
						openQuotes.pop();
					} else {
						openQuotes.push(c);
					}
				} else if (c === "<" && openQuotes.length === 0) {
					throw "ERROR: unexpected <";
				}
			}

			if (openQuotes.length > 0) {
				throw "ERROR: unclosed quotes";
			}

			throw "ERROR: unclosed tag";
		},
		getTags: function* () {
			let source = this.value || "";
			let tag = this.getTag(source);
			while (tag) {
				const inlineText = source
					.substring(0, tag.tagStart)
					.trimLeft()
					.trimRight();
				if (inlineText) {
					yield inlineText;
				}

				yield tag.matchedStr;

				source = source.substring(tag.endIndex + 1);
				tag = this.getTag(source);
			}
		},
		getClasscification: function (tag) {
			const matchingOrder = [
				this.SYNTAX.COMMENT_TAG,
				this.SYNTAX.CLOSE_TAG,
				this.SYNTAX.SELF_CLOSE_TAG,
				this.SYNTAX.OPEN_TAG,
				this.SYNTAX.INLINE_TEXT,
			];

			for (let { name, expression } of matchingOrder) {
				const result = tag.match(expression);
				if (result) {
					return {
						type: name,
						result,
					};
				}
			}

			return {};
		},
		generateParsedTag: function (classcification) {
			if (classcification === {}) {
				return {};
			} else if (classcification.type === "inline_text") {
				return {
					type: classcification.type,
					value: classcification.result[0],
				};
			} else if (classcification.type === "comment_tag") {
				return {
					type: classcification.type,
					value: classcification.result[2],
				};
			} else if (classcification.type === "close_tag") {
				return {
					type: classcification.type,
					element: classcification.result[2],
				};
			} else {
				return {
					type: classcification.type,
					element: classcification.result[2],
					...this.parseAttrStatus(classcification.result[3] || ""),
				};
			}
		},
		parseAttrStatus: function (str) {
			let input = str;
			const ret = {
				attributes: [],
				status: [],
			};

			if (str === "") return;

			let result = input.match(this.SYNTAX.ATTRIBUTE.expression);
			while (result) {
				ret.attributes.push({
					name: result[1],
					value: result[3],
				});

				input = this.cutTextAtRange(
					input,
					result.index,
					result[0].length
				);
				result = input.match(this.SYNTAX.ATTRIBUTE.expression);
			}

			result = input.match(this.SYNTAX.STATUS.expression);
			while (result) {
				ret.status.push({
					name: result[1],
					value: "",
				});
				input = this.cutTextAtRange(
					input,
					result.index,
					result[0].length
				);
				result = input.match(this.SYNTAX.STATUS.expression);
			}

			if (input !== "") {
				console.error("Uncatched terms: ", input);
			}

			return ret;
		},
		cutTextAtRange: function (str = "", init = 0, end = 0) {
			if (init <= end && init >= 0 && end <= str.length) {
				return str.substring(0, init) + str.substring(end);
			}
			return "";
		},
		tokenizedTags: function () {
			this.parsedTags = [];
			const tags = this.getTags();

			let result = tags.next();
			while (!result.done) {
				const tag = [
					this.getClasscification,
					this.generateParsedTag,
				].reduce((acc, callback) => {
					return callback(acc);
				}, result.value);

				this.parsedTags.push(tag);
				result = tags.next();
			}

			return;
		},
		createParseTree: function (root) {
			if (this.parsedTags.length === 0) {
				return root || {};
			}

			let [tag, ...rest] = this.parsedTags;
			this.parsedTags = rest;

			let node = {
				...tag,
				children: [],
			};

			if (!root) {
				return this.createParseTree(node);
			} else {
				if (
					["comment_tag", "self_close_tag", "inline_text"].indexOf(
						node.type
					) > -1
				) {
					root.children = [...root.children, node];
					return this.createParseTree(root);
				} else if (node.type === "close_tag") {
					return root;
				} else {
					root.children = [
						...root.children,
						this.createParseTree(node),
					];
					const [nextTag, ..._] = this.parsedTags;
					nextTag && this.createParseTree(root);
				}
			}

			return root;
		},
		updateParseTree: function () {
			try {
				[
					this.tokenizedTags,
					this.createParseTree,
					this.plotParseTree,
				].reduce((acc, callback) => {
					return callback(acc);
				}, null);

				this.adjustContentWidth();

				this.emitError(null);
			} catch (e) {
				this.emitError(e);
			}
		},
		indentation: function (level) {
			return Array(level || 0)
				.fill("\t")
				.join("");
		},
		plotParseTree: function (parseTree) {
			// clean previous plots
			const loader = this.$refs.loader;
			loader.innerHTML = "";

			// clean the line counter
			this.lineCounter = 0;

			this.drawLines(parseTree, 0);
		},
		drawLines: function (parseTree, level = 0) {
			if (parseTree) {
				const codeSpan = this.assignACodeLine(level);

				const lineSpan = codeSpan.parentNode;
				const currentLineNumber = this.getCurrentLineNumber();

				const subItems =
					(parseTree.attributes || []).length +
					(parseTree.status || []).length;

				// plot open tag
				const tailingEleParent = this.beautify(
					codeSpan,
					parseTree,
					false,
					subItems > this.wrapOffset,
					level
				);

				if (
					parseTree.type === "open_tag" &&
					parseTree.children.length === 1 &&
					parseTree.children[0].type === "inline_text"
				) {
					this.beautify(
						tailingEleParent,
						parseTree.children[0],
						false,
						false,
						level
					);

					this.beautify(
						tailingEleParent,
						parseTree,
						true,
						false,
						level
					);
				} else if (
					parseTree.type === "open_tag" &&
					parseTree.children.length === 0
				) {
					this.beautify(
						tailingEleParent,
						parseTree,
						true,
						false,
						level
					);
				} else {
					parseTree.children.map((node) => {
						this.drawLines(node, level + 1);
					});

					if (parseTree.type === "open_tag") {
						// plot close tag
						this.beautify(
							this.assignACodeLine(level),
							parseTree,
							true,
							false,
							level
						);
						this.appendLineCollaspeEvent(
							lineSpan,
							currentLineNumber,
							this.getCurrentLineNumber()
						);
					}
				}
			}
		},
		assignACodeLine: function (level) {
			const lineSpan = this.createTextElement(
				"pre",
				null,
				"Line",
				this.$refs.loader
			);

			this.createTextElement(
				"span",
				this.assignALineNumber(),
				"Line-Index",
				lineSpan
			);

			this.createTextElement("span", null, "Line-Control", lineSpan);

			const codeSpan = this.createTextElement(
				"span",
				null,
				"Line-Code",
				lineSpan
			);

			this.createTextElement(
				"span",
				this.indentation(level),
				null,
				codeSpan
			);

			return codeSpan;
		},
		assignALineNumber: function () {
			this.lineCounter += 1;
			return this.lineCounter;
		},
		getCurrentLineNumber: function () {
			return this.lineCounter;
		},
		beautify: function (
			codeSpan,
			node,
			isCloseTag,
			subItemsToNewLevel = false,
			level
		) {
			if (!codeSpan) return;

			if (
				node.type === "self_close_tag" ||
				(node.type === "open_tag" && !isCloseTag)
			) {
				this.createTextElement("span", "<", null, codeSpan);
				this.createTextElement(
					"em",
					node.element,
					"HTMLTag spacer",
					codeSpan
				);

				(node.attributes || []).map((attr) => {
					const targetSpan = subItemsToNewLevel
						? this.assignACodeLine(level + 1)
						: codeSpan;

					this.createTextElement(
						"em",
						attr.name,
						"HTMLAttribute",
						targetSpan
					);
					this.createTextElement(
						"span",
						attr.value,
						"spacer",
						targetSpan
					);
				});

				(node.status || []).map((state) => {
					const targetSpan = subItemsToNewLevel
						? this.assignACodeLine(level + 1)
						: codeSpan;

					this.createTextElement(
						"em",
						state.name,
						"HTMLStatues spacer",
						targetSpan
					);
				});

				const closingLine = subItemsToNewLevel
					? this.assignACodeLine(level)
					: codeSpan;
				if (node.type === "self_close_tag") {
					this.createTextElement("span", "/>", null, closingLine);
				} else {
					this.createTextElement("span", ">", null, closingLine);
				}
				return closingLine;
			} else if (node.type === "open_tag" && isCloseTag) {
				this.createTextElement("span", "</", null, codeSpan);
				this.createTextElement("em", node.element, "HTMLTag", codeSpan);
				this.createTextElement("span", ">", null, codeSpan);
			} else if (node.type === "inline_text") {
				this.createTextElement("span", node.value, null, codeSpan);
			} else {
				this.createTextElement(
					"span",
					`<!--${node.value}-->`,
					"HTMLComment",
					codeSpan
				);
			}
			return codeSpan;
		},
		createTextElement: function (eleType, text, eleClass, parent) {
			let ele = document.createElement(eleType);

			if (eleClass) {
				ele.setAttribute("class", eleClass);
			}

			if (text) {
				ele.innerText = text;
			}

			if (parent) {
				parent.appendChild(ele);
			}

			return ele;
		},
		appendLineCollaspeEvent: function (lineSpan, startLine, endLine) {
			lineSpan.classList.add("expandible", "expanded");

			const view = this;
			const lineIndex = lineSpan.querySelector(".Line-Control");
			lineIndex.addEventListener(
				"click",
				function (event) {
					if (lineSpan.classList.contains("expanded")) {
						lineSpan.classList.remove("expanded");
						lineSpan.classList.add("collasped");
						view.togglesLines(false, startLine, endLine);
					} else {
						lineSpan.classList.remove("collasped");
						lineSpan.classList.add("expanded");
						view.togglesLines(true, startLine, endLine);
					}
				},
				true
			);
		},
		togglesLines: function (show, startLine, endLine) {
			const loader = this.$refs.loader;
			const lines = loader.querySelectorAll("pre.Line");
			lines.forEach((line, index) => {
				if (index >= startLine && index <= endLine - 2) {
					if (show) {
						line.classList.contains("hide") &&
							line.classList.remove("hide");
					} else {
						!line.classList.contains("hide") &&
							line.classList.add("hide");
					}

					if (line.classList.contains("collasped")) {
						line.classList.remove("collasped");
						line.classList.add("expanded");
					}
				}
			});
		},
		adjustContentWidth: function () {
			const loader = this.$refs.loader;
			const lines = loader.querySelectorAll("pre.Line > .Line-Code");

			let baseWidth = this.$refs.loader.getBoundingClientRect().width;
			lines.forEach((line, index) => {
				let lineWidth = line.getBoundingClientRect().width + 100;
				if (lineWidth > baseWidth) {
					baseWidth = lineWidth;
				}
			});

			if (baseWidth !== this.$refs.loader.getBoundingClientRect().width) {
				this.$refs.loader.style.width = baseWidth + "px";
			}
		},
		emitError: function (error) {
			this.error = error;
			!!this._events.error && this.$emit("error", this.error);
		},
	},

	watch: {
		value: function (newVal, oldVal) {
			newVal && this.updateParseTree();
		},
		wrapOffset: function (newVal, oldVal) {
			newVal && this.updateParseTree();
		},
	},

	mounted: function () {
		this.value && this.updateParseTree();
	},

	expose_events: {
		"@error": {
			description:
				"Binded action, triggered when there are some error on the input DOM tree.",
		},
	},
};
</script>