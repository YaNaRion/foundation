export const taskComponent = {
	init: function() {
		let taskContend = document.createElement("div")
		taskContend.className = "task-contend";
		taskContend.innerHTML =
			`<h1 id="task-name"></h1>
			<div id="task-timer-wrapper">
				<h2 id="task-time"></h2>
				<h2 id="task-left-time"></h2>
				<button id="start-timer-button">Démarrer le timer</button>
			</div>
			<p id="task-content"></p>`


		return taskContend;
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

		document.getElementById('start-timer-button').addEventListener('click', () => {
			task.timer.StartTimer(state);
		});
	},

	updateTimerDisplay: function(minutes, seconds) {
		const timerTextEl = document.getElementById("task-left-time");
		timerTextEl.textContent =
			`Il reste ${minutes} min et ${seconds} sec`;
	}
}
