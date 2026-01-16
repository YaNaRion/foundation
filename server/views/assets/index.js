const selectedTaskID = 0;
let currentTimerID;
let currentTimeLeft;
let selectedTask;
let taskList;

const StartTimer = () => {
	currentTimeLeft = selectedTask.time * 60;
	currentTimerID = setInterval(() => {
		currentTimeLeft--;
		let timerTextEl = document.getElementById("task-left-time");
		timerTextEl.textContent = "Il reste " + String(Math.floor(currentTimeLeft / 60)) + " minutes et "
			+ currentTimeLeft % 60 + " secondes à la tâche";
	}, 1000);

	// fetch("http://localhost:3000/start-current-task-timer", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify({
	// 		taskID: selectedTaskID
	// 	})
	// })
}

const ChangeLoadedTask = (taskID) => {
	let taskH1 = document.getElementById("task-name");
	const task = taskList[Number(taskID)];
	selectedTask = task;
	const formatString = "Tâche " + taskID + ": " + task.title;
	taskH1.textContent = formatString;

	let taskTimeEle = document.getElementById("task-time");
	taskTimeEle.textContent = "Temps de la tâche: " + task.time + "minutes";

	let taskTimeLeftEle = document.getElementById("task-left-time");
	taskTimeLeftEle.textContent = "IL RESTE 60 MIN";

	let taskContent = document.getElementById("task-content");
	taskContent.textContent = task.content;
}

const OnLoadRequest = () => {
	fetch("http://localhost:3000/task")
		.then(response => response.json()) // or .text()
		.then(data => {
			for (let i = 0; i < data.tasks.length; i++) {
				const task = data.tasks[i]
				const parent = document.getElementById("task-list");
				const div = document.createElement("li");
				div.id = i;
				div.textContent = task.title;
				div.className = "task-list-element";
				div.addEventListener("click", (event) => {
					ChangeLoadedTask(event.target.id);
				});
				parent.appendChild(div);
			}
			taskList = data.tasks;
			ChangeLoadedTask(0);
		})
		.catch(error => {
			console.error("Error:", error);
		});
}

const OnLoad = () => {
	day = date.day;
	currentDateEl = document.getElementById("current-date");
	currentDateEl.textContent = day;
}



OnLoadRequest();
OnLoad();
