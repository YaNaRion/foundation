import { Timer } from "../class/timer.js";

const API_URL = "http://localhost:3000";

export class ControllerService {
	async getTasks() {
		try {
			const response = await fetch(`${API_URL}/tasks`);
			if (!response.ok) {
				throw new Error(`Erreur HTTP! status: ${response.status}`);
			}
			const data = await response.json();
			data.tasks.forEach((elem) => {
				elem.timer = new Timer(elem.time);
			});
			return data.tasks;
		} catch (error) {
			console.error("Erreur lors du chargement des tâches:", error);
			throw error;
		}
	}

	async postNewTask(newTask) {
		try {
			const response = await fetch(`${API_URL}/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ newTask })
			});

			if (!response.ok) {
				throw new Error(`Erreur HTTP! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Erreur when sending the new task to the server:", error);
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
	// 			throw new Error(`Erreur HTTP! status: ${ response.status }`);
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
