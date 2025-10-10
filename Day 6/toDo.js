function Task() {
    const taskInput = document.getElementById("task-id");
    const task_text = taskInput.value.trim();

    if (task_text === "") {
        return;
    }

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.className = "check-box";
    checkbox.type = "checkbox";
    const span = document.createElement("span");
    span.textContent = " " + task_text;

    const delete_button = document.createElement("button")
    delete_button.textContent = "Delete";
    delete_button.className = "delete-btn";
    delete_button.onclick = () => li.remove();

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delete_button);

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";

}