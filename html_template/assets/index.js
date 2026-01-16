fetch("localhost:3000")
	.then(response => response.json()) // or .text()
	.then(data => {
		const parent = document.getElementById("task-list-wrapper");
		const div = document.createElement("li");
		div.textContent = "Hello world";
		div.className = "task-list-element";
		parent.appendChild(div);
	})
	.catch(error => {
		console.error("Error:", error);
	});
