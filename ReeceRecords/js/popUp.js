// JavaScript Document

function popUpOpen() {
				var popUp = document.getElementById("popUpOpen");
				if (popUp.className === "popUp") {
					popUp.className += "Open";
				}
				else {
					popUp.className = "popUp";
				}
			}
			
			function popUpClose() {
				var popUp = document.getElementById("popUpOpen");
				if (popUp.className === "popUpOpen") {
					popUp.className = "popUp";
				}
				else {
					popUpclassName = "popUpOpen";
				}
			}