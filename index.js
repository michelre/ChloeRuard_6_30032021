import PhotographerCard from "./js/components/PhotographerCard.js";

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
				this.photographers = data.photographers;
				this.displayPhotographCards();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayPhotographCards() {
		const mainContainer = document.querySelector(".mainContainer");
		const cards = this.photographers.map((photographer) => {
			const photographerCard = new PhotographerCard(photographer);
			return photographerCard.render();
		});
		mainContainer.innerHTML = cards.join("");
	}
}

//Création d'un objet de la classe Index (Instance de la classe)
new Index();
