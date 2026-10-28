
let users = JSON.parse(localStorage.getItem("users")) || [];

// Display users
function showUsers() {
    let list = document.getElementById("userList");
    list.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        list.innerHTML += `
            <tr>
                <td>${users[i].name}</td>
                <td>${users[i].email}</td>
                <td>${users[i].phone}</td>
                <td>${users[i].city}</td>
                <td>
                    <button id="e" class="btn btn-sm btn-outline-info" onclick="editUser(${i})">Edit</button>
                    <button id="d" class="btn btn-sm btn-outline-warning" onclick="deleteUser(${i})">Delete</button>
                </td>
            </tr>`;
    }

    if (users.length == 0) {
        list.innerHTML = "<tr><td colspan='5' class='text-center'>No users added yet.</td></tr>";
    }
}

// Add or update user
document.getElementById("userForm").onsubmit = function(event) {
    event.preventDefault();

    let user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        city: document.getElementById("city").value.trim()
    };

    let index = document.getElementById("editIndex").value;

    if (index == -1) {
        users.push(user);
    } else {
        users[index] = user;
    }

    localStorage.setItem("users", JSON.stringify(users));
    clearForm();
    showUsers();
};

// Edit user
function editUser(index) {
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("phone").value = users[index].phone;
    document.getElementById("city").value = users[index].city;

    document.getElementById("editIndex").value = index;
    document.getElementById("saveBtn").innerHTML = "Update User";
}

// Delete user
function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    clearForm();
    showUsers();
}

// Clear form
function clearForm() {
    document.getElementById("userForm").reset();
    document.getElementById("editIndex").value = -1;
    document.getElementById("saveBtn").innerHTML = "Add User";
}

// Show saved users
showUsers();
