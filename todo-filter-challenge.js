/*jshint esversion: 6 */
const toDoFilterSheet = [{
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

//1. setup a div contain for todos ->> completed
//2. setup filters (searchText) and wire up a new filter input to change it 
//3. Create a reanderToDos function to rerender the latest filtered data 

const newInput = document.createElement('input');
newInput.id= 'filter-to-dos-here';
newInput.placeholder = 'filter to dos here';
newInput.type = 'text';
document.querySelector('body').appendChild(newInput);
const newDiv = document.createElement('div');
newDiv.id='filter-todo-sheet';
document.querySelector('body').appendChild(newDiv);
/////////////new form-> input
const submitForm = document.createElement('form');
submitForm.id= 'submit-form';
const submitInput = document.createElement('input');
submitInput.type = 'text';
submitInput.placeholder = 'add-to-list';
submitInput.name = 'addTo';
document.querySelector('body').appendChild(submitForm).appendChild(submitInput);
/////////////////////////newbutton below
const submitButton = document.createElement('button');
submitButton.innerHTML = 'SUBMIT NEW TODO';
////////////////////////add submit button to html inside submit form below 
document.getElementById('submit-form').appendChild(submitButton);
////////////////////////inclomplete todos here
const incompleteToDOs = toDoFilterSheet.filter(element => {
    // console.log(!element.completed);
    return !element.completed;
});
const notComplete = document.createElement("h2");
notComplete.id = 'notComp';
notComplete.textContent=(`you have ${incompleteToDOs.length} todos left`);
document.querySelector('body').appendChild(notComplete);
//////////////////////////deletes todos that you arent searching 
const deleteOtherText = {// this is a attribute given to replace with an empty spot
    searchText: ''
};

const rendNotes = function (notes, deleteOtherText) {
    console.log('rendNotes');
    
    // create fucntion that filters through each note and returns a specific note that contains a certain value or text
    // const filterThroughNotes = notes.filter(eachNote=>{
    const filterThroughNotes = notes.filter(function (eachNote){
        return eachNote.text.toLowerCase().includes(deleteOtherText.searchText.toLowerCase());
    });
    document.getElementById('filter-todo-sheet').innerHTML = '<p>';
    //call filter through notes
    filterThroughNotes.forEach(element=>{
        const nP = document.createElement('p');
        nP.textContent = element.text;
        document.getElementById('filter-todo-sheet').appendChild(nP);
    });
    // now that we have found what we want. now print out to the html in a new paragraph
};
rendNotes(toDoFilterSheet,deleteOtherText);
document.getElementById('filter-to-dos-here').addEventListener('input',function(e){
    // @ts-ignore
    deleteOtherText.searchText = e.target.value;
    rendNotes(toDoFilterSheet,deleteOtherText);
    // deleteOtherText.searchText= e.target;
});

document.getElementById('submit-form').addEventListener('submit', function (e) {
    const new2do = document.createElement('p');
    new2do.id = 'new-todo'; // gives id to new p
    e.preventDefault();
    // i want to push to 
    toDoFilterSheet.push({
        // @ts-ignore
        text: e.target.elements.addTo.value,
        completed: false
    });
    toDoFilterSheet.forEach(element => {
        console.log(`${element.text} + ${element.completed}`);

    });
    // @ts-ignore
    new2do.textContent = e.target.elements.addTo.value;
    // document.querySelector('div').appendChild(newpara);

    document.getElementById('filter-todo-sheet').appendChild(new2do);
    // @ts-ignore
    // document.querySelector('body').appendChild(newpara);
});
//////////////created div above 
