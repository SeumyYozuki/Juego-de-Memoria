// Referencias a los elementos del DOM
const todoForm = document.getElementById('todo-form');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const formBtn = document.getElementById('form-btn');
const cancelBtn = document.getElementById('cancel-btn');
const taskList = document.getElementById('task-list');

// --- OPERACIONES DEL STORAGE (El "Core" de tu pregunta) ---

// LEER (Read): Obtener tareas del localStorage
function getTasksFromStorage() {
    // Si quieres usar sessionStorage, solo cambia 'localStorage' por 'sessionStorage' aquí abajo
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// GUARDAR: Guardar el array completo actualizado en localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- FUNCIONES DEL CRUD INTERNO ---

// RENDERIZAR (Read en la UI): Mostrar tareas en pantalla
function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromStorage();

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// CREAR y ACTUALIZAR (Create / Update)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = taskIdInput.value;
    const title = taskTitleInput.value.trim();
    let tasks = getTasksFromStorage();

    if (id === '') {
        // Modo: CREAR NUEVA TAREA
        const newTask = {
            id: Date.now(), // ID único basado en tiempo
            title: title
        };
        tasks.push(newTask);
    } else {
        // Modo: EDITAR TAREA EXISTENTE
        tasks = tasks.map(task => {
            if (task.id === parseInt(id)) {
                return { ...task, title: title };
            }
            return task;
        });
        resetForm();
    }

    saveTasksToStorage(tasks);
    renderTasks();
    todoForm.reset();
});

// PREPARAR EDICIÓN (Pone los datos en el formulario)
window.editTask = function(id) {
    const tasks = getTasksFromStorage();
    const taskToEdit = tasks.find(task => task.id === id);
    
    if (taskToEdit) {
        taskIdInput.value = taskToEdit.id;
        taskTitleInput.value = taskToEdit.title;
        formBtn.innerText = 'Actualizar Tarea';
        cancelBtn.classList.remove('hidden');
    }
};

// ELIMINAR (Delete)
window.deleteTask = function(id) {
    let tasks = getTasksFromStorage();
    // Filtramos para quitar la tarea que tenga el ID seleccionado
    tasks = tasks.filter(task => task.id !== id);
    
    saveTasksToStorage(tasks);
    renderTasks();
};

// Resetear el formulario tras cancelar o editar
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    todoForm.reset();
    taskIdInput.value = '';
    formBtn.innerText = 'Agregar Tarea';
    cancelBtn.classList.add('hidden');
}

// Inicializar la app mostrando las tareas que ya existan guardadas
renderTasks();