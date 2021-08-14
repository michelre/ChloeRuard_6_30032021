import PhotographerCard from "./js/components/PhotographerCard.js";
import Header from "./js/components/Header.js";
import ContentButton from "./js/contentButton.js";

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
				this.displayPhotographCards();
				this.displayContentButton();
				this.contentButtonScroll();
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	displayHeader(){
		const mainContainer = document.querySelector(".mainContainer");
		const header = new Header;
		mainContainer.innerHTML += header.render();
	}

	displayPhotographCards() {
		const mainContainer = document.querySelector(".mainContainer");
		const cards = this.photographers.map((photographer) => {
			const photographerCard = new PhotographerCard(photographer);
			return photographerCard.render();
		});
		mainContainer.innerHTML += cards.join("");
	}

	displayContentButton(){
		const mainContainer = document.querySelector(".mainContainer");
		const contentButton = new ContentButton;
		mainContainer.innerHTML += contentButton.render();
	}

	contentButtonScroll(){
		const contentButton = document.querySelector(".button--content");
		console.log(contentButton);
		console.log(document.body.scrollTop);
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

//Création d'un objet de la classe Index (Instance de la classe)
new Index();
