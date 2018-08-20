/*jshint esversion: 6 */
// read existing data from local storage 

const getSavedData = function () {
    const todoJSON = localStorage.getItem('todos');
    if (todoJSON !== null) { // only runs if there is data in storage. 
        //todos = JSON.parse(todoJSON);
        return JSON.parse(todoJSON);
    } else {
        return [];
    }
};
const generateDom = function (todos, element, count) {
    console.log("I AM HERE ");
    console.log(element);
    const nP = document.createElement('span');
    const button = document.createElement('button');
    button.id = `delete${count}`;
    // remove button
    button.textContent = 'X';
    const elm = document.createElement('form');
    elm.id = `todo${count}`;
    nP.id = 'new-todo';
    nP.textContent = element.text;
    /////////////interesting indeed. 
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.id = `checkBox${count}`;
    elm.appendChild(checkBox);
    ////////////////////////////////////////////////
    document.getElementById('filter-todo-sheet').appendChild(elm).appendChild(button);
    elm.appendChild(nP);
    checkBox.checked = element.completed;
    checkBox.addEventListener('input', e => {
        console.log('here');
        element.completed = checkBox.checked;
        onOffToDo(todos.id, element, count);
        saveToDos(todos);
        rendNotes(todos, filters);
    });
    document.getElementById(`delete${count}`).addEventListener('click', e => {
        e.preventDefault();
        console.log(document.getElementById(`todo${count}`));
        console.log(document.getElementById(`checkBox${count}`));
        console.log(document.getElementById(element));
        if (element.completed === true) {
            saveToDos(todos);
            document.getElementById(`todo${count}`).remove();
            removeToDo(element);
            console.log(todos.length);
        } else {
            console.log('needs to be true');

        }
    });
    return elm;

};
const onOffToDo = (fn, element, count) => {
    //console.log(fn);
    // console.log(count);
    // console.log(element);
    if (element.id === '') {
        element.completed = true;
        element.id = count;
        saveToDos(todos);
        rendNotes(todos, filters);
    }
    console.log(element);
    const todoIndex = todos.findIndex(todo => {
        return todo.id === fn;
    });
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
};
const removeToDo = (element) => {
    todos.splice(todos.indexOf(element), 1); // to remove an idex from an array 
    rendNotes(todos, filters);
    saveToDos(todos);
    if (todos.length === 0) {
        localStorage.removeItem('todos');
        console.log('storage is clear');
    }
};
const saveToDos = todos => {
   localStorage.setItem('todos', JSON.stringify(todos)); // should update todos as well in storage
};
const rendNotes = function (todos, filters) {
    const filterThroughToDo = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !(filters.hideCompleted && todo.completed);
        saveToDos(todos);
        return searchTextMatch && hideCompletedMatch; 
    });
    const incompleteToDOs = todos.filter(todo => {
        return !todo.completed;
    });
    generateSummary(incompleteToDOs);
    let count = 1;
    filterThroughToDo.forEach(element => {
        generateDom(todos, element, count++);
    });
};
const generateSummary = incompleteToDOs => {
    // debugger
    document.getElementById('filter-todo-sheet').innerHTML = '';
    notComplete.textContent = (`you have ${incompleteToDOs.length} todos left`);
};