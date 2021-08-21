// modal form HTML creation
export default class ModalForm {
	constructor(data) {
		this.name = data.name;
	}

	renderForm() {
		return `
		<div class="form__background">
			<div class="form__modal">
				<img src="img/closeX.svg" class="form__closeX" data-trigger="closeX" />
						<h1 class="form__title">Contactez-moi ${this.name}</h1>
							<div class="form__body">
								<form id="form" name="reserve" action="index.html" method="post" data-trigger="form">
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
	}

	// bouton launch modal HTML creation
	renderbutton() {
		return `
		<button class="button button--contact" alt="contact me" data-trigger="contact">
			Contactez-moi
		</button>`;
	}

	workingForm() {
		// Délégation d'évènements
		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "contact") {
				console.log("ok");
				launchModal();
			}
		});

		document.addEventListener("click", (e) => {
			if (e.target.dataset.trigger === "closeX") {
				console.log("ok");
				closeModal();
			}
		});

		document.addEventListener("submit", (e) => {
			if (e.target.dataset.trigger === "form") {
				console.log("ok");
				e.preventDefault();
				validate();
			}
		});

		// launch modal form
		const launchModal = () => {
			const modalBg = document.querySelector(".form__background");
			modalBg.style.display = "block";
		};

		// close modal form
		const closeModal = () => {
			const modalBg = document.querySelector(".form__background");
			modalBg.style.display = "none";
		};

		// submit modal form

		let firstNameValidated = false;
		let lastNameValidated = false;
		let emailValidated = false;
		let messageValidated = false;

		const firstNameValidate = () => {
			const firstNameForm = document.querySelector("#first");
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
			const lastNameForm = document.querySelector("#last");
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
			const emailForm = document.querySelector("#email");
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
			const messageForm = document.querySelector("#message");
			if (messageForm.value.length < 5 || messageForm.value == null) {
				showError(messageForm, errorMessages.message);
				return (messageValidated = false);
			} else {
				hideError(messageForm);
				return (messageValidated = true);
			}
		};

		const validate = () => {
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
		};

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
			const formBody = document.querySelector(".form__body");
			const successMessage = document.createElement("span");
			successMessage.id = "success";
			successMessage.textContent = "Merci ! Votre message a bien été envoyé à";
			formBody.appendChild(successMessage);
			successMessage.style.position = "absolute";
			successMessage.style.top = "50%";
		};

		const hideFormData = () => {
			const formData = document.querySelectorAll(".form__data");
			formData.forEach((data) => (data.style.visibility = "hidden"));
		};

		const modifySubmitButton = () => {
			const submitBtn = document.querySelectorAll(".button--submit");
			submitBtn.forEach((btn) => btn.setAttribute("value", "Fermer"));
			submitBtn.forEach((btn) => btn.addEventListener("click", closeModal));
		};
	}
}
