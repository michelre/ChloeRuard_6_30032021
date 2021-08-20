export default class Tag {
	constructor(tag) {
		this.tag = tag;
	}

	render() {
		return `<span class="photographer__tags__tag" data-id="${this.tag}" data-trigger="tag">#${this.tag}</span>`;
	}
}
