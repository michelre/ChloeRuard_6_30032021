import { createForm } from "./js/modal.js";
import SortButton from "./js/components/SortButton.js";
createForm();
import { createHeart } from "./js/heart.js";
createHeart();
import PhotographerCard from "./js/components/PhotographerCard.js";
import PhotographerMedia from "./js/components/PhotographerMedia.js";

class Photograph {
	constructor() {
		this.fetchData();
	}
	/**
	 * fetch data from json file
	 */
	fetchData() {
		const urlSearchParams = new URL(document.location).searchParams;
		const id = urlSearchParams.get("id");
		fetch("FishEyeData.json")
			.then((response) => response.json())
			.then((data) => {
				this.photographer = data.photographers.find((photographer) => {
					return photographer.id === parseInt(id);
				});
				this.displayPhotographer();
				this.medium = data.media.filter((medium) => {
					return medium.photographerId === parseInt(id);
				});
				console.log(this.medium);
				this.displayMedia();
				this.displaySort();
			})
			.catch(function (err) {
				console.log(err);
			});
	}
	displayPhotographer() {
		const mainContainer = document.querySelector(".mainContainer");
		const photographerCard = new PhotographerCard(this.photographer);
		mainContainer.innerHTML += photographerCard.render();
	}
	displayMedia() {
		const mainContainer = document.querySelector(".mainContainer");
		const picture = this.medium.map((mediumm) => {
			const photographerMedia = new PhotographerMedia(mediumm);
			return photographerMedia.render();
		});
		mainContainer.innerHTML += picture.join("");
	}
	displaySort() {
		const mainContainer = document.querySelector(".mainContainer");
		const sortButton = new SortButton();
		mainContainer.innerHTML += sortButton.render();
	}
}
new Photograph();
