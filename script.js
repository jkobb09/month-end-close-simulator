const taskCheckboxes = document.querySelectorAll('.task input');
const taskStatuses = document.querySelectorAll('.task-status');
const progress = document.querySelector('#progress');
const status = document.querySelector('#status');

function updateTaskStatus(taskStatus) {
  taskStatus.classList.remove('in-progress', 'complete');

  if (taskStatus.value === 'In Progress') {
    taskStatus.classList.add('in-progress');
  } else if (taskStatus.value === 'Complete') {
    taskStatus.classList.add('complete');
  }
}

function updateProgress() {
  const completedTasks = document.querySelectorAll('.task input:checked').length;
  const totalTasks = taskCheckboxes.length;

  progress.textContent = `${completedTasks} of ${totalTasks} complete`;

  if (completedTasks === totalTasks) {
    status.textContent = 'Complete';
    status.classList.add('complete');
  } else if (completedTasks > 0) {
    status.textContent = 'In progress';
    status.classList.remove('complete');
  } else {
    status.textContent = 'Not started';
    status.classList.remove('complete');
  }
}

taskCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const taskStatus = checkbox.closest('.task').querySelector('.task-status');
    taskStatus.value = checkbox.checked ? 'Complete' : 'Not Started';
    updateTaskStatus(taskStatus);
    updateProgress();
  });
});

taskStatuses.forEach((taskStatus) => {
  taskStatus.addEventListener('change', () => {
    const checkbox = taskStatus.closest('.task').querySelector('input');
    checkbox.checked = taskStatus.value === 'Complete';
    updateTaskStatus(taskStatus);
    updateProgress();
  });
  updateTaskStatus(taskStatus);
});
