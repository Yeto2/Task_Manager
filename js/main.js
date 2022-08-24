let body = document.body;
let input = document.getElementById("text");
let submit = document.getElementById("add");
let output = document.getElementById("tasks");
let del = document.querySelector(".delete");



//* blanc array
let tasksArray = [] ;
//* object bluePrint
function task(id, title) {
    this.id = id;
    this.title = title;
}



submit.addEventListener('click' , (e)=>{
    e.preventDefault();

    addTasks(input.value);

});


// ----------

output.addEventListener('click', function(event) {

        // const index = tasksArray.findIndex(object => {
        //     return object.id === event.target.parentElement.getAttribute('data-id') ;
        // });
        let id = event.target.parentElement.getAttribute('data-id');

        deleteTasks(id);

    })

function deleteTasks(id) {
    tasksArray = tasksArray.filter(function(item) {
        return item.id != id;
    });
  // update the localStorage
    addToLocalS(tasksArray);
}
//* create the object -> store it into array -> store it local Storage

function addTasks(item) {

    if (item !== "") {
        let tasks = new task(Date.now() , item);
        // then add it to todos array
    tasksArray.push(tasks);
    addToLocalS(tasksArray);
    // finally clear the input box value
    input.value = '';
    }else{
        alert("Write a Task First ! ");
    }
    
}

//* function to add tasks to local storage
function addToLocalS(tasksArray) {
    // conver the array to string then store it.
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    // render them to screen
    renderTasks(tasksArray);
}

//* function to render given tasks to screen
function renderTasks(tasksArray) {
    // clear everything inside <ul> with class=todo-items
    output.innerHTML = '<h4 style="color:#3a3838 ; margin: 20px 0px; font-size: larger;" >Your Tasks List !</h4>';
    // loop onto array elements

    tasksArray.forEach(function(item){

        const div = document.createElement("div");
        div.setAttribute("class","task");
        div.setAttribute("data-id", item.id);

        div.innerHTML = `
        ${item.title}
        <button class="delete">Delete</button>
        `;

        //* append the div
        output.append(div)

    })
    
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
    tasksArray = JSON.parse(reference);
    renderTasks(tasksArray);
    }
}
  // initially get everything from localStorage
getFromLocalStorage();
