/*jshint esversion: 6 */
const todos = getSavedData();
console.log('working');
const numOf2dos = document.createElement('div');
numOf2dos.id = 'setHere';
document.querySelector('body').appendChild(numOf2dos);
const notComplete = document.createElement("h2");
notComplete.id = 'notComp';
//notComplete.textContent = (`you have ${incompleteToDOs.length} todos left`);
// document.querySelector('body').appendChild(notComplete);
document.getElementById('setHere').appendChild(notComplete);
const newInput = document.createElement('input');// should i do all of this? probably not. just put it in the html file.
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
// @ts-ignore
const filters = { // this is a attribute given to replace with an empty spot
    searchText: '',
    hideCompleted: false
};
rendNotes(todos, filters);
document.getElementById('search-text').addEventListener('input', function (e) {
    // @ts-ignore
    filters.searchText = e.target.value;
    rendNotes(todos, filters);
});

document.getElementById('submit-form').addEventListener('submit', function (e) {
    // @ts-ignore
    e.preventDefault();
    // @ts-ignore
    if (e.target.elements.addTo.value !== '') {
        todos.push({
            // @ts-ignore
            text: e.target.elements.addTo.value,
            completed: false,
            id: ''
        });
        ///////////////////simplied version of above 
        saveToDos(todos);
        // localStorage.setItem('todos', JSON.stringify(todos));
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
    filters.hideCompleted = e.target.checked;
    rendNotes(todos, filters);
});