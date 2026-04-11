// API Configuration
const API_URL = 'api/tasks.php';

// ========== API HELPER FUNCTIONS ==========
async function apiCall(method, data = null) {
    try {
        const options = {
            method: method,
            headers: {'Content-Type': 'application/json'}
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(API_URL, options);
        return await response.json();
    } catch (e) {
        console.error('API Error:', e);
        return {success: false, message: 'Connection error'};
    }
}

// Safe localStorage wrapper (hanya untuk user profile, bukan tasks)
const safeStorage = {
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('localStorage getItem error:', e);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('localStorage setItem error:', e);
        }
    },
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('localStorage removeItem error:', e);
        }
    }
};

// Global Data
let tasksData = [];
let userData = JSON.parse(safeStorage.getItem('userData')) || {
    name: 'Frisyilia Febrina',
    email: 'frisyilia25febrina@gmail.com',
    phone: '',
    notifications: {email: true, push: true, sms: false}
};

let currentEditingId = null;
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 6;

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

// Load tasks dari API on startup
async function loadTasks() {
    const res = await apiCall('GET');
    if (res.success) {
        tasksData = (res.data || []).map(task => ({
            ...task,
            id: parseInt(task.id) // Convert string ID to number
        }));
        filteredTasks = tasksData;
        renderTasks();
        renderTugasPage();
        updateStats();
        updateLaporanPage();
        console.log('📊 Tasks loaded:', tasksData.length);
    } else {
        console.error('❌ Failed to load tasks:', res.message);
        tasksData = [];
        filteredTasks = [];
    }
}

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

    document.getElementById('statModalTitle').textContent = `${statusEmoji} ${statusLabel}`;

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
                <div class="stat-modal-icon">📋</div>
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
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
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

// ========== TUGAS PAGE FILTER ==========
let filteredTasks = [];

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
            <div class="task-icon">📋</div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" data-task-id="${task.id}">✏️ Edit</button>
                <button class="btn-delete-task" data-task-id="${task.id}">🗑️ Hapus</button>
            </div>
        `;

        tugasPageList.appendChild(taskElement);
    });
    
    // Add click handlers to task action buttons
    document.querySelectorAll('.btn-edit[data-task-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            openEditModal(taskId);
        });
    });
    document.querySelectorAll('.btn-delete-task[data-task-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            openDeleteModal(taskId);
        });
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
        'todayCount': pending
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progressPercent + '%';
    }

    const reportTasksList = document.getElementById('reportTasksList');
    if (reportTasksList) {
        if (tasksData.length === 0) {
            reportTasksList.innerHTML = '<div style="text-align: center; padding: 1.5rem; color: #999;">Belum ada tugas</div>';
        } else {
            let html = '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">';
            html += '<thead><tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">';
            html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Judul Tugas</th>';
            html += '<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Deskripsi</th>';
            html += '<th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Status</th>';
            html += '</tr></thead><tbody>';
            
            tasksData.forEach(task => {
                const statusColor = task.status === 'selesai' ? '#28a745' : 
                                   task.status === 'pending' ? '#ffc107' : '#dc3545';
                html += `<tr style="border-bottom: 1px solid #ddd;">
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
    taskId = parseInt(taskId);
    const task = tasksData.find(t => parseInt(t.id) === taskId);
    if (!task) {
        console.error('❌ Task not found for ID:', taskId);
        return;
    }
    console.log('✏️ Edit modal opened for task:', task);

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

// Handle save task (async - call API)
async function handleSaveTask(e) {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const status = document.getElementById('taskStatus').value;

    if (currentEditingId) {
        // UPDATE task
        const res = await apiCall('PUT', {
            id: currentEditingId,
            title: title,
            description: description,
            status: status
        });
        
        if (res.success) {
            await loadTasks();
            renderTugasPage();
            updateStats();
            updateLaporanPage();
            closeTaskModal();
        } else {
            alert('Gagal update tugas: ' + res.message);
        }
    } else {
        // ADD new task
        const res = await apiCall('POST', {
            title: title,
            description: description,
            status: status
        });
        
        if (res.success) {
            await loadTasks();
            renderTugasPage();
            updateStats();
            updateLaporanPage();
            closeTaskModal();
        } else {
            alert('Gagal tambah tugas: ' + res.message);
        }
    }
}

function openDeleteModal(taskId) {
    taskId = parseInt(taskId);
    const task = tasksData.find(t => parseInt(t.id) === taskId);
    if (!task) {
        console.error('❌ Task not found for ID:', taskId);
        return;
    }
    if (task) {
        document.getElementById('deleteMessage').textContent = `Apakah Anda yakin ingin menghapus tugas "${task.title}"?`;
        confirmDelete.dataset.taskId = taskId;
        deleteModal.classList.add('show');
    }
}

// Handle confirm delete (async - call API)
async function handleConfirmDelete() {
    const taskId = parseInt(confirmDelete.dataset.taskId);
    console.log('🗑️ Deleting task ID:', taskId);
    
    const res = await apiCall('DELETE', {id: taskId});
    
    if (res.success) {
        console.log('✅ Task deleted successfully');
        await loadTasks();
        renderTugasPage();
        updateStats();
        updateLaporanPage();
        deleteModal.classList.remove('show');
    } else {
        console.error('❌ Failed to delete task:', res.message);
        alert('Gagal hapus tugas: ' + res.message);
    }
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

    const totalPages = Math.ceil(tasksData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedTasks = tasksData.slice(startIdx, endIdx);

    paginatedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item status-${task.status}`;
        
        taskElement.innerHTML = `
            <div class="task-icon">📋</div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" data-task-id="${task.id}">✏️ Edit</button>
                <button class="btn-delete-task" data-task-id="${task.id}">🗑️ Hapus</button>
            </div>
        `;

        tasksList.appendChild(taskElement);
    });
    
    // Add click handlers to task action buttons
    document.querySelectorAll('.btn-edit[data-task-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            openEditModal(taskId);
        });
    });
    document.querySelectorAll('.btn-delete-task[data-task-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            openDeleteModal(taskId);
        });
    });

    updatePagination();
}

// ========== PAGINATION ==========
function updatePagination() {
    const totalPages = Math.ceil(tasksData.length / itemsPerPage);
    const pageButtons = document.querySelectorAll('.page-btn');

    for (let i = 1; i < pageButtons.length - 1; i++) {
        pageButtons[i].textContent = i;
        pageButtons[i].dataset.page = i;
        
        if (i === currentPage) {
            pageButtons[i].classList.add('active');
        } else {
            pageButtons[i].classList.remove('active');
        }
    }

    pageButtons[0].disabled = currentPage === 1;
    pageButtons[0].style.opacity = currentPage === 1 ? '0.5' : '1';
    pageButtons[0].style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';

    pageButtons[pageButtons.length - 1].disabled = currentPage === totalPages || totalPages === 0;
    pageButtons[pageButtons.length - 1].style.opacity = (currentPage === totalPages || totalPages === 0) ? '0.5' : '1';
    pageButtons[pageButtons.length - 1].style.cursor = (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer';
}

document.querySelectorAll('.page-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const totalPages = Math.ceil(tasksData.length / itemsPerPage);
        
        if (index === 0) {
            if (currentPage > 1) {
                currentPage--;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (index === document.querySelectorAll('.page-btn').length - 1) {
            if (currentPage < totalPages) {
                currentPage++;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            const pageNum = parseInt(btn.dataset.page);
            if (pageNum && pageNum <= totalPages && pageNum > 0) {
                currentPage = pageNum;
                renderTasks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// ========== SETTINGS ==========
const btnSaveSettings = document.querySelector('.btn-save-settings');
if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
        const newName = document.getElementById('settingName').value;
        const newEmail = document.getElementById('settingEmail').value;
        const newPhone = document.getElementById('settingPhone').value;
        
        userData.name = newName;
        userData.email = newEmail;
        userData.phone = newPhone;
        
        safeStorage.setItem('userData', JSON.stringify(userData));
        updateProfileUI();
        alert('Pengaturan akun berhasil disimpan!');
    });
}

function updateProfileUI() {
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = userData.name;
    
    const profileBtnSpan = document.querySelector('.profile-btn span');
    if (profileBtnSpan) profileBtnSpan.textContent = userData.name.split(' ')[0];
    
    const settingProfileH4 = document.querySelector('.setting-profile-info h4');
    if (settingProfileH4) settingProfileH4.textContent = userData.name;
    
    const settingProfileP = document.querySelector('.setting-profile-info p');
    if (settingProfileP) settingProfileP.textContent = userData.email;

    const settingNameInput = document.getElementById('settingName');
    if (settingNameInput) settingNameInput.value = userData.name;
    
    const settingEmailInput = document.getElementById('settingEmail');
    if (settingEmailInput) settingEmailInput.value = userData.email;
    
    const settingPhoneInput = document.getElementById('settingPhone');
    if (settingPhoneInput) settingPhoneInput.value = userData.phone || '';

    const reportNameH4 = document.querySelector('.report-user-info h4');
    if (reportNameH4) reportNameH4.textContent = userData.name;
}

const btnLogout = document.querySelector('.btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            alert('Anda telah berhasil keluar. Terima kasih!');
        }
    });
}

const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        alert(`Profil: ${userData.name}\nEmail: ${userData.email}\nTelepon: ${userData.phone || '-'}\nStatus: Praktik Kerja Lapangan`);
    });
}

const logoBtn = document.querySelector('.logo');
if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.addEventListener('click', () => {
        showPage('dashboardPage');
    });
}

const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('🔔 Tidak ada notifikasi baru untuk saat ini.');
    });
}

// ========== PASSWORD CHANGE ==========
let userPassword = '250208';

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
        
        if (newPassword.length < 6) {
            showPasswordMessage('Password baru harus minimal 6 karakter!', 'warning');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showPasswordMessage('Password baru dan konfirmasi tidak sesuai!', 'error');
            return;
        }
        
        userPassword = newPassword;
        showPasswordMessage('✓ Password berhasil diubah!', 'success');
        
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
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing dashboard...');
    
    // Setup menu items - ensure all are clickable
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('📋 Found menu items:', menuItems.length);
    
    menuItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        const pageMap = ['dashboardPage', 'tugasPage', 'laporanPage', 'pengaturanPage'];
        
        item.addEventListener('click', () => {
            console.log(`🔗 Menu clicked - index: ${index}, page: ${pageMap[index]}`);
            showPage(pageMap[index]);
        });
    });
    
    // Update UI
    updateProfileUI();
    
    // Load tasks dari API
    console.log('📡 Loading tasks dari API...');
    await loadTasks();
    
    // Set initial page
    showPage('dashboardPage');
    
    console.log('✅ Dashboard initialized. Total tasks:', tasksData.length);
});
