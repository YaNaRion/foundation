export const newTaskPopup = {
	initHTML: function() {
		console.log("Init POP UP");
		const modalHTML = ` 
				<div class="modal-container">
				    <div class="modal-header">
					<h2><i class="fas fa-tasks"></i> Ajouter une nouvelle Tâche</h2>
					<button class="close-modal" id="closeModal">&times;</button>
				    </div>
				    <form id="taskForm">
					<div class="form-group">
					    <label for="taskName"><i class="fas fa-heading"></i> Nom de la tâche</label>
					    <div class="input-icon">
						<i class="fas fa-pencil-alt"></i>
						<input type="text" id="taskName" name="taskName"
						    placeholder="Entré le nom de la tâche" required>
					    </div>
					    <div class="validation-message">Champ Requis</div>
					</div>

					<div class="form-group">
					    <label for="timeEstimate"><i class="far fa-clock"></i>Temps estimé (minutes)</label>
					    <div class="time-slider-container">
						<div class="time-slider">
						    <input type="range" id="timeEstimate" name="timeEstimate"
							min="5" max="180" step="5" value="60">
						</div>
						<div class="time-value">
						    <span id="timeValue">60</span> min
						</div>
					    </div>
					    <div class="validation-message">Entre 5 et 180 minutes</div>
					</div>

					<div class="form-group">
					    <label for="dueDate"><i class="far fa-calendar-alt"></i>Date de rendue</label>
					    <div class="input-icon">
						<i class="fas fa-calendar-day"></i>
						<input type="date" id="dueDate" name="dueDate" required>
					    </div>
					    <div class="validation-message">Sélectionner la date de rendue</div>
					</div>

					<div class="form-group">
					    <label for="taskDescription"><i class="far fa-edit"></i> Description de la tâche</label>
					    <div class="input-icon">
						<i class="fas fa-align-left"></i>
						<textarea id="taskDescription" name="taskDescription"
						    placeholder="Entré la description de la tâche"
						    maxlength="255"></textarea>
					    </div>
					    <div class="char-count">
						<span id="charCount">0</span>/255 charactères
					    </div>
					    <div class="validation-message">Description</div>
					</div>

					<button type="submit" class="btn-submit">
					    <i class="fas fa-plus-circle"></i> Ajouter la tâche
					</button>
				    </form>
				</div>`;

		const container = document.createElement('div');
		container.id = "taskModal";
		container.className = "modal-overlay";
		container.innerHTML = modalHTML;
		document.body.appendChild(container);
	},

	isInitialise: false,
	loadPopUp: function(state) {
		// This is just a safty mecanism, we do do need it if it is only call once
		if (this.isInitialise) {
			return;
		}

		this.initHTML();
		const taskModal = document.getElementById('taskModal');
		const closeModal = document.getElementById('closeModal');
		const taskForm = document.getElementById('taskForm');
		const timeEstimate = document.getElementById('timeEstimate');
		const timeValue = document.getElementById('timeValue');
		const taskDescription = document.getElementById('taskDescription');
		const charCount = document.getElementById('charCount');
		const dueDate = document.getElementById('dueDate');

		const today = new Date().toISOString().split('T')[0];
		dueDate.min = today;

		timeValue.textContent = timeEstimate.value;
		timeEstimate.addEventListener('input', function() {
			timeValue.textContent = this.value;
		});

		taskDescription.addEventListener('input', function() {
			charCount.textContent = this.value.length;
		});

		closeModal.addEventListener('click', function() {
			taskModal.style.display = 'none';
			document.body.style.overflow = 'auto';
		});

		taskModal.addEventListener('click', function(event) {
			if (event.target === taskModal) {
				taskModal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		});

		taskForm.addEventListener('submit', function(event) {
			event.preventDefault();

			const formData = {
				taskName: document.getElementById('taskName').value,
				timeEstimate: document.getElementById('timeEstimate').value,
				dueDate: document.getElementById('dueDate').value,
				taskDescription: document.getElementById('taskDescription').value
			};

			try {
				state.controllerService.postNewTask(formData);
				console.log('Task submitted:', formData);
				alert('Task added successfully!');
				taskForm.reset();
				charCount.textContent = '0';
				timeValue.textContent = '60';
				timeEstimate.value = '60';

				taskModal.style.display = 'none';
				document.body.style.overflow = 'auto';
			} catch (error) {
				alert("Something happen on the server, the task was not added");
			}
		});

		document.addEventListener('keydown', function(event) {
			if (event.key === 'Escape' && taskModal.style.display === 'flex') {
				taskModal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		});
		this.isInitialise = true;
	},
}
