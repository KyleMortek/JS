/*jshint esversion: 6 */
// read existing data from local storage 

const getSavedData = function () {
    const todoJSON = localStorage.getItem('todos');
    // const counter = localStorage.getItem('counter');
    if (todoJSON !== null) { // only runs if there is data in storage. 
        //todos = JSON.parse(todoJSON);
       
        return JSON.parse(todoJSON) ;
    } else {
        return [];
    }
};
let counter = 0;
const generateDom = function (todos, element, count) {
    //debugger
  element.id= count;
  /// todos.id = count;
    saveToDos(todos); 

    const nP = document.createElement('a');// text element 
    const button = document.createElement('button');
    button.id = `delete${count}`;
    // remove button
    button.textContent = 'X';
    const elm = document.createElement('form');
    elm.id = `todo${count}`;
    nP.id = `new-todo${count}`;
    nP.textContent = element.text;
    /////////////interesting indeed. 
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.id = `checkBox${count}`;
    elm.appendChild(checkBox);
    ////////////////////////////////////////////////
    document.getElementById('filter-todo-sheet').appendChild(elm).appendChild(button);
    nP.setAttribute('href', `/jsbootcamp/notesApp/newNotesApp/todo.html#${count}`);
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
       // debugger
        if (element.completed === true) {
            // document.getElementById(`todo${count}`).remove();
            removeToDo(element);
            saveToDos(todos);
            rendNotes(todos,filters);
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
    saveToDos(todos);
    if (todos.length === 0) {
        localStorage.removeItem('todos');
        console.log('storage is clear');
    }
};
const saveToDos = todos => {
   localStorage.setItem('todos', JSON.stringify(todos)); // should update todos as well in storage
//    localStorage.setItem('counter', JSON.stringify(counter));
};

const rendNotes = function (todos, filters) {
   
    // debugger
    
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
    let count = 0;
    filterThroughToDo.forEach(element => {
    
        generateDom(todos, element, count++);
    });
    // location.assign(`/jsbootcamp/notesApp/newNotesApp/todo.html#${todos.id}`); //for going to next page. 

};
const generateSummary = incompleteToDOs => {
    // debugger
    document.getElementById('filter-todo-sheet').innerHTML = '';
    notComplete.textContent = (`you have ${incompleteToDOs.length} todos left`);
};
const getId = todos=>{
    todos.lastIndexOf(todos.id);
return todos[todos.length-1].id;
};