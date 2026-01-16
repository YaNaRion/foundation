const selectedTask = 0;
let taskList;

const ChangeLoadedTask = (taskID) => {
	let taskH1 = document.getElementById("task-name");
	const task = taskList[Number(taskID)];
	const formatString = "Tâche " + taskID + ": " + task.title;
	taskH1.textContent = formatString;

	let taskTimeEle = document.getElementById("task-time");
	taskTimeEle.textContent = "Temps de la tâche: " + task.time;

	let taskContent = document.getElementById("task-content");
	taskContent.textContent = task.content;
}

const StartTimer = () => {

}


const OnLoadRequest = () => {
	fetch("http://localhost:3000/task")
		.then(response => response.json()) // or .text()
		.then(data => {
			console.log(data);
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



OnLoadRequest();
