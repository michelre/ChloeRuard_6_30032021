import PhotographerCard from "./js/components/PhotographerCard.js";
import Header from "./js/components/Header.js";
import ContentButton from "./js/components/ContentButton.js";
import Navigation from "./js/components/Navigation.js";

class Index {
	constructor() {
		this.fetchData();
	}

	/**
	 * fetch data from json file
	 */
	fetchData() {
		fetch("FishEyeData.json")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.photographers = data.photographers;
				this.displayHeader();
				this.displayNavigation();
				this.displayPhotographCards(this.photographers);
				this.sortPhotographers();
				this.displayContentButton();
				this.contentButtonScroll();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayHeader() {
		const headerContainer = document.querySelector(".headerContainer");
		const header = new Header();
		headerContainer.innerHTML += header.render();
	}

	displayNavigation() {
		const headerContainer = document.querySelector(".headerContainer");
		const allTags = this.photographers
			.map((photographer) => {
				return photographer.tags;
			})
			.flat();
		const navigation = new Navigation(allTags);
		headerContainer.innerHTML += navigation.render();
	}

	displayPhotographCards(photographers) {
		const photographerCards = document.querySelector(".photographers__cards");
		const cards = photographers.map((photographer) => {
			const photographerCard = new PhotographerCard(photographer);
			return photographerCard.render();
		});
		photographerCards.innerHTML = cards.join("");
	}

	sortPhotographers() {
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "tag") {
				console.log(e.target.dataset.id);
				let filteredPhotographs = this.photographers.filter((photographer) =>
					photographer.tags.includes(e.target.dataset.id)
				);
				this.displayPhotographCards(filteredPhotographs);
			}
		});
	}

	displayContentButton() {
		const mainContainer = document.querySelector(".mainContainer");
		const contentButton = new ContentButton();
		mainContainer.innerHTML += contentButton.render();
	}

	contentButtonScroll() {
		const contentButton = document.querySelector(".button--content");
		window.addEventListener("scroll", () => {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				contentButton.style.display = "block";
			} else {
				contentButton.style.display = "none";
			}
		});
		contentButton.addEventListener("click", () => {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 20;
		});
	}
}

//Cr??ation d'un objet de la classe Index (Instance de la classe)
new Index();
