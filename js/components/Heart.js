// eslint-disable-next-line no-undef
export default class Heart {
	constructor(likes, id) {
		this.likes = likes;
		this.id = id;
	}

	incrementLikes() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger == this.id) {
				const numberL = document.querySelector(`[data-likes='${this.id}']`);
				numberL.textContent= this.likes +1;
			}
		});
	}

	render() {
		return `
			<div class="likes__number" data-likes=${this.id}>${this.likes}</div>
			<img class="likes__icon" alt="likes" src="img/heart.svg" data-trigger=${this.id}></img>`;
	}
}