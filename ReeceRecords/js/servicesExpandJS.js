// JavaScript Document

// Connects JS to DOM
document.addEventListener('DOMContentLoaded', () => {
	const buttonRecord = document.getElementById("recordingReadMore");		// Assigning consts to each button
	const buttonMixing = document.getElementById("mixingReadMore");
	const buttonMastering = document.getElementById("masteringReadMore");
		
	const pRecording = document.getElementById("recordingPara");			// Assigning consts to each paragraph which is additional
	const pMixing = document.getElementById("mixingPara");
	const pMastering = document.getElementById("masteringPara");

	function setupToggle(button, paragraph) { 								// stating function setupToggle, adding button listener for "click", assigning const isExpanded = paragraph classList while also adding "show" to its class, assigning read less/ read more based on isExpanded boolean state
		button.addEventListener("click", () => {
			const isExpanded = paragraph.classList.toggle("show");
			button.textContent = isExpanded ? "Read Less" : "Read More";
		});
	}

	setupToggle(buttonRecord, pRecording);									// Setting up corresponding button to paragraph listing
	setupToggle(buttonMixing, pMixing);
	setupToggle(buttonMastering, pMastering);
});












