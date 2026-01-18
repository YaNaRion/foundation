export const newTaskPopup = {
	isInitialise: false,
	loadPopUp: function() {
		// This is just a safty mecanism, we do do need it if it is only call once
		if (this.isInitialise) {
			return;
		}

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

			console.log('Task submitted:', formData);

			alert('Task added successfully!');

			taskForm.reset();
			charCount.textContent = '0';
			timeValue.textContent = '60';
			timeEstimate.value = '60';

			taskModal.style.display = 'none';
			document.body.style.overflow = 'auto';
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
