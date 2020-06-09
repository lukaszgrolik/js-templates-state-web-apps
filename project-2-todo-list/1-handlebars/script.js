const taskTemplateHtml = document.getElementById('task-template').innerHTML;
const taskTemplate = Handlebars.compile(taskTemplateHtml);

const taskNameFormTemplateHtml = document.getElementById('task-name-form-template').innerHTML;
const taskNameFormTemplate = Handlebars.compile(taskNameFormTemplateHtml);

// const tagTemplateHtml = document.getElementById('tag-template').innerHTML;
// Handlebars.registerPartial('tagBlock', tagTemplateHtml);
Handlebars.registerHelper('isChecked', function (checked) {
    return checked ? 'checked' : '';
});

const tasksFilterPanelStatusButton = document.querySelector('.tasks-filter-panel button');
const tasksFilterPanelNameInput = document.querySelector('.tasks-filter-panel input');
const tasksCounterElem = document.querySelector('.tasks-content-block p');
const tasksList = document.querySelector('.tasks-list');

function init(tasksData) {
    appendTasksHtml(tasksData);

    // set default values & states
    validateNewTaskForm();

    // init texts
    updateFilterPanelStatusControlText();
    updateTasksCounterText();
}

function appendTasksHtml(tasksData) {
    tasksData.forEach(task => {
        appendTaskHtml(task);
    });
}

function appendTaskHtml(taskData) {
    const tasksListItem = document.createElement('li');
    const taskBlockHtml = taskTemplate(taskData);
    const taskBlock = createElementFromHTML('div', taskBlockHtml);
    tasksListItem.appendChild(taskBlock);

    tasksList.appendChild(tasksListItem);
}

// based on https://stackoverflow.com/a/494348
function createElementFromHTML(elemString, htmlString) {
    const wrapper = document.createElement(elemString);
    wrapper.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return wrapper.firstChild;
}

function switchFilterPanelStatus() {
    const status = tasksFilterPanelStatusButton.getAttribute('data-status');
    let newStatus;
    switch (status) {
        case "All": newStatus = 'ToDo'; break;
        case "ToDo": newStatus = 'Done'; break;
        case "Done": newStatus = 'All'; break;
    }

    tasksFilterPanelStatusButton.setAttribute('data-status', newStatus);
}

function updateFilterPanelStatusControlText() {
    const status = tasksFilterPanelStatusButton.getAttribute('data-status');
    let text;
    switch (status) {
        case "All": text = 'All tasks'; break;
        case "ToDo": text = 'To-do only'; break;
        case "Done": text = 'Done only'; break;
    }

    tasksFilterPanelStatusButton.innerText = text;
}

function getTaskBlocks() {
    const taskBlocks = document.querySelectorAll('.task-block');

    return {
        all: taskBlocks,
        filtered: Array.from(taskBlocks).filter(t => t.closest('li').style.display !== 'none'),
    };
}

function updateTasksList() {
    const status = tasksFilterPanelStatusButton.getAttribute('data-status');
    const nameFilter = tasksFilterPanelNameInput.value;

    getTaskBlocks().all.forEach(taskBlock => {
        const isDone = taskBlock.querySelector('input[type="checkbox"]').checked;
        const taskName = taskBlock.querySelector('.task-name-block').innerText;

        if (
            (status == 'ToDo' && isDone) ||
            (status == 'Done' && isDone == false) ||
            taskName.toLowerCase().includes(nameFilter.toLowerCase()) == false
        ) {
            taskBlock.closest('li').style.display = 'none';
        }
        else {
            taskBlock.closest('li').style.removeProperty('display');
        }
    });

    // hide tasks list if filtered 0 tasks or no tasks exist
    // here getTaskBlocks() must be called again to get correct elements after filtering
    if (getTaskBlocks().filtered.length) {
        tasksList.closest('div').style.removeProperty('display');
    }
    else {
        tasksList.closest('div').style.display = 'none';
    }

    updateTasksCounterText();
}

function updateTasksCounterText() {
    const taskBlocks = getTaskBlocks();
    const total = taskBlocks.all.length;
    const filtered = taskBlocks.filtered.length;
    const text = total == 0 ? 'No tasks found. Use the form above to add a new task.' : `Showing ${filtered} tasks (${total} total)`;

    tasksCounterElem.innerText = text;
}

const newTaskForm = document.querySelector('.new-task-form')
const newTaskFormInput = newTaskForm.querySelector('input');
const newTaskFormButton = newTaskForm.querySelector('button');

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    appendTaskHtml({name: newTaskFormInput.value});

    newTaskFormInput.value = '';

    updateTasksCounterText();
});

function validateNewTaskForm() {
    newTaskFormButton.disabled = newTaskFormInput.value == '';
}

newTaskFormInput.addEventListener('input', e => {
    validateNewTaskForm();
});

tasksFilterPanelStatusButton.addEventListener('click', e => {
    switchFilterPanelStatus();
    updateFilterPanelStatusControlText();
    updateTasksList();
});

tasksFilterPanelNameInput.addEventListener('input', e => {
    updateTasksList();
});