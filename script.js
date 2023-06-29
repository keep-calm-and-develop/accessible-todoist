const heading = document.querySelector('#heading');
const toDoForm = document.querySelector('#to_do_form');
const toDoInput = document.querySelector('#todo');
const list = document.querySelector('#list');
const scFeedback = document.querySelector('#sc_feedback');

function addTask(event) {
    event.preventDefault();
    const task = toDoInput.value;
    addTaskToDOM(task);
    removeValue(toDoInput);
    screenReaderFeedback(task);
}

toDoForm.addEventListener('submit', addTask);

list.addEventListener('click', function(event) {
    if (hasClassName(event.target, 'delete_task')) {
        const li = event.target.closest('li');
        const taskName = event.target.previousElementSibling.textContent;
        list.removeChild(li);

        heading.focus();

        screenReaderFeedback(taskName, 'deleted');
    }
});

function addTaskToDOM(task) {
    const newID = generateID();
    const taskItem = createElement('li', null, list, ['class', 'task']);
    taskItem.setAttribute('id', newID);

    const checkbox = createElement('input', null, taskItem, ['type', 'checkbox']);
    checkbox.setAttribute('class', 'task_checkbox');

    const label = createElement('label', task, taskItem, ['for', newID]);

    const removeButton = createElement('button', 'Delete Task', taskItem, ['class', 'delete_task']);
}

function createElement(tagName, textNode, parent, attribute = null) {
    let node = document.createElement(tagName);
    if (textNode) {
        const text = document.createTextNode(textNode);
        node.appendChild(text);
    }
    if (attribute != null) {
        node.setAttribute(attribute[0], attribute[1]);
    }
    parent.appendChild(node);
    return node;
}

function removeValue(input) {
    input.value = '';
}

function screenReaderFeedback(task, feedback = 'added') {
    scFeedback.textContent = `${task} ${feedback}.`;
}

function generateID() {
    let idPrefix = 'task_num_';
    let tasks = document.querySelectorAll('#list > li');
    if (tasks.length === 0) {
        return `${idPrefix}0`;
    }
    return `${idPrefix}${tasks.length}`;
}

function hasClassName(element, className) {
    if (element.classList.contains(className)) {
        return true;
    }
    return false;
}