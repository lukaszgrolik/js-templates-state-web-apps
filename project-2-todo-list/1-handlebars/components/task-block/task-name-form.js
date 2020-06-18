import * as TasksList from '../tasks-list/tasks-list.js';

export function attachEventListeners(taskBlock, taskNameForm) {
    taskNameForm.querySelector('.task-name-form-submit').addEventListener('click', e => {
        e.preventDefault();

        const taskNameText = taskBlock.querySelector('.task-name-text');
        const nameInput = taskBlock.querySelector('.task-name-form-container input');
        taskNameText.innerText = nameInput.value;

        hideTaskNameForm(taskBlock);
        TasksList.updateTasksList();
    });

    taskNameForm.querySelector('.task-name-form-cancel').addEventListener('click', e => {
        hideTaskNameForm(taskBlock);
    });

    taskNameForm.querySelector('.task-name-form-container input').addEventListener('input', e => {
        const submitButton = e.target.closest('form').querySelector('button[type="submit"]');
        submitButton.disabled = e.target.value == '';
    });
}

function hideTaskNameForm(taskBlock) {
    const formContainer = taskBlock.querySelector('.task-name-form-container');
    formContainer.innerHTML = '';
    const taskNameText = taskBlock.querySelector('.task-name-text');
    taskNameText.style.display = 'block';
}