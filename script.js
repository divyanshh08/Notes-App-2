/*
Pseudocode
Select => 
    noteInput
    saveBtn
    DelBtn
    emptyMsg
    taskList
    taskName
    dateTime
Listener => 
    saveBtn -> click
    delBtn -> click
Process =>
    As save Button is clicked, addNote() will run, the card will be added in the task list.
    As delBtn is clicked, delBtn() will run

    localStorage :-

    Functions:
    addNote() :- check if input is valid or not.
        Create task name, date, time, delete Btn elements.
        Give them Their classes.
        save task Name, time, date to localStorage.
        Append the card to the taskList.
        Clear the inputText.
        Remove the EmptyMsg.

        create data as:
        {
            id: ?,          // You decide
            text: ?,        // Note content
            createdAt: ?    // Date/time
        }

    delBtn() :- delete the card. 
        Use 'remove()' function.
        Check the whether to show the EmptyMsg or not.


Update UI => 
    renderUI() :-
        

    Remove the EmptyMsg if required.

*/

let noteInput = document.querySelector("#noteInput");
let saveBtn = document.querySelector("#saveBtn");
let emptyMsg = document.querySelector("#emptyMsg");
let taskList = document.querySelector("#taskList");
let taskID = 1;
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function renderUI() {
  taskList.innerHTML = "";

  if (tasks.length !== 0) {
    emptyMsg.textContent = "";
  }
  if(tasks.length === 0){
    taskID = 1;
  }

  tasks.forEach((element) => {
    // 'element' here are the objects insdie the task array.
    const card = document.createElement("div");
    const taskName = document.createElement("h1");
    const dateTime = document.createElement("h3");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", () => {
      deleteNote(element.id);
    });

    taskName.textContent = `${element.text}, ${element.id}`;
    dateTime.textContent = element.createdAt;
    deleteBtn.textContent = "Delete";

    card.classList.add("card");
    taskName.classList.add("taskname");
    dateTime.classList.add("dateTime");
    deleteBtn.classList.add("delBtn");

    taskList.appendChild(card);
    card.appendChild(taskName);
    card.appendChild(dateTime);
    card.appendChild(deleteBtn);
  });
}

renderUI();

saveBtn.addEventListener("click", () => {
  if (noteInput.value.trim().length === 0) {
    console.log("Invalid Input");
    return;
  }

  const now = new Date();
  const formattedTime = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const newTask = {
    id: taskID,
    text: `${noteInput.value}`,
    createdAt: `${formattedTime}`,
  };

  taskID = taskID + 1;

  tasks.push(newTask);
  localStorage.setItem("myTasks", JSON.stringify(tasks));
  noteInput.value = "";
  emptyMsg.textContent = "";
  renderUI();
});

function deleteNote(noteID) {
  tasks = tasks.filter((element) => element.id !== noteID);
  localStorage.setItem("myTasks", JSON.stringify(tasks));

  renderUI();
}
