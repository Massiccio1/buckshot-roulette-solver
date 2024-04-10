// Get references to HTML elements
const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");

// Function to add a new task
// function addTask() {
//     // Get the text from the input field
//     const taskText = newTaskInput.value;

//     // Create a new list item
//     const listItem = document.createElement("li");
//     listItem.innerText = taskText;

//     // Append the new list item to the todoList
//     todoList.appendChild(listItem);

//     // Clear the input field
//     newTaskInput.value = "";
// }


function addTask() {
    // Get the text from the input field
    const taskText = newTaskInput.value;

    // Create a new list item
    const listItem = document.createElement("li");

    // Create a task text element
    const taskTextElement = document.createElement("span");
    taskTextElement.innerText = taskText;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";

    // Add a click event listener to the remove button
    removeButton.addEventListener("click", function () {
        listItem.remove(); // Remove the clicked list item
    });

    // Append the task text and remove button to the list item
    listItem.appendChild(taskTextElement);
    listItem.appendChild(removeButton);

    // Append the new list item to the todoList
    todoList.appendChild(listItem);

    // Clear the input field
    newTaskInput.value = "";
}
// Add a click event listener to the "Add Task" button
addButton.addEventListener("click", addTask);