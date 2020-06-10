// @todo update tasks list on task checked change

function updateTaskStatus(taskNameBlock, isDone) {
    const taskDoneClassName = 'is-done';
    if (isDone)
        taskNameBlock.classList.add(taskDoneClassName);
    else
        taskNameBlock.classList.remove(taskDoneClassName);
}

document.addEventListener('change', e => {
    if (e.target.matches('.task-done-control-block input[type="checkbox"]')) {
        const taskBlock = e.target.closest('.task-block');
        const taskNameBlock = taskBlock.querySelector('.task-name-block');

        updateTaskStatus(taskNameBlock, e.target.checked);
    }
});

document.addEventListener('click', e => {
    if (e.target.matches('.task-name-text')) {
        const taskBlock = e.target.closest('.task-block');
        const formContainer = taskBlock.querySelector('.task-name-form-container');
        const taskNameFormHtml = taskNameFormTemplate({ name: e.target.innerText });
        const taskNameForm = createElementFromHTML('div', taskNameFormHtml);
        formContainer.appendChild(taskNameForm);

        e.target.style.display = 'none';
    }
});

function hideTaskNameForm(taskBlock) {
    const formContainer = taskBlock.querySelector('.task-name-form-container');
    formContainer.innerHTML = '';
    const taskNameText = taskBlock.querySelector('.task-name-text');
    taskNameText.style.display = 'block';
}

// @todo update tasks list on task name change (when new name doesn't pass the filter)

document.addEventListener('click', e => {
    if (e.target.matches('.task-name-form-submit')) {
        e.preventDefault();

        const taskBlock = e.target.closest('.task-block');
        const taskNameText = taskBlock.querySelector('.task-name-text');
        const nameInput = taskBlock.querySelector('.task-name-form-container input');
        taskNameText.innerText = nameInput.value;

        hideTaskNameForm(taskBlock);
    }
    else if (e.target.matches('.task-name-form-cancel')) {
        const taskBlock = e.target.closest('.task-block');

        hideTaskNameForm(taskBlock);
    }
});

document.addEventListener('input', e => {
    if (e.target.matches('.task-name-form-container input')) {
        const submitButton = e.target.closest('form').querySelector('button[type="submit"]');
        submitButton.disabled = e.target.value == '';
    }
});

document.addEventListener('click', e => {
    if (e.target.matches('.task-delete-control-block button')) {
        const taskBlock = e.target.closest('li');
        taskBlock.remove();

        updateTasksCounterText();
    }
});