document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const saveTodoBtn = document.getElementById('save-todo-btn');
    const todoInput = document.getElementById('text');
    const saveIndexInput = document.getElementById('saveIndex');
    const listBox = document.getElementById('listBox');

    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    // Function to display todos
    function displayTodos() {
        listBox.innerHTML = ''; // Clear existing list
        todoList.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-800', 'p-4', 'mb-2', 'rounded');
            todoItem.innerHTML = `
                <p class="text-white text-lg">${todo}</p>
                <div>
                    <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2" data-index="${index}" onclick="editTodo(${index})">Edit</button>
                    <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-index="${index}" onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;
            listBox.appendChild(todoItem);
        });
    }

    // Function to add a new todo
    addTaskBtn.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todoList.push(todoText);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            todoInput.value = '';
            displayTodos();
        }
    });

    // Function to edit a todo
    window.editTodo = (index) => {
        todoInput.value = todoList[index];
        saveIndexInput.value = index;
        addTaskBtn.style.display = 'none';
        saveTodoBtn.style.display = 'inline-block';
    };

    // Function to save edited todo
    saveTodoBtn.addEventListener('click', () => {
        const index = saveIndexInput.value;
        const newTodoText = todoInput.value.trim();
        if (newTodoText !== '') {
            todoList[index] = newTodoText;
            localStorage.setItem('todoList', JSON.stringify(todoList));
            todoInput.value = '';
            addTaskBtn.style.display = 'inline-block';
            saveTodoBtn.style.display = 'none';
            displayTodos();
        }
    });

    // Function to delete a todo
    window.deleteTodo = (index) => {
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        displayTodos();
    };

    // Initial display of todos when the page loads
    displayTodos();
});
