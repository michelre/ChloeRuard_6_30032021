export default class TotalLikes {
	constructor(photographer, allLikes) {
		this.price = photographer.price;
		this.likes = allLikes;
	}

	incrementTotalLikes(){
		//this.likes += 1;
		const photographerTotalLikes = document.querySelector(".photographer__totalLikes");
		//photographerTotalLikes.textContent = this.likes ++;
		const likesNumber = document.querySelectorAll(".likes__number");
		const likesArray = Array.from(likesNumber).map((acc) => parseInt(acc.textContent));
		const likesSum = likesArray.reduce((total, likes) => total + likes, 0);
		photographerTotalLikes.textContent = likesSum;
	}

	render() {
		return `
		<div class="photographer__info">
			<div class="photographer__totalLikes">${this.likes}</div>
			<div class="photographer__price">${this.price}€ / jour</div>
		</div>`;
	}
}
