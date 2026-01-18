// Import modules
import { taskManager } from './task-manager.js';
import { ui } from './ui.js';
import { timer } from './timer.js';
import { newTaskPopup } from './new-task-popup.js';

// Global state
const state = {
	selectedTaskID: 0,
	currentTimerID: null,
	currentTimeLeft: 0,
	selectedTask: null,
	taskList: []
};

// Initialize application
function init() {
	console.log('Application initializing...');

	// Load initial data
	taskManager.loadTasks()
		.then(tasks => {
			state.taskList = tasks;
			ui.renderTaskList(state, tasks);
			ui.loadTask(state, 0);
		})
		.catch(error => {
			console.error("Error loading tasks:", error);
			document.getElementById("task-list").innerHTML =
				'<li class="error">Impossible de charger les tâches. Veuillez réessayer.</li>';
		});

	// Initialize UI
	ui.updateDate();

	// Setup event listeners
	setupEventListeners();


	// Load new-task popup: This is a quick fix
	newTaskPopup.loadPopUp();
}

function setupEventListeners() {
	// New task button
	document.getElementById('new-task-button').addEventListener('click', () => {
		console.log("DANS CLICK");
		// newTaskPopup.loadPopUp();
		taskModal.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});

	// Start timer button
	document.getElementById('start-timer-button').addEventListener('click', () => {
		timer.StartTimer(state);
	});

	// Task list click events are handled in ui.js
}

// Export state for other modules
export function getState() {
	return state;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
