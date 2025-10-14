interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

let users: User[] = [
];

let userIdCounter: number = 1;
const userNameInput = document.getElementById('userName') as HTMLInputElement;
const userEmailInput = document.getElementById('userEmail') as HTMLInputElement;
const userRoleSelect = document.getElementById('userRole') as HTMLSelectElement;
const addUserBtn = document.getElementById('addUserBtn') as HTMLButtonElement;
const userTableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;

function renderUsers(): void {
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

function addUser(): void {
  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();
  const role = userRoleSelect.value;

  if (!name || !email) {
    alert('!! Please fill all the details !!');
    return;
  }

  const newUser: User = {
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

function deleteUser(id: number): void {
  users = users.filter(user => user.id !== id);
  renderUsers();
}

function editUser(id: number): void {
  const user = users.find(u => u.id === id);
  if (user) {
    const newName = prompt('Enter new name:', user.name);
    const newEmail = prompt('Enter new email:', user.email);
    const newRole = prompt('Enter new role:', user.role);

    if (newName) user.name = newName;
    if (newEmail) user.email = newEmail;
    if (newRole) user.role = newRole;
    renderUsers();
  }

}

addUserBtn.addEventListener('click', addUser);

renderUsers();