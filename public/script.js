// // Script.js
// function changeColor(element) {
//     if (element.style.backgroundColor === 'lightgray') {
//         element.style.backgroundColor = 'greenyellow';
//         // element.style.color = 'white';
//     } else {
//         element.style.backgroundColor = 'lightgray';
//         // element.style.color = 'black';
//     }
// }
// Script.js
function changeHealth(element) {
    if (element.style.backgroundColor === 'white') {
        element.style.backgroundColor = 'green';
        // element.style.color = 'white';
    } else {
        element.style.backgroundColor = 'white';
        // element.style.color = 'black';
    }
}
function changeWeapon(element) {
    if (element.style.backgroundColor === 'darkred') {
        element.style.backgroundColor = 'darkslateblue';
        // element.style.color = 'white';
    } else if (element.style.backgroundColor === 'darkslateblue') {
        element.style.backgroundColor = 'white';
        // element.style.color = 'black';
    } else {
        element.style.backgroundColor = 'darkred';
    }
}

function sendData() {
    const items = document.querySelectorAll('.health');
    health = [];

    // console.log(items)

    if (items.length != 12)
        return 0

    let p1h = 0
    for (let i = 0; i < 6; i++) {
        val = items[i].style.backgroundColor === 'white' ? 0 : 1
        p1h += val
    }
    let p2h = 0
    for (let i = 6; i < 12; i++) {
        val = items[i].style.backgroundColor === 'white' ? 0 : 1
        p2h += val
    }
    health.push(p1h)
    health.push(p2h)

    const weapons = document.querySelectorAll('.weapon');
    let ammo = []
    for (let j = 0; j < weapons.length; j++) {
        if (weapons[j].style.backgroundColor === "darkred")
            ammo.push(1);
        else if (weapons[j].style.backgroundColor === "darkslateblue")
            ammo.push(0);
        else ammo.push(-1)
    }


    const live = document.getElementById('numberlive');
    const blank = document.getElementById('numberblank');

    const player_items = document.getElementById('items');
    const dealer_items = document.getElementById('items2');

    // console.log(player_items.children)
    let items1 = []
    for (let i = 0; i < player_items.children.length; i++) {
        // console.log(player_items.children[i].firstChild.innerText)
        items1.push(player_items.children[i].firstChild.innerText)
    }
    let items2 = []
    for (let i = 0; i < dealer_items.children.length; i++) {
        // console.log(player_items.children[i].firstChild.innerText)
        items2.push(dealer_items.children[i].firstChild.innerText)
    }
    // console.log(items1)
    // console.log(items2)

    let payload = {
        health: health,
        ammo: [live.valueAsNumber, blank.valueAsNumber],
        known: ammo.slice(0, 8),
        current: ammo.slice(8, ammo.length),
        items: [items1, items2]
    }
    console.log(payload)
    fetch('/updateGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            return response.json(); // Parse response body as JSON
        } else {
            throw new Error('Failed to update dat');
        }
    }).then(data => {
        console.log(data)
        document.getElementById('responseArea').value = JSON.stringify(data, null, 1); // Display response in textarea
    }).catch(error => {
        console.error('Error:', error);
    });
}


// Get references to HTML elements
const todoList = document.getElementById("items");
const newTaskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");

function addTask() {
    // Get the text from the input field
    const taskText = newTaskInput.value;
    console.log(taskText)
    if (taskText == "") {
        console.log("empty text")
        return 0;

    }

    // Create a new list item
    const listItem = document.createElement("li");

    // Create a task text element
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

const todoList2 = document.getElementById("items2");
const newTaskInput2 = document.getElementById("new-task2");
const addButton2 = document.getElementById("add-button2");

function addTask2() {
    // Get the text from the input field
    const taskText = newTaskInput2.value;


    if (taskText == "") {
        return 0;
    }

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
    todoList2.appendChild(listItem);

    // Clear the input field
    newTaskInput2.value = "";
}
// Add a click event listener to the "Add Task" button
addButton2.addEventListener("click", addTask2);
addButton.addEventListener("click", addTask);