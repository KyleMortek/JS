/*jshint esversion: 6 */
const todoId = location.hash.substring(1);
// @ts-ignore
const todos = getSavedData();
const todoing = todos.find(todoing => {
    // debugger
    return todoing.id.toString() === todoId;
});

if (todoing === undefined) {
    location.assign('/jsbootcamp/notesApp/newNotesApp/todo-filter-challenge.html');
}

// @ts-ignore
//console.log(document.getElementById(`new-todo${todoId}`).value);

// @ts-ignore
document.getElementById(`todo`).value = todoing.text;
document.getElementById(`todo`).addEventListener('input', e => {
    // @ts-ignore
    todoing.text = e.target.value;
    saveToDos(todos);
});

document.getElementById('sub').addEventListener('click', e => {
    // remove old and replace with new?
    removeToDo(todos);
    // saveToDos(todoArray);
   // rendNotes(todos, filters);
    location.assign('/jsbootcamp/notesApp/newNotesApp/todo-filter-challenge.html');
}); //