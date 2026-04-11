// Initial Data Tugas Magang (Pilih Kosong sesuai request hapus data dummy)
const initialTasksData = [];

// Get tasks from localStorage or use initial data
let tasksData = JSON.parse(localStorage.getItem('tasksData')) || initialTasksData;

// User Profile Data
let userData = JSON.parse(localStorage.getItem('userData')) || {
    name: 'Frisyilia Febrina',
    email: 'frisyilia25febrina@gmail.com',
    phone: '',
    notifications: {
        email: true,
        push: true,
        sms: false
    }
};

let currentEditingId = null;
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 6; // Disesuaikan agar lebih enak dilihat di dashboard

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskModal = document.getElementById('taskModal');
const deleteModal = document.getElementById('deleteModal');
const statModal = document.getElementById('statModal');
const btnAddTask = document.querySelector('.btn-add-task');
const closeModal = document.getElementById('closeModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const closeStatModal = document.getElementById('closeStatModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const tasksList = document.getElementById('tasksList');

// Event Listeners
btnAddTask.addEventListener('click', openAddModal);
closeModal.addEventListener('click', () => closeTaskModal());
closeDeleteModal.addEventListener('click', () => deleteModal.classList.remove('show'));
closeStatModal.addEventListener('click', () => statModal.classList.remove('show'));
cancelBtn.addEventListener('click', () => closeTaskModal());
cancelDelete.addEventListener('click', () => deleteModal.classList.remove('show'));
taskForm.addEventListener('submit', handleSaveTask);
confirmDelete.addEventListener('click', handleConfirmDelete);

// ========== STAT MODAL FUNCTIONS ==========
function openStatModal(status) {
    let filteredTasks = [];
    let statusLabel = '';
    let statusEmoji = '';

    if (status === 'all') {
        filteredTasks = tasksData;
        statusLabel = 'Semua Tugas';
        statusEmoji = '📋';
    } else if (status === 'selesai') {
        filteredTasks = tasksData.filter(t => t.status === 'selesai');
        statusLabel = 'Tugas Selesai';
        statusEmoji = '✅';
    } else if (status === 'pending') {
        filteredTasks = tasksData.filter(t => t.status === 'pending');
        statusLabel = 'Tugas Sedang Dikerjakan';
        statusEmoji = '⏳';
    } else if (status === 'ditolak') {
        filteredTasks = tasksData.filter(t => t.status === 'ditolak');
        statusLabel = 'Tugas Ditolak';
        statusEmoji = '❌';
    }

    // Update modal title
    document.getElementById('statModalTitle').textContent = `${statusEmoji} ${statusLabel}`;

    // Render tasks in modal
    const statModalContent = document.getElementById('statModalContent');
    statModalContent.innerHTML = '';

    if (filteredTasks.length === 0) {
        statModalContent.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Belum ada tugas dalam kategori ini.</div>';
        statModal.classList.add('show');
        return;
    }

    filteredTasks.forEach(task => {
        const statModalItem = document.createElement('div');
        statModalItem.className = `stat-modal-item ${task.status}`;
        
        statModalItem.innerHTML = `
            <div class="stat-modal-item-header">
                <div class="stat-modal-icon">${task.icon}</div>
                <div class="stat-modal-details">
                    <div class="stat-modal-title">${task.title}</div>
                    <div class="stat-modal-desc">${task.description}</div>
                    <div class="stat-modal-status">${task.status.toUpperCase()}</div>
                </div>
            </div>
        `;

        statModalContent.appendChild(statModalItem);
    });

    statModal.classList.add('show');
}

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Set active menu based on page
    const menuMap = {
        'dashboardPage': 0,
        'tugasPage': 1,
        'laporanPage': 2,
        'pengaturanPage': 3
    };
    
    if (menuMap[pageId] !== undefined) {
        document.querySelectorAll('.menu-item')[menuMap[pageId]].classList.add('active');
    }
}

// Menu navigation
document.querySelectorAll('.menu-item').forEach((item, index) => {
    const pageMap = ['dashboardPage', 'tugasPage', 'laporanPage', 'pengaturanPage'];
    item.addEventListener('click', () => {
        showPage(pageMap[index]);
    });
});

// ========== TUGAS PAGE FILTER ==========
let filteredTasks = tasksData;

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.dataset.filter;
        
        if (currentFilter === 'all') {
            filteredTasks = tasksData;
        } else {
            filteredTasks = tasksData.filter(t => t.status === currentFilter);
        }
        
        renderTugasPage();
    });
});

// Render Tugas Page
function renderTugasPage() {
    const tugasPageList = document.getElementById('tugasPageList');
    tugasPageList.innerHTML = '';

    if (filteredTasks.length === 0) {
        tugasPageList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Belum ada tugas dengan status ini.</div>';
        return;
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item status-${task.status}`;
        
        taskElement.innerHTML = `
            <div class="task-icon">${task.icon}</div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="openEditModal(${task.id})">✏️ Edit</button>
                <button class="btn-delete-task" onclick="openDeleteModal(${task.id})">🗑️ Hapus</button>
            </div>
        `;

        tugasPageList.appendChild(taskElement);
    });
}

// ========== LAPORAN PAGE ==========
function updateLaporanPage() {
    const total = tasksData.length;
    const completed = tasksData.filter(t => t.status === 'selesai').length;
    const pending = tasksData.filter(t => t.status === 'pending').length;
    const rejected = tasksData.filter(t => t.status === 'ditolak').length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const elements = {
        'reportTotal': total,
        'reportCompleted': completed,
        'reportPending': pending,
        'reportRejected': rejected,
        'progressPercent': progressPercent,
        'todayCount': pending // Aliasing pending as today's active tasks
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progressPercent + '%';
    }

    // Render task list di report
    const reportTasksList = document.getElementById('reportTasksList');
    if (reportTasksList) {
        if (tasksData.length === 0) {
            reportTasksList.innerHTML = '<div style="text-align: center; padding: 1.5rem; color: #999;">Belum ada tugas</div>';
        } else {
            let html = '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">';
            html += '<thead><tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">';
            html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Icon</th>';
            html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Judul Tugas</th>';
            html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Deskripsi</th>';
            html += '<th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Status</th>';
            html += '</tr></thead><tbody>';
            
            tasksData.forEach(task => {
                const statusColor = task.status === 'selesai' ? '#28a745' : 
                                   task.status === 'pending' ? '#ffc107' : '#dc3545';
                html += `<tr style="border-bottom: 1px solid #ddd;">
                    <td data-label="Icon" style="padding: 10px; border: 1px solid #ddd; text-align: center; font-size: 18px;">${task.icon}</td>
                    <td data-label="Judul Tugas" style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${task.title}</td>
                    <td data-label="Deskripsi" style="padding: 10px; border: 1px solid #ddd;">${task.description}</td>
                    <td data-label="Status" style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                        <span style="background-color: ${statusColor}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                            ${task.status.toUpperCase()}
                        </span>
                    </td>
                </tr>`;
            });
            
            html += '</tbody></table>';
            reportTasksList.innerHTML = html;
        }
    }
}

// ========== MODAL FUNCTIONS ==========
function openAddModal() {
    currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'Tambah Tugas Baru';
    taskForm.reset();
    taskModal.classList.add('show');
}

function openEditModal(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (!task) return;

    currentEditingId = taskId;
    document.getElementById('modalTitle').textContent = 'Edit Tugas';
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.description;
    document.getElementById('taskStatus').value = task.status;
    taskModal.classList.add('show');
}

function closeTaskModal() {
    taskModal.classList.remove('show');
    currentEditingId = null;
    taskForm.reset();
}

function handleSaveTask(e) {
    e.preventDefault();

    // Gunakan emoji default untuk tasks
    const icon = '📋';
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const status = document.getElementById('taskStatus').value;

    if (currentEditingId) {
        const taskIndex = tasksData.findIndex(t => t.id === currentEditingId);
        if (taskIndex !== -1) {
            tasksData[taskIndex] = {
                id: currentEditingId,
                icon: tasksData[taskIndex].icon || icon,
                title,
                description,
                status
            };
        }
    } else {
        const newId = tasksData.length > 0 ? Math.max(...tasksData.map(t => t.id)) + 1 : 1;
        tasksData.push({
            id: newId,
            icon,
            title,
            description,
            status
        });
    }

    localStorage.setItem('tasksData', JSON.stringify(tasksData));
    renderTasks();
    renderTugasPage();
    updateStats();
    updateLaporanPage();
    closeTaskModal();
}

function openDeleteModal(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (task) {
        document.getElementById('deleteMessage').textContent = `Apakah Anda yakin ingin menghapus tugas "${task.title}"?`;
        confirmDelete.dataset.taskId = taskId;
        deleteModal.classList.add('show');
    }
}

function handleConfirmDelete() {
    const taskId = parseInt(confirmDelete.dataset.taskId);
    tasksData = tasksData.filter(t => t.id !== taskId);
    
    localStorage.setItem('tasksData', JSON.stringify(tasksData));
    renderTasks();
    renderTugasPage();
    updateStats();
    updateLaporanPage();
    deleteModal.classList.remove('show');
}

// ========== STATISTICS ==========
function updateStats() {
    const total = tasksData.length;
    const completed = tasksData.filter(t => t.status === 'selesai').length;
    const pending = tasksData.filter(t => t.status === 'pending').length;
    const rejected = tasksData.filter(t => t.status === 'ditolak').length;

    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-number').textContent = total;
        statCards[1].querySelector('.stat-number').textContent = completed;
        statCards[2].querySelector('.stat-number').textContent = pending;
        statCards[3].querySelector('.stat-number').textContent = rejected;
    }
}

// ========== RENDER DASHBOARD TASKS ==========
function renderTasks() {
    tasksList.innerHTML = '';

    if (tasksData.length === 0) {
        tasksList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Belum ada tugas. Klik tombol "Tambah Tugas Baru" untuk menambahkan.</div>';
        updatePagination();
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(tasksData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedTasks = tasksData.slice(startIdx, endIdx);

    paginatedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item status-${task.status}`;
        
        taskElement.innerHTML = `
            <div class="task-icon">${task.icon}</div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="openEditModal(${task.id})">✏️ Edit</button>
                <button class="btn-delete-task" onclick="openDeleteModal(${task.id})">🗑️ Hapus</button>
            </div>
        `;

        tasksList.appendChild(taskElement);
    });

    updatePagination();
}

// ========== PAGINATION ==========
function updatePagination() {
    const totalPages = Math.ceil(tasksData.length / itemsPerPage);
    const pageButtons = document.querySelectorAll('.page-btn');

    // Update page number buttons (0 is prev, last is next)
    for (let i = 1; i < pageButtons.length - 1; i++) {
        pageButtons[i].textContent = i;
        pageButtons[i].dataset.page = i;
        
        if (i === currentPage) {
            pageButtons[i].classList.add('active');
        } else {
            pageButtons[i].classList.remove('active');
        }
    }

    // Disable/enable prev button
    pageButtons[0].disabled = currentPage === 1;
    pageButtons[0].style.opacity = currentPage === 1 ? '0.5' : '1';
    pageButtons[0].style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';

    // Disable/enable next button
    pageButtons[pageButtons.length - 1].disabled = currentPage === totalPages || totalPages === 0;
    pageButtons[pageButtons.length - 1].style.opacity = (currentPage === totalPages || totalPages === 0) ? '0.5' : '1';
    pageButtons[pageButtons.length - 1].style.cursor = (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer';
}

// Pagination button event listeners
document.querySelectorAll('.page-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const totalPages = Math.ceil(tasksData.length / itemsPerPage);
        
        if (index === 0) {
            // Previous button
            if (currentPage > 1) {
                currentPage--;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (index === document.querySelectorAll('.page-btn').length - 1) {
            // Next button
            if (currentPage < totalPages) {
                currentPage++;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // Page number button
            const pageNum = parseInt(btn.dataset.page);
            if (pageNum && pageNum <= totalPages && pageNum > 0) {
                currentPage = pageNum;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});



const btnSaveSettings = document.querySelector('.btn-save-settings');
if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
        const newName = document.getElementById('settingName').value;
        const newEmail = document.getElementById('settingEmail').value;
        const newPhone = document.getElementById('settingPhone').value;
        
        userData.name = newName;
        userData.email = newEmail;
        userData.phone = newPhone;
        
        localStorage.setItem('userData', JSON.stringify(userData));
        updateProfileUI();
        alert('Pengaturan akun berhasil disimpan!');
    });
}

function updateProfileUI() {
    // Update dashboard name
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = userData.name;
    
    // Update sidebar/nav name
    const profileBtnSpan = document.querySelector('.profile-btn span');
    if (profileBtnSpan) profileBtnSpan.textContent = userData.name.split(' ')[0]; // Ambil nama depan
    
    // Update settings name label
    const settingProfileH4 = document.querySelector('.setting-profile-info h4');
    if (settingProfileH4) settingProfileH4.textContent = userData.name;
    
    const settingProfileP = document.querySelector('.setting-profile-info p');
    if (settingProfileP) settingProfileP.textContent = userData.email;

    // Update settings inputs
    const settingNameInput = document.getElementById('settingName');
    if (settingNameInput) settingNameInput.value = userData.name;
    
    const settingEmailInput = document.getElementById('settingEmail');
    if (settingEmailInput) settingEmailInput.value = userData.email;
    
    const settingPhoneInput = document.getElementById('settingPhone');
    if (settingPhoneInput) settingPhoneInput.value = userData.phone || '';

    // Update report name
    const reportNameH4 = document.querySelector('.report-user-info h4');
    if (reportNameH4) reportNameH4.textContent = userData.name;
}


const btnLogout = document.querySelector('.btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            alert('Anda telah berhasil keluar. Terima kasih!');
            // Redirect ke halaman login atau home
        }
    });
}

// Profile button
const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        alert(`Profil: ${userData.name}\nEmail: ${userData.email}\nTelepon: ${userData.phone || '-'}\nStatus: Praktik Kerja Lapangan`);
    });
}

// Logo button (Back to Dashboard)
const logoBtn = document.querySelector('.logo');
if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.addEventListener('click', () => {
        showPage('dashboardPage');
    });
}

// Notification button
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('🔔 Tidak ada notifikasi baru untuk saat ini.');
    });
}

// ========== PASSWORD CHANGE FUNCTION ==========
let userPassword = localStorage.getItem('userPassword') || '250208';

const passwordModal = document.getElementById('passwordModal');
const passwordForm = document.getElementById('passwordForm');
const closePasswordModal = document.getElementById('closePasswordModal');
const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
const btnChangePasswordEl = document.querySelector('.btn-change-password');
const passwordMessage = document.getElementById('passwordMessage');

function openPasswordModal() {
    passwordModal.classList.add('show');
    passwordForm.reset();
    passwordMessage.classList.remove('show');
}

function closeChangePasswordModal() {
    passwordModal.classList.remove('show');
    passwordForm.reset();
    passwordMessage.classList.remove('show');
}

if (btnChangePasswordEl) {
    btnChangePasswordEl.addEventListener('click', openPasswordModal);
}

if (closePasswordModal) {
    closePasswordModal.addEventListener('click', closeChangePasswordModal);
}

if (cancelPasswordBtn) {
    cancelPasswordBtn.addEventListener('click', closeChangePasswordModal);
}

if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate new password length
        if (newPassword.length < 6) {
            showPasswordMessage('Password baru harus minimal 6 karakter!', 'warning');
            return;
        }
        
        // Validate password match
        if (newPassword !== confirmPassword) {
            showPasswordMessage('Password baru dan konfirmasi tidak sesuai!', 'error');
            return;
        }
        
        // Update password directly
        userPassword = newPassword;
        localStorage.setItem('userPassword', userPassword);
        
        showPasswordMessage('✓ Password berhasil diubah!', 'success');
        
        // Reset form and close modal after 2 seconds
        setTimeout(() => {
            closeChangePasswordModal();
        }, 2000);
    });
}

function showPasswordMessage(message, type) {
    passwordMessage.textContent = message;
    passwordMessage.className = `password-message show ${type}`;
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Clear all password-related localStorage
    localStorage.removeItem('userPassword');
    
    // Force reload data dari localStorage
    tasksData = JSON.parse(localStorage.getItem('tasksData')) || initialTasksData;
    
    // Nama-nama tugas dummy yang akan dibersihkan
    const dummyTitles = [
        'Analisis Data Penjualan', 'Pengembangan Website', 'Laporan Keuangan', 
        'Desain Poster', 'Presentasi Bisnis', 'Riset Pasar', 'Customer Service', 
        'Inventory Management', 'Email Marketing', 'E-commerce Setup', 
        'App Development', 'Partnership Outreach'
    ];

    // Bersihkan data dummy jika ditemukan dalam list
    const hasDummyData = tasksData.some(t => dummyTitles.includes(t.title));
    if (hasDummyData) {
        tasksData = tasksData.filter(t => !dummyTitles.includes(t.title));
        localStorage.setItem('tasksData', JSON.stringify(tasksData));
    }

    // Re-save ke localStorage jika belum ada
    if (!localStorage.getItem('tasksData')) {
        localStorage.setItem('tasksData', JSON.stringify(tasksData));
    }
    
    // Reset password to default every load
    userPassword = '250208';
    
    renderTasks();
    renderTugasPage();
    updateStats();
    updateLaporanPage();
    updateProfileUI();
    showPage('dashboardPage');
});
