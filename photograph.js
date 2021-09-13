import SortButton from "./js/components/SortButton.js";
import PhotographerHeader from "./js/components/PhotographerHeader.js";
import PhotographerMedia from "./js/components/PhotographerMedia.js";
import Header from "./js/components/Header.js";
import TotalLikes from "./js/components/TotalLikes.js";
import ModalForm from "./js/components/ModalForm.js";
import LightBox from "./js/LightBox.js";

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
				this.displayHeader();
				this.displayPhotographer();
				this.displayForm();

				this.mediums = data.media.filter((mediums) => {
					return mediums.photographerId === parseInt(id);
				});
				console.log(this.mediums);
				this.displayMedia(this.mediums);
				this.displaySort();
				this.sortMedia();
				this.displayTotalLikes();
				this.displayLightBox();
				this.incrementLikes();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayHeader() {
		const mainContainer = document.querySelector(".mainContainer");
		const header = new Header();
		mainContainer.innerHTML += header.render();
	}

	displayPhotographer() {
		const mainContainer = document.querySelector(".mainContainer");
		const photographerHeader = new PhotographerHeader(this.photographer);
		mainContainer.innerHTML += photographerHeader.render();
	}

	displayForm() {
		const mainContainer = document.querySelector(".mainContainer");
		const modalForm = new ModalForm(this.photographer);
		mainContainer.innerHTML += modalForm.renderbutton();
		mainContainer.innerHTML += modalForm.renderForm();
		modalForm.workingForm();
	}

	displayMedia(mediums) {
		const mainContainer = document.querySelector(".photograph__mediums");
		this.photographerMediaArray = [];
		const picture = mediums.map((medium) => {
			const photographerMedia = new PhotographerMedia(medium);
			this.photographerMediaArray.push(photographerMedia);
			return photographerMedia.render();
		});
		mainContainer.innerHTML = picture.join("");
	}

	displaySort() {
		const mainContainer = document.querySelector(".mainContainer");
		const sortButton = new SortButton();
		mainContainer.innerHTML += sortButton.render();
	}

	sortMedia() {
		document.addEventListener("change", (e) => {
			if (e.target.dataset.trigger === "select") {
				console.log(e.target.value);
				if (e.target.value == "titre") {
					let sortedMediums = this.mediums.sort((a, b) => {
						return a.title.localeCompare(b.title);
					});
					this.displayMedia(sortedMediums);
				}
				if (e.target.value == "date") {
					let sortedMediums = this.mediums.sort((a, b) => {
						const dateA = new Date(a.date);
						const dateB = new Date(b.date);
						return dateB - dateA;
					});
					this.displayMedia(sortedMediums);
				}
				if (e.target.value == "popularité") {
					let sortedMediums = this.mediums.sort((a, b) => {
						return b.likes - a.likes;
					});
					this.displayMedia(sortedMediums);
				}
			}
		});
	}

	displayTotalLikes() {
		const mainContainer = document.querySelector(".mainContainer");
		const likesNumber = document.querySelectorAll(".likes__number");
		const likesArray = Array.from(likesNumber).map((acc) => parseInt(acc.textContent));
		const likesSum = likesArray.reduce((total, likes) => total + likes, 0);
		this.totalLikes = new TotalLikes(this.photographer, likesSum);
		mainContainer.innerHTML += this.totalLikes.render();
	}

	incrementLikes() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "addLike") {
				const id = e.target.dataset.id;
				const photographerMedia = this.photographerMediaArray.find((medium) => {
					return medium.id == id;
				});
				if (photographerMedia) {
					photographerMedia.incrementLikes();
					this.totalLikes.incrementTotalLikes();
				}
			}
		});
	}

	displayLightBox() {
		const mainContainer = document.querySelector(".mainContainer");
		const lightbox = new LightBox(this.mediums);
		mainContainer.innerHTML += lightbox.render();
		lightbox.workingLightbox();
	}
}
new Photograph();
