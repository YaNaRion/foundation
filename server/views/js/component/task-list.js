export const taskListComponent = {
	init: function() {
		let task = document.createElement("div");
		task.className = "tasks";
		task.innerHTML = `<h2 id="task-list-name">Liste des tâches aujourd'hui</h2>
			<ul id="task-list"></ul>`;

		return task;
	},


	renderTaskList: function(state) {
		const parent = document.getElementById("task-list");
		if (parent.innerHTML != null) {
			parent.innerHTML = null;
		}; // Clear existing
		state.taskList.forEach((task, index) => {
			const li = document.createElement("li");
			li.id = index;
			li.textContent = task.title;
			li.className = "task-list-element";
			li.addEventListener("click", () => {
				state.taskComponent.loadTask(state, li.id);
			});
			parent.appendChild(li);
		});
	},

	// loadTask: function(state, taskID) {
	// 	const task = state.taskList[Number(taskID)];
	//
	// 	if (!task) {
	// 		console.error("Tâche non trouvée:", taskID);
	// 		return;
	// 	}
	//
	// 	state.selectedTaskID = Number(taskID);
	// 	state.selectedTask = task;
	//
	// 	// Update UI elements
	// 	document.getElementById("task-name").textContent =
	// 		`Tâche ${taskID}: ${task.title}`;
	//
	// 	document.getElementById("task-time").textContent =
	// 		`Temps de la tâche: ${task.time} minutes`;
	//
	// 	document.getElementById("task-left-time").textContent =
	// 		"IL RESTE 60 MIN";
	//
	// 	document.getElementById("task-content").textContent = task.content;
	//
	// 	// Highlight selected task
	// 	// this.highlightSelectedTask(taskID);
	// },

	// highlightSelectedTask: function(taskID) {
	// 	// Remove active class from all tasks
	// 	document.querySelectorAll('.task-list-element').forEach(task => {
	// 		task.classList.remove('active');
	// 	});
	//
	// 	// Add active class to selected task
	// 	const selectedTask = document.getElementById(taskID);
	// 	if (selectedTask) {
	// 		selectedTask.classList.add('active');
	// 	}
	// },

	updateTimerDisplay: function(minutes, seconds) {
		const timerTextEl = document.getElementById("task-left-time");
		timerTextEl.textContent =
			`Il reste ${minutes} min et ${seconds} sec`;
	}
};
