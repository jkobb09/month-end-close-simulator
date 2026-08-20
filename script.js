console.log('script.js loading...');

// Global function for checking overdue tasks
function checkOverdueTasks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  console.log('Checking overdue tasks. Today is:', today);
  
  document.querySelectorAll('.task').forEach((taskElement) => {
    const dueDateSpan = taskElement.querySelector('.task-due-date');
    const statusSelect = taskElement.querySelector('.task-status');
    
    if (dueDateSpan && statusSelect) {
      const dueDate = parseDate(dueDateSpan.dataset.dueDate);
      const isComplete = statusSelect.value === 'Complete';
      const isOverdue = dueDate < today && !isComplete;
      
      console.log('Task:', dueDateSpan.textContent, 'Due:', dueDate, 'Complete:', isComplete, 'Overdue:', isOverdue);
      
      if (isOverdue) {
        taskElement.classList.add('overdue');
      } else {
        taskElement.classList.remove('overdue');
      }
    }
  });
}

// Parse dates like "Oct 5" or "August 5"
function parseDate(dateString) {
  const today = new Date();
  const year = today.getFullYear();
  const dateObj = new Date(dateString + ' ' + year);
  return dateObj;
}

// Make sure these are accessible globally
window.checkOverdueTasks = checkOverdueTasks;
window.parseDate = parseDate;

console.log('Global functions registered. checkOverdueTasks =', window.checkOverdueTasks);

document.addEventListener('DOMContentLoaded', function() {
  const taskCheckboxes = document.querySelectorAll('.task input');
  const taskStatuses = document.querySelectorAll('.task-status');
  const taskDueDates = document.querySelectorAll('.task-due-date');
  const completionPercentage = document.querySelector('#completion-percentage');
  const completedTasks = document.querySelector('#completed-tasks');
  const totalTasks = document.querySelector('#total-tasks');
  const status = document.querySelector('#status');
  const ownerFilter = document.querySelector('#owner-filter');

  console.log('Script loaded. Found', taskDueDates.length, 'due dates');

  function filterTasksByOwner() {
    const selectedOwner = ownerFilter.value;
    console.log('Filtering by owner:', selectedOwner);
    
    document.querySelectorAll('.task').forEach((taskElement) => {
      const ownerSpan = taskElement.querySelector('.task-owner');
      if (selectedOwner === '' || ownerSpan.textContent === selectedOwner) {
        taskElement.style.display = '';
      } else {
        taskElement.style.display = 'none';
      }
    });
  }

  ownerFilter.addEventListener('change', filterTasksByOwner);

  function updateTaskStatus(taskStatus) {
    taskStatus.classList.remove('in-progress', 'complete');

    if (taskStatus.value === 'In Progress') {
      taskStatus.classList.add('in-progress');
    } else if (taskStatus.value === 'Complete') {
      taskStatus.classList.add('complete');
    }
    
    // Check overdue status after status change
    checkOverdueTasks();
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
    
    checkOverdueTasks();
  }

  function makeEditable(dueDateElement) {
    console.log('Making editable:', dueDateElement.textContent);
    const currentValue = dueDateElement.dataset.dueDate;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-due-date-input';
    input.value = currentValue;
    input.style.color = '#d56845';
    input.style.cursor = 'pointer';
    input.style.fontWeight = 'bold';
    input.style.fontSize = '0.72rem';
    input.style.padding = '4px 6px';
    input.style.border = '1px solid #d56845';
    input.style.borderRadius = '3px';
    
    dueDateElement.replaceWith(input);
    input.focus();
    input.select();
    
    function saveDueDate() {
      const newValue = input.value.trim() || currentValue;
      const newDueDateElement = document.createElement('span');
      newDueDateElement.className = 'task-due-date';
      newDueDateElement.dataset.dueDate = newValue;
      newDueDateElement.textContent = `Due: ${newValue}`;
      newDueDateElement.style.color = '#d56845';
      newDueDateElement.style.cursor = 'pointer';
      newDueDateElement.style.fontWeight = 'bold';
      
      input.replaceWith(newDueDateElement);
      attachDueDateListener(newDueDateElement);
      console.log('Due date saved:', newValue);
    }
    
    input.addEventListener('blur', saveDueDate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveDueDate();
      } else if (e.key === 'Escape') {
        const cancelElement = document.createElement('span');
        cancelElement.className = 'task-due-date';
        cancelElement.dataset.dueDate = currentValue;
        cancelElement.textContent = `Due: ${currentValue}`;
        cancelElement.style.color = '#d56845';
        cancelElement.style.cursor = 'pointer';
        cancelElement.style.fontWeight = 'bold';
        
        input.replaceWith(cancelElement);
        attachDueDateListener(cancelElement);
        console.log('Edit cancelled');
      }
    });
  }

  function attachDueDateListener(dueDateElement) {
    dueDateElement.addEventListener('click', function(e) {
      console.log('Clicked on due date:', dueDateElement.textContent);
      e.preventDefault();
      e.stopPropagation();
      makeEditable(dueDateElement);
    });
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

  taskDueDates.forEach((dueDateElement) => {
    attachDueDateListener(dueDateElement);
    console.log('Attached listener to:', dueDateElement.textContent);
  });

  updateProgress();
  checkOverdueTasks();
});
