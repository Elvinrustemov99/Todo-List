
document.body.onload = function(){
  const todoInput = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const allTasksList = document.getElementById("nav-all");
  const completedTasksList = document.getElementById("nav-completed");
  const unCompletedTasksList = document.getElementById("nav-uncompleted");
  const allTab = document.getElementById("all-count");
  const completedTab = document.getElementById("completed-count");
  const unCompletedTab = document.getElementById("uncompleted-count");

  const taskStatusTypes = {
    completed: "COMPLETED",
    uncompleted: "UNCOMPLETED"
  }

  let tasks = [];
  let taskName = "";

  function updateTaskCount(){
    const completedTasks = tasks.filter(function(task){
      return task.status === taskStatusTypes.completed;
    })

    const uncompletedTasks = tasks.filter(function(task){
      return task.status === taskStatusTypes.uncompleted;
    })
    allTab.innerHTML = tasks.length;
    completedTab.innerHTML = completedTasks.length
    unCompletedTab.innerHTML = uncompletedTasks.length;
  }
  updateTaskCount();
  
  function checkAddButtonState() {
    if (taskName === "") {
      addButton.setAttribute("disabled", "true");
    } else {
      addButton.removeAttribute("disabled")
    }
  }
  checkAddButtonState();
  
  function updateAllTasksList() {
  
    const ul = document.createElement('ul');
    ul.className = 'list-group'

    tasks.forEach(function(task){
      const li = document.createElement('li');
      const span = document.createElement('span');
      const div = document.createElement('div');
      const completeButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      span.innerHTML = task.name;
      li.className ='list-group-item d-flex justify-content-between';
  
  
      if(task.status === taskStatusTypes.completed){
        li.className = 'list-group-item d-flex justify-content-between list-group-item-success';
        span.className = 'text-decoration-line-through'
      }
       else if(task.status === taskStatusTypes.uncompleted){
        li.className = 'list-group-item d-flex justify-content-between list-group-item-danger';
      }
      
  
      li.appendChild(span);
  
  
      if(task.status === taskStatusTypes.uncompleted){
        completeButton.id = task.id;
        completeButton.innerHTML = 'Complete';
        completeButton.className = 'btn btn-success btn-sm me-2';
        completeButton.onclick = completedTask;
        div.appendChild(completeButton);
      }


  
      deleteButton.id = task.id;
      deleteButton.innerHTML = 'Delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.onclick = deleteTask;

      div.appendChild(deleteButton);
      li.appendChild(div);
      ul.appendChild(li);
    });
  
    allTasksList.innerHTML = '';
    allTasksList.append(ul)
    allTab.innerHTML = tasks.length;
  }

  function updateCompletedTasksList() {
    const ul = document.createElement("ul");
    ul.className = "list-group";  
    const completedTasks = tasks.filter(function(task){
      return task.status === taskStatusTypes.completed;
    })
    completedTasks.forEach(function(task){
      const li = document.createElement("li");
      const span = document.createElement("span");
      const div = document.createElement("div");
      const deleteButton = document.createElement("button");

      li.className = "list-group-item d-flex justify-content-between list-group-item-success";
      span.className = "text-decoration-line-through";
      deleteButton.className = "btn btn-danger btn-sm";
      span.innerHTML = task.name;
      deleteButton.innerHTML = "Delete";
      deleteButton.id = task.id;
      deleteButton.onclick = deleteTask;
      div.appendChild(deleteButton);
      li.appendChild(span);
      li.appendChild(div);
      ul.appendChild(li);
    });
    completedTasksList.innerHTML = "";
    completedTasksList.append(ul);
    updateTaskCount()
  }

  function updateUnCompletedTasksList() {
    const unCompletedTask = tasks.filter(function(task) {
      return task.status === taskStatusTypes.uncompleted;
    })
    const ul = document.createElement("ul");
    ul.className = "list-group";
    unCompletedTask.forEach(function(task){
      const li = document.createElement("li");
      const span = document.createElement("span");
      const div = document.createElement("div");
      const unCompletedButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      li.className = "list-group-item d-flex justify-content-between list-group-item-danger";
      span.innerHTML = task.name;
      unCompletedButton.id = task.id;
      unCompletedButton.innerHTML = "Completed";
      unCompletedButton.className = "btn btn-success btn-sm me-2";
      unCompletedButton.onclick = completedTask;
      deleteButton.id = task.id;
      deleteButton.innerHTML = "Delete";
      deleteButton.className = "btn btn-danger btn-sm";
      deleteButton.onclick = deleteTask;

      div.appendChild(unCompletedButton);
      div.appendChild(deleteButton);
      li.appendChild(span);
      li.appendChild(div);
      ul.appendChild(li);
    })
    unCompletedTasksList.innerHTML = "";
    unCompletedTasksList.append(ul);
  }
  
  function deleteTask(e){
    const id = e.target.id;
    tasks = tasks.filter(function(task){
      return task.id != id;
    })
    updateAllTasksList();
    updateCompletedTasksList();
    updateUnCompletedTasksList();
    updateTaskCount()
  }

  function completedTask(e){
    const id = e.target.id;
    tasks = tasks.map(function(task){
      if(task.id == id){
        task.status = taskStatusTypes.completed;
      }
      return task;
    })
    updateAllTasksList();
    updateCompletedTasksList()
    updateUnCompletedTasksList()
    updateTaskCount();
  }

  todoInput.addEventListener("keyup", function (event) {
    taskName = event.target.value;
    checkAddButtonState();
  });
  
  addButton.addEventListener("click", function (e) {
    tasks.push({
      id: tasks.length + 1,
      name: taskName,
      status: taskStatusTypes.uncompleted
    });
    todoInput.value = "";
    taskName = "";
    checkAddButtonState();
    updateAllTasksList();
    updateTaskCount();
  });
}

