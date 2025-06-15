// JavaScript Document

// Connects JS to DOM
document.addEventListener('DOMContentLoaded', () => {  // Adds event listner for DOM
	const toggles = document.querySelectorAll('.hamburgerIcon');  // creates constant for .hamburgerIcon class
	const mobileMenu = document.querySelector('.aside');  // creates constant for .aside class

	toggles.forEach(toggle => {  // selected each checkbox within the toggle const
		toggle.addEventListener('change', () => {  // Event listener looking for change in checkbox
			const newState = toggle.checked;  // Assigns const newState to toggle state checked
			
			// Sync all checkboxes
			toggles.forEach(box => {  // Selected each checkbox within the toggle const, specifying the checkbox itself
				box.checked = newState;  // applying the new checked state to all checkboxes within the icon
			});

			// Open or close the sidebar
			if (newState) {
				mobileMenu.style.translate = '0 -10%';		// checks if new state is "true", checking if check box is ticked then shows side bar
			} else {
				mobileMenu.style.translate = '-100% -10%';	// If checkbox isn't ticked, don't show sidebar
			}
		});
	});
});