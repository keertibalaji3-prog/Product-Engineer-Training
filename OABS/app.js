 let currentUser = null;
        let users = [
            { id: 1, name: 'Admin User', email: 'admin@oabs.com', password: 'adminoabs', phone: '+1234567890', role: 'admin', status: 'active' }
        ];
        let appointments = [];
        let services = [
            { id: 1, name: 'General Health Consultation', description: 'General medical consultation', duration: '30 mins', price: '₹50', available: true },
            { id: 2, name: 'Dental Checkup', description: 'Complete dental examination', duration: '45 mins', price: '₹75', available: true },
            { id: 3, name: 'Hair Treatment', description: 'Hair treatment consultation and service', duration: '60 mins', price: '₹40', available: true },
            { id: 4, name: 'Physiotherapy', description: 'Physiotherapy practice and service', duration: '60 mins', price: '₹80', available: true },
            { id: 5, name: 'Skin Treatment', description: 'Advanced skin care treatment', duration: '45 mins', price: '₹90', available: true }
        ];

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadFromStorage();
            setupEventListeners();
            
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('appointmentDate').min = today;
        });

        function setupEventListeners() {
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            document.getElementById('registerForm').addEventListener('submit', handleRegister);
            document.getElementById('bookingForm').addEventListener('submit', handleBooking);
        }

        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                if (user.status === 'inactive') {
                    showAlert('userAlert', 'Your account has been deactivated. Please contact admin.', 'error');
                    return;
                }
                currentUser = user;
                saveToStorage();
                
                if (user.role === 'admin') {
                    showAdminDashboard();
                } else {
                    showUserDashboard();
                }
            } else {
                showAlert('userAlert', 'Invalid email or password', 'error');
            }
        }

        function handleRegister(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;

            if (users.find(u => u.email === email)) {
                showAlert('userAlert', 'Email already registered', 'error');
                return;
            }

            const newUser = {
                id: users.length + 1,
                name,
                email,
                phone,
                password,
                role: 'user',
                status: 'active'
            };

            users.push(newUser);
            saveToStorage();
            showAlert('userAlert', 'Registration successful! Please login.', 'success');
            document.getElementById('registerForm').reset();
        }

        function showUserDashboard() {
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('adminDashboard').classList.add('hidden');
            document.getElementById('userDashboard').classList.remove('hidden');
            
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
        }

        function showAdminDashboard() {
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('userDashboard').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            
            document.getElementById('adminName').textContent = currentUser.name;
            updateAdminStats();
            loadAdminAppointments();
        }

        function showBookingForm() {
            document.getElementById('bookingSection').classList.remove('hidden');
            document.getElementById('upcomingSection').classList.add('hidden');
            document.getElementById('historySection').classList.add('hidden');
        }

        function hideBookingForm() {
            document.getElementById('bookingSection').classList.add('hidden');
            document.getElementById('bookingForm').reset();
        }

        function handleBooking(e) {
            e.preventDefault();
            
            const appointment = {
                id: appointments.length + 1,
                userId: currentUser.id,
                userName: currentUser.name,
                service: document.getElementById('serviceSelect').value,
                provider: document.getElementById('providerSelect').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                notes: document.getElementById('appointmentNotes').value,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };

            appointments.push(appointment);
            saveToStorage();
            
            showAlert('userAlert', 'Appointment booked successfully!', 'success');
            hideBookingForm();
            document.getElementById('bookingForm').reset();
        }

        function showUpcomingAppointments() {
            document.getElementById('bookingSection').classList.add('hidden');
            document.getElementById('upcomingSection').classList.remove('hidden');
            document.getElementById('historySection').classList.add('hidden');

            const userAppointments = appointments.filter(a => 
                a.userId === currentUser.id && 
                (a.status === 'confirmed' || a.status === 'rescheduled')
            );

            const html = userAppointments.length > 0 ? 
                '<div class="table-container"><table><thead><tr><th>Service</th><th>Provider</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
                userAppointments.map(apt => `
                    <tr>
                        <td>${apt.service}</td>
                        <td>${apt.provider}</td>
                        <td>${formatDate(apt.date)}</td>
                        <td>${apt.time}</td>
                        <td><span class="badge badge-success">${apt.status}</span></td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="rescheduleAppointment(${apt.id})">Reschedule</button>
                            <button class="btn btn-danger btn-sm" onclick="cancelAppointment(${apt.id})">Cancel</button>
                        </td>
                    </tr>
                `).join('') + '</tbody></table></div>' :
                '<p>No upcoming appointments</p>';

            document.getElementById('upcomingList').innerHTML = html;
        }

        function showAppointmentHistory() {
            document.getElementById('bookingSection').classList.add('hidden');
            document.getElementById('upcomingSection').classList.add('hidden');
            document.getElementById('historySection').classList.remove('hidden');

            const userAppointments = appointments.filter(a => 
                a.userId === currentUser.id && 
                (a.status === 'completed' || a.status === 'cancelled')
            );

            const html = userAppointments.length > 0 ?
                '<div class="table-container"><table><thead><tr><th>Service</th><th>Provider</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>' +
                userAppointments.map(apt => `
                    <tr>
                        <td>${apt.service}</td>
                        <td>${apt.provider}</td>
                        <td>${formatDate(apt.date)}</td>
                        <td>${apt.time}</td>
                        <td><span class="badge badge-${apt.status === 'completed' ? 'success' : 'danger'}">${apt.status}</span></td>
                    </tr>
                `).join('') + '</tbody></table></div>' :
                '<p>No appointment history</p>';

            document.getElementById('historyList').innerHTML = html;
        }

        function rescheduleAppointment(id) {
            const apt = appointments.find(a => a.id === id);
            if (!apt) return;

            const newDate = prompt('Enter new date (YYYY-MM-DD):', apt.date);
            if (!newDate) return;

            const newTime = prompt('Enter new time:', apt.time);
            if (!newTime) return;

            apt.date = newDate;
            apt.time = newTime;
            apt.status = 'rescheduled';
            saveToStorage();

            showAlert('userAlert', 'Appointment rescheduled successfully!', 'success');
            showUpcomingAppointments();
        }

        function cancelAppointment(id) {
            if (!confirm('Are you sure you want to cancel this appointment?')) return;

            const apt = appointments.find(a => a.id === id);
            if (apt) {
                apt.status = 'cancelled';
                saveToStorage();
                showAlert('userAlert', 'Appointment cancelled successfully!', 'success');
                showUpcomingAppointments();
            }
        }

        function showUserProfile() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">User Profile</div>
                    <form id="profileForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="profileName" value="${currentUser.name}" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" value="${currentUser.email}" disabled>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" id="profilePhone" value="${currentUser.phone}" required>
                        </div>
                        <div class="form-group">
                            <label>New Password (leave blank to keep current)</label>
                            <input type="password" id="profilePassword" placeholder="New password">
                        </div>
                        <button type="submit" class="btn btn-primary">Update Profile</button>
                        <button type="button" class="btn btn-light" onclick="this.closest('.modal').remove()">Cancel</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('profileForm').addEventListener('submit', function(e) {
                e.preventDefault();
                currentUser.name = document.getElementById('profileName').value;
                currentUser.phone = document.getElementById('profilePhone').value;
                const newPass = document.getElementById('profilePassword').value;
                if (newPass) currentUser.password = newPass;

                const userIndex = users.findIndex(u => u.id === currentUser.id);
                users[userIndex] = currentUser;
                saveToStorage();

                showAlert('userAlert', 'Profile updated successfully!', 'success');
                document.getElementById('userName').textContent = currentUser.name;
                modal.remove();
            });
        }

        // Admin Functions
        function updateAdminStats() {
            document.getElementById('totalAppointments').textContent = appointments.length;
            document.getElementById('totalUsers').textContent = users.filter(u => u.role === 'user').length;
            document.getElementById('totalServices').textContent = services.length;
        }

        function showAdminAppointments() {
            document.getElementById('adminAppointmentsSection').classList.remove('hidden');
            document.getElementById('serviceManagementSection').classList.add('hidden');
            document.getElementById('userManagementSection').classList.add('hidden');
            loadAdminAppointments();
        }

        function loadAdminAppointments() {
            const tbody = document.getElementById('adminAppointmentsBody');
            tbody.innerHTML = appointments.map(apt => `
                <tr>
                    <td>${apt.id}</td>
                    <td>${apt.userName}</td>
                    <td>${apt.service}</td>
                    <td>${apt.provider}</td>
                    <td>${formatDate(apt.date)}</td>
                    <td>${apt.time}</td>
                    <td><span class="badge badge-${getBadgeClass(apt.status)}">${apt.status}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="adminReschedule(${apt.id})">Reschedule</button>
                        <button class="btn btn-danger btn-sm" onclick="adminCancel(${apt.id})">Cancel</button>
                        <button class="btn btn-secondary btn-sm" onclick="markComplete(${apt.id})">Complete</button>
                    </td>
                </tr>
            `).join('');
        }

        function adminReschedule(id) {
            const apt = appointments.find(a => a.id === id);
            if (!apt) return;

            const newDate = prompt('Enter new date (YYYY-MM-DD):', apt.date);
            if (!newDate) return;

            const newTime = prompt('Enter new time:', apt.time);
            if (!newTime) return;

            apt.date = newDate;
            apt.time = newTime;
            apt.status = 'rescheduled';
            saveToStorage();

            showAlert('adminAlert', 'Appointment rescheduled successfully!', 'success');
            loadAdminAppointments();
            updateAdminStats();
        }

        function adminCancel(id) {
            if (!confirm('Are you sure you want to cancel this appointment?')) return;

            const apt = appointments.find(a => a.id === id);
            if (apt) {
                apt.status = 'cancelled';
                saveToStorage();
                showAlert('adminAlert', 'Appointment cancelled successfully!', 'success');
                loadAdminAppointments();
            }
        }

        function markComplete(id) {
            const apt = appointments.find(a => a.id === id);
            if (apt) {
                apt.status = 'completed';
                saveToStorage();
                showAlert('adminAlert', 'Appointment marked as completed!', 'success');
                loadAdminAppointments();
            }
        }

        function showServiceManagement() {
            document.getElementById('adminAppointmentsSection').classList.add('hidden');
            document.getElementById('serviceManagementSection').classList.remove('hidden');
            document.getElementById('userManagementSection').classList.add('hidden');
            loadServices();
        }

        function loadServices() {
            const tbody = document.getElementById('servicesTableBody');
            tbody.innerHTML = services.map(svc => `
                <tr>
                    <td>${svc.name}</td>
                    <td>${svc.description}</td>
                    <td>${svc.duration}</td>
                    <td>${svc.price}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editService(${svc.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteService(${svc.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }

        function showAddServiceModal() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">Add New Service</div>
                    <form id="addServiceForm">
                        <div class="form-group">
                            <label>Service Name</label>
                            <input type="text" id="newServiceName" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="newServiceDesc" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" id="newServiceDuration" placeholder="e.g., 30 mins" required>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input type="text" id="newServicePrice" placeholder="e.g., $50" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Service</button>
                        <button type="button" class="btn btn-light" onclick="this.closest('.modal').remove()">Cancel</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('addServiceForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const newService = {
                    id: services.length + 1,
                    name: document.getElementById('newServiceName').value,
                    description: document.getElementById('newServiceDesc').value,
                    duration: document.getElementById('newServiceDuration').value,
                    price: document.getElementById('newServicePrice').value,
                    available: true
                };
                services.push(newService);
                saveToStorage();
                showAlert('adminAlert', 'Service added successfully!', 'success');
                loadServices();
                updateAdminStats();
                modal.remove();
            });
        }

        function editService(id) {
            const svc = services.find(s => s.id === id);
            if (!svc) return;

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">Edit Service</div>
                    <form id="editServiceForm">
                        <div class="form-group">
                            <label>Service Name</label>
                            <input type="text" id="editServiceName" value="${svc.name}" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="editServiceDesc" required>${svc.description}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" id="editServiceDuration" value="${svc.duration}" required>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input type="text" id="editServicePrice" value="${svc.price}" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Service</button>
                        <button type="button" class="btn btn-light" onclick="this.closest('.modal').remove()">Cancel</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('editServiceForm').addEventListener('submit', function(e) {
                e.preventDefault();
                svc.name = document.getElementById('editServiceName').value;
                svc.description = document.getElementById('editServiceDesc').value;
                svc.duration = document.getElementById('editServiceDuration').value;
                svc.price = document.getElementById('editServicePrice').value;
                saveToStorage();
                showAlert('adminAlert', 'Service updated successfully!', 'success');
                loadServices();
                modal.remove();
            });
        }

        function deleteService(id) {
            if (!confirm('Are you sure you want to delete this service?')) return;
            services = services.filter(s => s.id !== id);
            saveToStorage();
            showAlert('adminAlert', 'Service deleted successfully!', 'success');
            loadServices();
            updateAdminStats();
        }

        function showUserManagement() {
            document.getElementById('adminAppointmentsSection').classList.add('hidden');
            document.getElementById('serviceManagementSection').classList.add('hidden');
            document.getElementById('userManagementSection').classList.remove('hidden');
            loadUsers();
        }

        function loadUsers() {
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td><span class="badge badge-${user.role === 'admin' ? 'info' : 'success'}">${user.role}</span></td>
                    <td><span class="badge badge-${user.status === 'active' ? 'success' : 'danger'}">${user.status}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="toggleUserStatus(${user.id})" ${user.role === 'admin' ? 'disabled' : ''}>
                            ${user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        function showAddUserModal() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">Add New User</div>
                    <form id="addUserForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="newUserName" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="newUserEmail" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" id="newUserPhone" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="newUserPassword" required>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <select id="newUserRole" required>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Add User</button>
                        <button type="button" class="btn btn-light" onclick="this.closest('.modal').remove()">Cancel</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('addUserForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('newUserEmail').value;
                if (users.find(u => u.email === email)) {
                    alert('Email already exists!');
                    return;
                }
                const newUser = {
                    id: users.length + 1,
                    name: document.getElementById('newUserName').value,
                    email: email,
                    phone: document.getElementById('newUserPhone').value,
                    password: document.getElementById('newUserPassword').value,
                    role: document.getElementById('newUserRole').value,
                    status: 'active'
                };
                users.push(newUser);
                saveToStorage();
                showAlert('adminAlert', 'User added successfully!', 'success');
                loadUsers();
                updateAdminStats();
                modal.remove();
            });
        }

        function editUser(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">Edit User</div>
                    <form id="editUserForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="editUserName" value="${user.name}" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" value="${user.email}" disabled>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" id="editUserPhone" value="${user.phone}" required>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <select id="editUserRole" required ${user.role === 'admin' ? 'disabled' : ''}>
                                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Update User</button>
                        <button type="button" class="btn btn-light" onclick="this.closest('.modal').remove()">Cancel</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('editUserForm').addEventListener('submit', function(e) {
                e.preventDefault();
                user.name = document.getElementById('editUserName').value;
                user.phone = document.getElementById('editUserPhone').value;
                if (user.role !== 'admin') {
                    user.role = document.getElementById('editUserRole').value;
                }
                saveToStorage();
                showAlert('adminAlert', 'User updated successfully!', 'success');
                loadUsers();
                modal.remove();
            });
        }

        function toggleUserStatus(id) {
            const user = users.find(u => u.id === id);
            if (!user || user.role === 'admin') return;

            user.status = user.status === 'active' ? 'inactive' : 'active';
            saveToStorage();
            showAlert('adminAlert', `User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully!`, 'success');
            loadUsers();
        }

        // Utility Functions
        function logout() {
            currentUser = null;
            document.getElementById('authSection').classList.remove('hidden');
            document.getElementById('userDashboard').classList.add('hidden');
            document.getElementById('adminDashboard').classList.add('hidden');
            document.getElementById('loginForm').reset();
        }

        function showAlert(containerId, message, type) {
            const container = document.getElementById(containerId);
            const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
            container.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
            setTimeout(() => container.innerHTML = '', 5000);
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        function getBadgeClass(status) {
            const classes = {
                'confirmed': 'success',
                'rescheduled': 'info',
                'completed': 'success',
                'cancelled': 'danger'
            };
            return classes[status] || 'info';
        }

        function saveToStorage() {
            const data = {
                users,
                appointments,
                services,
                currentUser
            };
            try {
                const dataStr = JSON.stringify(data);
                window.appData = dataStr;
            } catch (e) {
                console.error('Save failed:', e);
            }
        }

        function loadFromStorage() {
            try {
                if (window.appData) {
                    const data = JSON.parse(window.appData);
                    users = data.users || users;
                    appointments = data.appointments || appointments;
                    services = data.services || services;
                    currentUser = data.currentUser;
                    
                    if (currentUser) {
                        if (currentUser.role === 'admin') {
                            showAdminDashboard();
                        } else {
                            showUserDashboard();
                        }
                    }
                }
            } catch (e) {
                console.error('Load failed:', e);
            }
        }