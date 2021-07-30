export default class Tag {
	constructor(tag) {
		this.tag = tag;
	}

	render() {
		return `<span class="photographer__tags__tag">#${this.tag}</span>`;
	}
}
