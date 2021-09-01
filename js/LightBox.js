export default class LightBox {
	constructor(data) {
		this.title = data.title;
		this.date = data.date;
		this.image = data.image;
		this.video = data.video;
		this.likes = data.likes;
		this.alt = data.alt;
		this.photographerId = data.photographerId;
		this.id = data.id;
	}

	mediaFactory() {
		if (this.video == null) {
			return `
			<div class="lightbox__media">
				<img class="lightbox__img" src="img/${this.photographerId}/${this.image}" alt="${this.alt}">
			</div>
			<h2 class="lightbox__title">${this.title}</h2>`;
		} else {
			return `
			<div class="lightbox__media">
				<video class="lightbox__video" controls src="img/${this.photographerId}/${this.video}">
					<p> ${this.alt} </p>
				</video>
			</div>
			<h2 class="lightbox__title">${this.title}</h2>`;
		}
	}

	render() {
		return `
		<div class="lightbox__background">
			<div class="lightbox__modal" aria-label="image closeup view">
				<img src="img/closeX.svg" class="lightbox__closeX" data-trigger="lightbox__closeX" alt="close dialog"/>
				<img src="img/leftArrow.svg" class="lightbox__arrow" data-trigger="left" alt="previous image"/>
				<img src="img/rightArrow.svg" class="lightbox__arrow" data-trigger="right" alt="next image" />
				<div class="lightbox__mediaContainer">
				${this.mediaFactory()}
				</div>
			</div>
		</div>`;
	}
	workingLightbox() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger.includes("medium")) {
				launchLightbox();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "lightbox__closeX") {
				closeLightbox();
			}
		});

		const closeLightbox = () => {
			const lightboxBg = document.querySelector(".lightbox__background");
			lightboxBg.style.display = "none";
		};

		const launchLightbox = () => {
			const lightboxBg = document.querySelector(".lightbox__background");
			lightboxBg.style.display = "block";
		};

		const allMediums = document.querySelectorAll(".media__medium");
		console.log(allMediums);
		const nbMediums = allMediums.length;
		console.log(nbMediums);
		let i = 0;

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "right") {
				nextMedia();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "left") {
				previousMedia();
			}
		});

		const nextMedia = () => {
			allMediums[i].classList.remove("active");
			if (i < nbMediums - 1) {
				i++;
				console.log(i);
			} else {
				i = 0;
			}
			allMediums[i].classList.add("active");
		};

		const previousMedia = () => {
			allMediums[i].classList.remove("active");
			if (i > 0) {
				i--;
				console.log(i);
			} else {
				i = nbMediums - 1;
			}
			allMediums[i].classList.add("active");
		};
	}
}
