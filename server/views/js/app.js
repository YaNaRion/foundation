// Import modules
import { ControllerService } from './service/controller.js';
import { taskComponent } from './component/task.js';
import { taskListComponent } from './component/task-list.js';
import { topBar } from './component/top-bar.js';

// Global state
const state = {
	currentTimerID: null,
	currentTimeLeft: 0,
	taskList: [],
	controllerService: new ControllerService(),
	taskComponent: taskComponent,
	taskListComponent: taskListComponent
};

function updateDate() {
	const now = new Date();
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	const currentDateEl = document.getElementById("current-date");
	let dateString = now.toLocaleDateString('fr-FR', options);

	// Capitalize first letter
	dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);

	currentDateEl.textContent = dateString;
}

// Initialize application
function init() {
	console.log('Application initializing...');

	// Initialise Body
	let pageElement = document.getElementById("page");
	pageElement.appendChild(taskComponent.init());
	pageElement.appendChild(taskListComponent.init());

	topBar.init();

	// Load initial data
	state.controllerService.fetchTasks()
		.then(tasks => {
			state.taskList = tasks;
			taskListComponent.renderTaskList(state);
			taskComponent.loadTask(state, 0);
		})
		.catch(error => {
			console.error("Error loading tasks:", error);
			document.getElementById("task-list").innerHTML =
				'<li class="error">Impossible de charger les tâches. Veuillez réessayer.</li>';
		});

	// Update date
	updateDate();

	// Setup event listeners
	setupEventListeners();


	// Load new-task popup: This is a quick fix
	// newTaskPopup.loadPopUp();
}

function setupEventListeners() {
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
