import * as TasksList from '../tasks-list/tasks-list.js';

const newTaskForm = document.querySelector('.new-task-form');
const newTaskFormInput = newTaskForm.querySelector('input');
const newTaskFormButton = newTaskForm.querySelector('button');

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    TasksList.appendTaskHtml({ name: newTaskFormInput.value });

    newTaskFormInput.value = '';

    TasksList.updateTasksCounterText();
});

export function validateNewTaskForm() {
    newTaskFormButton.disabled = newTaskFormInput.value == '';
}

newTaskFormInput.addEventListener('input', e => {
    validateNewTaskForm();
});