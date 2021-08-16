export default class TotalLikes {
	constructor(photographer, allLikes) {
		this.price = photographer.price;
		this.likes = allLikes;
	}

	render() {
		return `
		<div class="photographer__info">
			<div class="photographer__totalLikes">${this.likes}</div>
			<div class="photographer__price">${this.price}€ / jour</div>
		</div>`;
	}
}
