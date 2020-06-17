import * as Utils from '../../utils.js';
import * as TasksList from '../tasks-list/tasks-list.js';

const taskNameFormTemplateHtml = document.getElementById('task-name-form-template').innerHTML;
const taskNameFormTemplate = Handlebars.compile(taskNameFormTemplateHtml);

export function updateTaskStatus(taskNameBlock, isDone) {
	const taskDoneClassName = 'is-done';
	if (isDone)
		taskNameBlock.classList.add(taskDoneClassName);
	else
		taskNameBlock.classList.remove(taskDoneClassName);
}

export function attachEventListeners(taskBlock) {
	taskBlock.querySelector('.task-done-control-block input[type="checkbox"]').addEventListener('change', e => {
		const taskNameBlock = taskBlock.querySelector('.task-name-block');

		updateTaskStatus(taskNameBlock, e.target.checked);

		TasksList.updateTasksList();
	});

	taskBlock.querySelector('.task-name-text').addEventListener('click', e => {
		const formContainer = taskBlock.querySelector('.task-name-form-container');
		const taskNameFormHtml = taskNameFormTemplate({ name: e.target.innerText });
		const taskNameForm = Utils.createElementFromHTML('div', taskNameFormHtml);
		formContainer.appendChild(taskNameForm);

		attachTaskNameFormEventListeners(taskBlock, taskNameForm);

		e.target.style.display = 'none';
	});

	taskBlock.querySelector('.task-delete-control-block button').addEventListener('click', e => {
		taskBlock.remove();

		TasksList.updateTasksCounterText();
	});
}

function hideTaskNameForm(taskBlock) {
	const formContainer = taskBlock.querySelector('.task-name-form-container');
	formContainer.innerHTML = '';
	const taskNameText = taskBlock.querySelector('.task-name-text');
	taskNameText.style.display = 'block';
}

function attachTaskNameFormEventListeners(taskBlock, taskNameForm) {
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