export default class PhotographerMedia {
	constructor(data) {
		this.title = data.title;
		this.date = data.date;
		this.image = data.image;
		this.likes = data.likes;
		this.alt = data.alt;
		this.photographerId = data.photographerId;
	}

	render() {
		return `<article class="picture">
                <div class="picture__img">
                  <img src="img/${this.photographerId}/${this.image}" alt="${this.alt}">
                </div>
								<div class="picture__legend">
									<h2 class="picture__title">${this.title}</h2>
									<div class="picture__likes">${this.likes}</div>
								</div>
        </article>`;
	}
}