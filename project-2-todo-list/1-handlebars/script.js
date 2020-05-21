const taskTemplateHtml = document.getElementById('task-template').innerHTML;
const taskTemplate = Handlebars.compile(taskTemplateHtml);

const tagTemplateHtml = document.getElementById('tag-template').innerHTML;
Handlebars.registerPartial('tagBlock', tagTemplateHtml);

const tasksFilterPanelStatusButton = document.querySelector('.tasks-filter-panel button');
const tasksFilterPanelNameInput = document.querySelector('.tasks-filter-panel input');
const tasksCounterElem = document.querySelector('.tasks-content-block p');
const tasksList = document.querySelector('.tasks-list');

function init(tasksData) {
    appendTasksHtml(tasksData);
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
    var div = document.createElement(elemString);
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function updateFilterPanelStatusControlText() {
    let text;
    // switch (tasksFilter.status) {
    //     case TaskStatusFilter.All: text = 'All tasks';
    //     case TaskStatusFilter.ToDo: text = 'To-do only';
    //     case TaskStatusFilter.Done: text = 'Done only';
    // }

    tasksFilterPanelStatusButton.innerText = text;
}

function getTaskBlocks() {
    const taskBlocks = document.querySelectorAll('.task-block');

    return {
        all: taskBlocks,
        filtered: Array.from(taskBlocks).filter(t => t.closest('li').style.display !== 'none'),
    };
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

newTaskFormInput.addEventListener('input', e => {
    const value = e.currentTarget.value;
    newTaskFormButton.disabled = value == '';
});

tasksFilterPanelStatusButton.addEventListener('click', e => {
    updateFilterPanelStatusControlText();
});

tasksFilterPanelNameInput.addEventListener('input', e => {
    const value = e.currentTarget.value;

    getTaskBlocks().all.forEach(taskBlock => {
        var taskName = taskBlock.querySelector('.task-name-block').innerText;

        if (taskName.toLowerCase().includes(value.toLowerCase()))
            taskBlock.closest('li').style.removeProperty('display');
        else
            taskBlock.closest('li').style.display = 'none';
    });

    // hide tasks list if filtered 0 tasks or no tasks exist
    // here getTaskBlocks() must be called again to get correct elements after filtering
    console.log(getTaskBlocks());
    if (getTaskBlocks().filtered.length) {
        tasksList.closest('div').style.removeProperty('display');
    }
    else {
        tasksList.closest('div').style.display = 'none';
    }

    updateTasksCounterText();
});

document.addEventListener('click', e => {
    if (e.target.matches('.task-delete-control-block button')) {
        const taskBlock = e.target.closest('li');
        taskBlock.remove();

        updateTasksCounterText();
    }
});