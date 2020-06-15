import * as Utils from '../../utils.js';
import * as TaskBlock from '../task-block/task-block.js';
import * as FiltersPanel from '../filters-panel/filters-panel.js';

const taskTemplateHtml = document.getElementById('task-template').innerHTML;
const taskTemplate = Handlebars.compile(taskTemplateHtml);

// const tasksFilterPanelStatusButton = document.querySelector('.tasks-filter-panel button');
// const tasksFilterPanelNameInput = document.querySelector('.tasks-filter-panel input');
const tasksCounterElem = document.querySelector('.tasks-content-block p');
const tasksList = document.querySelector('.tasks-list');

export function appendTaskHtml(taskData) {
    const tasksListItem = document.createElement('li');
    const taskBlockHtml = taskTemplate(taskData);
    const taskBlock = Utils.createElementFromHTML('div', taskBlockHtml);
    const taskNameBlock = taskBlock.querySelector('.task-name-block');
    TaskBlock.updateTaskStatus(taskNameBlock, taskData.isDone);

    TaskBlock.attachEventListeners(taskBlock);

    tasksListItem.appendChild(taskBlock);

    tasksList.appendChild(tasksListItem);
}

function getTaskBlocks() {
    const taskBlocks = document.querySelectorAll('.task-block');

    return {
        all: taskBlocks,
        filtered: Array.from(taskBlocks).filter(t => t.closest('li').style.display !== 'none'),
    };
}

export function updateTasksList() {
    const status = FiltersPanel.tasksFilterPanelStatusButton.getAttribute('data-status');
    const nameFilter = FiltersPanel.tasksFilterPanelNameInput.value;

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

export function updateTasksCounterText() {
    const taskBlocks = getTaskBlocks();
    const total = taskBlocks.all.length;
    const filtered = taskBlocks.filtered.length;
    const text = total == 0 ? 'No tasks found. Use the form above to add a new task.' : `Showing ${filtered} tasks (${total} total)`;

    tasksCounterElem.innerText = text;
}