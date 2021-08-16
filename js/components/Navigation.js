import Tag from "./Tag.js";

export default class Navigation {
	constructor(tags) {
		this.tags = tags;
	}

	renderTags() {
		const uniqueTags = [...new Set(this.tags)];
		return uniqueTags
			.map((tag) => {
				const tagComponent = new Tag(tag);
				return tagComponent.render();
			})
			.join("");
	}

	render() {
		return `
		<nav>
		<div class="photographer__tags">${this.renderTags()}</div>
		</nav>`;
	}
}
