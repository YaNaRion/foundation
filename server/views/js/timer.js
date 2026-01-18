let timerInterval = null;
let timeLeft = 0;

export const timer = {
	StartTimer: (state) => {
		const selectedTask = state.selectedTask;

		console.log("TIMER STARTED");

		if (!selectedTask) {
			alert("Veuillez sélectionner une tâche d'abord");
			return;
		}

		// Clear any existing timer
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timeLeft = selectedTask.time * 60;

		// Start new timer
		timerInterval = setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				clearInterval(timerInterval);
				timerInterval = null;
				ui.updateTimerDisplay(0, 0);
				// TODO: Le faire avec un vrai popup + son
				alert("Temps écoulé !");
				return;
			}

			const minutes = Math.floor(timeLeft / 60);
			const seconds = timeLeft % 60;

			ui.updateTimerDisplay(minutes, seconds);
		}, 1000);

		// Optional: Send to server
		// taskManager.startTaskTimer(state.selectedTaskID)
		//     .then(response => console.log("Timer started on server:", response))
		//     .catch(error => console.error("Server error:", error));
	},

	StopTimer: () => {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
			console.log("Timer arrêté");
		}
	},

	getTimeLeft: () => {
		return timeLeft;
	}
};
