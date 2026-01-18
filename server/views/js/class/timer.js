export class Timer {
	constructor(timeleft) {
		this.timerInterval = null;
		this.timeLeft = timeleft;
	}

	startTimer() {
		// Clear any existing timer
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
		}

		this.timeLeft = this.timeLeft * 60;

		// Start new timer
		this.timerInterval = setInterval(() => {
			this.timeLeft--;

			if (this.timeLeft <= 0) {
				this.stopTimer();
				ui.updateTimerDisplay(0, 0);
				// TODO: Le faire avec un vrai popup + son
				alert("Temps écoulé !");
				return;
			}

			const minutes = Math.floor(this.timeLeft / 60);
			const seconds = this.timeLeft % 60;

			ui.updateTimerDisplay(minutes, seconds);
		}, 1000);

		// Optional: Send to server
		// taskManager.startTaskTimer(state.selectedTaskID)
		//     .then(response => console.log("Timer started on server:", response))
		//     .catch(error => console.error("Server error:", error));
	}

	stopTimer() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = null;
			console.log("Timer arrêté");
		}
	}

	getTimeLeft() {
		return this.timeLeft;
	}
}
