import Tag from "./Tag.js";

export default class PhotographerHeader {
	constructor(data) {
		this.name = data.name;
		this.city = data.city;
		this.country = data.country;
		this.id = data.id;
		this.portrait = data.portrait;
		this.price = data.price;
		this.tagline = data.tagline;
		this.tags = data.tags;
	}

	renderTags() {
		return this.tags
			.map((tag) => {
				const tagComponent = new Tag(tag);
				return tagComponent.render();
			})
			.join("");
	}

	render() {
		return `
	<section class="photographer__header">
		<div class="photographer__description">			
			<h1 class="photographer__name">${this.name}</h1>
			<div class="photographer__location">${this.city}, ${this.country}</div>
			<div class="photographer__tagline">${this.tagline}</div>
			<div class="photographer__tags">${this.renderTags()}</div>
		</div>
		<div photographer__contact></div>
		<div class="photographer__picture">
			<img src="img/thumbnails/${this.portrait}" alt="${this.name}">
		</div>
	</section>`;
	}
}