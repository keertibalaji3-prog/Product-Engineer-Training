"use strict";
let users = [];
let userIdCounter = 1;
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userRoleSelect = document.getElementById('userRole');
const addUserBtn = document.getElementById('addUserBtn');
const userTableBody = document.getElementById('userTableBody');
function renderUsers() {
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${index + 1}. ${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
        <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
      </td>`;
        userTableBody.appendChild(row);
    });
}
function addUser() {
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    const role = userRoleSelect.value;
    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }
    const newUser = {
        id: userIdCounter++,
        name: name,
        email: email,
        role: role
    };
    users.push(newUser);
    renderUsers();
    userNameInput.value = '';
    userEmailInput.value = '';
    userRoleSelect.value = 'Admin';
}
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUsers();
}
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        const newName = prompt('Enter new name:', user.name);
        const newEmail = prompt('Enter new email:', user.email);
        const newRole = prompt('Enter new role:', user.role);
        if (newName)
            user.name = newName;
        if (newEmail)
            user.email = newEmail;
        if (newRole)
            user.role = newRole;
        renderUsers();
    }
}
addUserBtn.addEventListener('click', addUser);
renderUsers();
