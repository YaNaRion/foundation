import { newTaskPopup } from "./new-task-popup.js";

export const topBar = {
	init: function() {
		// Initialise top-bar
		let topBarElement = document.getElementsByClassName("top-bar")[0];
		topBarElement.innerHTML = `<div class="top-bar-left">
			<h2>Gestionnaire de Tâches</h2>
		</div>
		<div class="top-bar-right">
			<h3 id="current-date"></h3>
			<button id="new-task-button">+ Nouvelle tâche</button>
		</div>`;

		newTaskPopup.loadPopUp();
		this.addEventListener();
	},


	addEventListener: function() {
		document.getElementById('new-task-button').addEventListener('click', () => {
			const taskModal = document.getElementById('taskModal');
			if (taskModal) {
				taskModal.style.display = 'flex';
				document.body.style.overflow = 'hidden';
			}
		});
	}
}
