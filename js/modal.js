// modal form HTML creation
export const createForm =() =>{
	const mainContainer = document.querySelector(".mainContainer");
	mainContainer.innerHTML += `<div class="form__background">
			<div class="form__modal">
				<img src="img/closeX.svg" class="form__closeX" />
						<h1 class="form__title">Contactez-moi</h1>
							<div class="form__body">
								<form id="form" name="reserve" action="index.html" method="post">
									<div class="form__data">
										<label for="first">Prénom</label><br />
										<input class="text-control" type="text" id="first" name="first" minlength="2" /><br />
									</div>
									<div class="form__data">
										<label for="last">Nom</label><br />
										<input class="text-control" type="text" id="last" name="last" /><br />
									</div>
									<div class="form__data">
										<label for="email">Email</label><br />
										<input class="text-control" type="email" id="email" name="email" /><br />
									</div>
									<div class="form__data">
										<label for="message">Votre message</label><br />
										<textarea class="text-control" id="message" name="message" minlength="5"></textarea><br />
										<br />
									</div>
									<input type="submit" class="button button--submit" value="Envoyer" />
								</form>
							</div>
						</div>
					</div>`;

	// bouton launch modal HTML creation
	mainContainer.innerHTML += `<button class="button button--contact" alt="contact me" data-trigger="contact">
		Contactez-moi
		</button>`;

	// DOM Elements
	const modalBg = document.querySelector(".form__background");
	//const contactBtn = document.querySelectorAll(".button--contact");
	const formData = document.querySelectorAll(".form__data");
	//const closeBtn = document.querySelectorAll(".form__closeX");
	const form = document.querySelector("form[name=reserve]");
	const formBody = document.querySelector(".form__body");
	const firstNameForm = document.querySelector("#first");
	const lastNameForm = document.querySelector("#last");
	const emailForm = document.querySelector("#email");
	const messageForm = document.querySelector("#message");
	const submitBtn = document.querySelectorAll(".button--submit");
	
	// Délégation d'évènements
	document.addEventListener("click", (e) => {
		if(e.target.dataset.trigger === "contact"){
			launchModal();
		}
	});
	document.addEventListener("click", (e) => {
		if(e.target.dataset.trigger === "closeX"){
			closeModal();
		}
	});
	//contactBtn.forEach((btn) => btn.addEventListener("click", launchModal));
	//closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

	// launch modal form
	function launchModal() {
		const modalBg = document.querySelector(".form__background");
		modalBg.style.display = "block";
	}

	// close modal form
	function closeModal() {
		modalBg.style.display = "none";
	}

	// submit modal event
	form.addEventListener("submit", validate);

	// submit modal form

	let firstNameValidated = false;
	let lastNameValidated = false;
	let emailValidated = false;
	let messageValidated = false;

	const firstNameValidate = () => {
		// eslint-disable-next-line no-useless-escape
		if (firstNameForm.value.length < 2 || firstNameForm.value == null || !/^[A-Za-z\-\']+$/.test(firstNameForm.value)) {
			showError(firstNameForm, errorMessages.firstName);
			return (firstNameValidated = false);
		} else {
			hideError(firstNameForm);
			return (firstNameValidated = true);
		}
	};
	//Regex: accept letters from A to Z upper or lowercase, accept - and '

	const lastNameValidate = () => {
		// eslint-disable-next-line no-useless-escape
		if (lastNameForm.value.length < 2 || lastNameForm.value == null || !/^[A-Za-z\-\']+$/.test(lastNameForm.value)) {
			showError(lastNameForm, errorMessages.firstName);
			return (lastNameValidated = false);
		} else {
			hideError(lastNameForm);
			return (lastNameValidated = true);
		}
	};
	//Regex: accept letters from A to Z upper or lowercase, accept - and '

	const emailValidate = () => {
		// eslint-disable-next-line no-useless-escape
		if (emailForm.value == null || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailForm.value)) {
			showError(emailForm, errorMessages.email);
			return (emailValidated = false);
		} else {
			hideError(emailForm);
			return (emailValidated = true);
		}
	};
	//Regex: (one or more (+)(letters and digits 0 to 9 and _ - .)) @ (one or more (+)(letters and digits 0 to 9 and _ - .)) . (2 to 5 letters)

	const messageValidate = () => {
		if (messageForm.value.length < 5 || messageForm.value == null) {
			showError(messageForm, errorMessages.message);
			return (messageValidated = false);
		} else {
			hideError(messageForm);
			return (messageValidated = true);
		}
	};

	function validate(e) {
		e.preventDefault();
		firstNameValidate();
		lastNameValidate();
		emailValidate();
		messageValidate();
		if (firstNameValidated == true && lastNameValidated == true && emailValidated == true && messageValidated == true) {
			showSuccessMessage();
			hideFormData();
			modifySubmitButton();
		} else {
			console.log("formulaire incorrect");
		}
	}

	// Error message

	const errorMessages = {
		firstName: "Veuillez entrer 2 caractères ou plus.",
		lastName: "Veuillez entrer 2 caractères ou plus.",
		email: "Veuillez entrer une adresse email valide.",
		message: "Veuillez entrer 5 caractères ou plus.",
	};

	const showError = (selectedInput, errorMessage) => {
		selectedInput.parentElement.setAttribute("data-error-visible", "true");
		selectedInput.parentElement.setAttribute("data-error", errorMessage);
	};

	const hideError = (selectedInput) => {
		selectedInput.parentElement.removeAttribute("data-error-visible");
		selectedInput.parentElement.removeAttribute("data-error");
	};

	// Success message

	const showSuccessMessage = () => {
		const successMessage = document.createElement("span");
		successMessage.id = "success";
		successMessage.textContent = "Merci ! Votre message a bien été envoyé.";
		formBody.appendChild(successMessage);
		successMessage.style.position = "absolute";
		successMessage.style.top = "50%";
	};

	const hideFormData = () => {
		formData.forEach((data) => (data.style.visibility = "hidden"));
	};

	const modifySubmitButton = () => {
		submitBtn.forEach((btn) => btn.setAttribute("value", "Fermer"));
		submitBtn.forEach((btn) => btn.addEventListener("click", closeModal));
	};
};