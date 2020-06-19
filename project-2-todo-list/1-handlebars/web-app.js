import * as TasksList from './components/tasks-list/tasks-list.js';
import * as NewTaskForm from './components/new-task-form/new-task-form.js';
import * as FiltersPanel from './components/filters-panel/filters-panel.js';

Handlebars.registerHelper('isChecked', function (checked) {
    return checked ? 'checked' : '';
});

init(window.TASKS);

function init(tasksData) {
    appendTasksHtml(tasksData);

    // set default values & states
    NewTaskForm.validateNewTaskForm();

    // init texts
    FiltersPanel.updateFilterPanelStatusControlText();
    TasksList.updateTasksCounterText();
}

function appendTasksHtml(tasksData) {
    tasksData.forEach(task => {
        TasksList.appendTaskHtml(task);
    });
}