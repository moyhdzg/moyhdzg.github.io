const tasks = new Storage('tasks', taskStorage.fromObject);

function generateID(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function clean () {
    document.getElementById("idTask").value = ""
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
}


function add(){
    let id = generateID(5);
    let tName =  document.getElementById("taskName").value;
    let tDescription = document.getElementById("taskDesc").value;
    if (tName =='' || tDescription =='' ) {
        alert('Asegura llenar todos los campos')
    } 
    else {
        const tCurrent = new taskStorage(id,tName,tDescription) 
        tasks.createItem(tCurrent)
        populateTable(tasks.readItems());
        clean();
    }
}

function populateTable(tasks) {
    const tbody = document.getElementById('tableContent');
    tbody.innerHTML = '';
    tasks.forEach((toDo) => tbody.appendChild(createTr(toDo)));
}

function createTr(toDo) {
    const tdHTML = `
    <td>${toDo.getId()}</td>
    <td>${toDo.getTask()}</td>
    <td>${toDo.getDesc()}</td>
    <td class="addEdit">
        <button id="button-edit" onclick='edit(this)'>Edit</button>
        <button id="button-delete" onclick='deplete(this)'>Delete</button>
    </td>`;
    const tr = document.createElement('tr');
    tr.innerHTML = tdHTML;
    return tr;
}

function edit(event) {
    const { id, task, desc } = getDataTr(event);
    fillInputs(id, task, desc);
    }

function fillInputs(id, task, desc) {
    document.querySelector('input[id="idTask"]').value = id;
    document.querySelector('input[id="taskName"]').value = task;
    document.querySelector('input[id="taskDesc"]').value = desc;
}

function update(event) {
    const { id, task, desc } = getInputData(event);
    tasks.updateItem(id, (taskComp) => new taskStorage(taskComp.id, task, desc));
    clean();
    populateTable(tasks.readItems());
    }

function getInputData() {
    const id = document.getElementById('idTask').value
    const task = document.getElementById('taskName').value
    const desc =  document.getElementById('taskDesc').value
    return { 
        'id' : id,
        'task' : task,
        'desc': desc,
    };
}

function getDataTr(icon) {
    const tr = icon.closest('tr');
    const [id, task, desc] = Array.from(tr.children)
        .slice(0, -1)
        .map((input) => input.innerText);
    return { id, task, desc };  
}

function deplete(event) {
    const { id } = getDataTr(event);
    tasks.deleteItem(id);
    populateTable(tasks.readItems());
}

window.onload = () => {
    populateTable(tasks.readItems());
  };