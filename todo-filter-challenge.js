/*jshint esversion: 6 */

//delete the dummy data 
//read ad parse the data when the app starts up 
// stringify and write the data when new data is added

let todos = [{// need to change this to let so data can be changed 
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}];
// below grabs the data to keep it avaible in the html file. 
const todoJSON = localStorage.getItem('todos');
if (todoJSON !== null) {// only runs if there is data in storage. 
    todos = JSON.parse(todoJSON);
}
console.log(localStorage.getItem('todos'));

// localStorage.clear();
// localStorage.setItem
// const todoJSON = JSON.stringify(todos);
// // console.log(todoJSON);
// localStorage.setItem('todos', todoJSON);
// // localStorage.getItem('todos');
// localStorage.removeItem('text');
// console.log(localStorage.setItem('location', 'NY'))
// console.log(localStorage.getItem('location'));
// localStorage.removeItem('location');
// localStorage.clear();//clears all local storage
// const user = {
//     name: 'me ',
//     age: 22
// };
// const userJSON = JSON.stringify(user);
// console.log(userJSON);
// const userJSON = localStorage.getItem('user');
// localStorage.setItem('user', userJSON);

// localStorage.getItem('user');
// const user = JSON.parse(userJSON);
// console.log(`${user.name} is ${user.age}`);

// let note = [];
// const notesJSON = localStorage.getItem('notes');
// if (notesJSON !== null) {
//     note = JSON.parse(notesJSON);
// }
// save data using setitem


/////////////////////////////
const numOf2dos = document.createElement('div');
numOf2dos.id = 'setHere';
document.querySelector('body').appendChild(numOf2dos);
const notComplete = document.createElement("h2");
notComplete.id = 'notComp';
//notComplete.textContent = (`you have ${incompleteToDOs.length} todos left`);
// document.querySelector('body').appendChild(notComplete);
document.getElementById('setHere').appendChild(notComplete);
//1. setup a div contain for todos ->> completed
//2. setup filters (searchText) and wire up a new filter input to change it 
//3. Create a reanderToDos function to rerender the latest filtered data 

const newInput = document.createElement('input');
newInput.id = 'search-text';
newInput.placeholder = 'filter to dos here';
newInput.type = 'text';
newInput.name = 'switchTrue';
document.querySelector('body').appendChild(newInput);
const newDiv = document.createElement('div');
newDiv.id = 'filter-todo-sheet';
document.querySelector('body').appendChild(newDiv);
/////////////new form-> input
const submitForm = document.createElement('form');
submitForm.id = 'submit-form';
const submitInput = document.createElement('input');
submitInput.type = 'text';
submitInput.placeholder = 'add-to-list';
submitInput.name = 'addTo';
submitInput.id = 'addTo';
// submitInput.minLength = 1;
document.querySelector('body').appendChild(submitForm).appendChild(submitInput);
/////////////////////////newbutton below
const submitButton = document.createElement('button');
submitButton.innerHTML = 'SUBMIT NEW TODO';
////////////////////////add submit button to html inside submit form below 
document.getElementById('submit-form').appendChild(submitButton);
////////////////////////inclomplete todos here
//////////////////////////deletes todos that you arent searching 
const filters = { // this is a attribute given to replace with an empty spot
    searchText: '',
    hideCompleted: false
};
const rendNotes = function (todos, filters) {
    localStorage.getItem('todos');

    const filterThroughToDo = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !(filters.hideCompleted && todo.completed);
        return searchTextMatch && hideCompletedMatch; // || incompleteToDosMatch; //&& incompleteToDosMatch;
        //return eachNote.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    //edited date
    // filterThroughToDo = filterThroughToDo.filter(todo => {//nandoperator
    //     return !(filters.hideCompleted && todo.completed);
    // });
    const incompleteToDOs = todos.filter(todo => {
        return !todo.completed;
    });
    document.getElementById('filter-todo-sheet').innerHTML = '';

    notComplete.textContent = (`you have ${incompleteToDOs.length} todos left`);
    //call filter through notes
    filterThroughToDo.forEach(element => {
        const nP = document.createElement('p');
        nP.id = 'new-todo';
        nP.textContent = element.text;
        document.getElementById('filter-todo-sheet').appendChild(nP);
    });
    // now that we have found what we want. now print out to the html in a new paragraph
};
rendNotes(todos, filters);
document.getElementById('search-text').addEventListener('input', function (e) {
    // @ts-ignore
    filters.searchText = e.target.value;
    rendNotes(todos, filters);
});

document.getElementById('submit-form').addEventListener('submit', function (e) {
    //console.log('before submission ');
    // @ts-ignore
    e.preventDefault();
    // @ts-ignore
    if (e.target.elements.addTo.value !== '') {
        todos.push({
            // @ts-ignore
            text: e.target.elements.addTo.value,
            completed: false
        });
        //////////////////////////////////////////data storage part 
        // const todoJSON = JSON.stringify(todos);
        //console.log('rendNotes');
        //  console.log(todoJSON);
        // localStorage.setItem('todos', todoJSON);
        ///////////////////simplied version of above 
        localStorage.setItem('todos', JSON.stringify(todos));
        //  localStorage.getItem('todos');
        ///////////////////////////////////////// data stoarge
        rendNotes(todos, filters); // why this 
        // @ts-ignore
        e.target.elements.addTo.value = '';
    } else {
        alert('please add more than one character');
    }
});
//////////////created div above
//delete todo 
document.getElementById('hideCompleted').addEventListener('change', e => {
    // @ts-ignore
    //console.log(e.target.checked);
    //if checked defult false is == todos.compled
    //
    // @ts-ignore
    filters.hideCompleted = e.target.checked;
    rendNotes(todos, filters);
});

//create a chekc box and setup up  called hide completed
//done

// create hidecompelted filter (default false)

//update hindeOCMpelted and rerednerlist on checkbox change
//setup rendertodos to remove completed