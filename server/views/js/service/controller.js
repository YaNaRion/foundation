import { Timer } from "../class/timer.js";

const API_URL = "http://localhost:3000/task";

export class ControllerService {
	async fetchTasks() {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error(`Erreur HTTP! status: ${response.status}`);
			}
			const data = await response.json();
			data.tasks.forEach((elem) => {
				console.log(elem);
				elem.timer = new Timer(elem.time);
			});
			return data.tasks;
		} catch (error) {
			console.error("Erreur lors du chargement des tâches:", error);
			throw error;
		}
	}

	// startTaskTimer: async (taskID) => {
	// 	try {
	// 		const response = await fetch("http://localhost:3000/start-current-task-timer", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			},
	// 			body: JSON.stringify({ taskID })
	// 		});
	//
	// 		if (!response.ok) {
	// 			throw new Error(`Erreur HTTP! status: ${response.status}`);
	// 		}
	//
	// 		return await response.json();
	// 	} catch (error) {
	// 		console.error("Erreur lors du démarrage du timer:", error);
	// 		throw error;
	// 	}
	// },

	getTaskById(taskList, taskID) {
		return taskList[Number(taskID)];
	}
};
