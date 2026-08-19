const taskCheckboxes = document.querySelectorAll('.task input');
const taskStatuses = document.querySelectorAll('.task-status');
const completionPercentage = document.querySelector('#completion-percentage');
const completedTasks = document.querySelector('#completed-tasks');
const totalTasks = document.querySelector('#total-tasks');
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
  const completedTaskCount = [...taskStatuses].filter(
    (taskStatus) => taskStatus.value === 'Complete'
  ).length;
  const totalTaskCount = taskStatuses.length;
  const completion = totalTaskCount === 0
    ? 0
    : Math.round((completedTaskCount / totalTaskCount) * 100);

  completionPercentage.textContent = `${completion}%`;
  completedTasks.textContent = `${completedTaskCount} of ${totalTaskCount}`;
  totalTasks.textContent = totalTaskCount;

  if (completedTaskCount === totalTaskCount) {
    status.textContent = 'Complete';
    status.classList.add('complete');
  } else if (completedTaskCount > 0) {
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

updateProgress();
