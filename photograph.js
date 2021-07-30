import { createForm } from "./js/modal.js";
import { createSort } from "./js/sort.js";
createForm();
createSort();
import { createHeart } from "./js/heart.js";
createHeart();
import PhotographerCard from "./js/components/PhotographerCard.js";
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
}
new Photograph();
