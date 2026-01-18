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
	currentTask: null,
	controllerService: new ControllerService(),
	taskComponent: taskComponent,
	taskListComponent: taskListComponent
};


// Initialize application
function init() {
	console.log('Application initializing...');

	// Initialise top bar
	topBar.init(state);

	// Initialise Body
	let pageElement = document.getElementById("page");
	pageElement.appendChild(taskComponent.init());
	pageElement.appendChild(taskListComponent.init());

	// Load initial data
	state.controllerService.getTasks()
		.then(tasks => {
			console.log(tasks);
			state.taskList = tasks;
			taskListComponent.renderTaskList(state);
			taskComponent.loadTask(state, 0);
		})
		.catch(error => {
			console.error("Error loading tasks:", error);
			document.getElementById("task-list").innerHTML =
				'<li class="error">Impossible de charger les tâches. Veuillez réessayer.</li>';
		});
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
