// eslint-disable-next-line no-undef
export default class Heart {
	constructor(likes, id) {
		this.likes = likes;
		this.id = id;
	}
	render() {
		return `
			<div class="likes__number" >${this.likes}</div>
			<img class="likes__icon" alt="likes" src="img/heart.svg" data-trigger=${this.id}></img>`;
	}
}