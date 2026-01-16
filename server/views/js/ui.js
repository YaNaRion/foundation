export const ui = {
	updateDate: function() {
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
	},

	renderTaskList: function(state, tasks) {
		const parent = document.getElementById("task-list");
		parent.innerHTML = ''; // Clear existing

		tasks.forEach((task, index) => {
			const li = document.createElement("li");
			li.id = index;
			li.textContent = task.title;
			li.className = "task-list-element";
			li.addEventListener("click", () => {
				this.loadTask(state, li.id);
			});
			parent.appendChild(li);
		});
	},

	loadTask: function(state, taskID) {
		const task = state.taskList[Number(taskID)];

		if (!task) {
			console.error("Tâche non trouvée:", taskID);
			return;
		}

		state.selectedTaskID = Number(taskID);
		state.selectedTask = task;

		// Update UI elements
		document.getElementById("task-name").textContent =
			`Tâche ${taskID}: ${task.title}`;

		document.getElementById("task-time").textContent =
			`Temps de la tâche: ${task.time} minutes`;

		document.getElementById("task-left-time").textContent =
			"IL RESTE 60 MIN";

		document.getElementById("task-content").textContent = task.content;

		// Highlight selected task
		// this.highlightSelectedTask(taskID);
	},

	highlightSelectedTask: function(taskID) {
		// Remove active class from all tasks
		document.querySelectorAll('.task-list-element').forEach(task => {
			task.classList.remove('active');
		});

		// Add active class to selected task
		const selectedTask = document.getElementById(taskID);
		if (selectedTask) {
			selectedTask.classList.add('active');
		}
	},

	updateTimerDisplay: function(minutes, seconds) {
		const timerTextEl = document.getElementById("task-left-time");
		timerTextEl.textContent =
			`Il reste ${minutes} min et ${seconds} sec`;
	}
};
