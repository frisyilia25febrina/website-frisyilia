// ========== BLOG DATA ==========
const blogs = [
    {
        id: 1,
        title: "Memulai Perjalanan Belajar Bersama Saya",
        excerpt: "Panduan lengkap untuk pemula yang ingin belajar membuat topologi memakai cisco paket tracer,install linux debian,mengkonfigurasi dhcp server,membuat web server,membuat dns server.",
        category: "Tutorial",
        author: "Frisyilia Febrina",
        date: "12 April 2026",
        readTime: "5 min read",
        emoji: "🚀",
        content: `<p>Web development adalah salah satu skill yang paling dicari di era digital ini. Jika kamu ingin memulai karir di bidang ini, artikel ini akan membantumu.</p>
        
        <h3>Langkah-langkah Awal</h3>
        <p>Pertama, pahami konsep dasar HTML, CSS, dan JavaScript. Ketiga bahasa pemrograman ini adalah fondasi dari web development. Mulai dari yang paling dasar dan perlahan-lahan tingkatkan kemampuanmu.</p>
        
        <h3>Praktik Adalah Kunci</h3>
        <p>Jangan hanya membaca teori. Langsung praktek membuat project kecil seperti halaman portofolio, blog sederhana, atau aplikasi todo list. Dengan praktek, kamu akan lebih memahami konsepnya.</p>`
    },
    {
        id: 2,
        title: "CSS Tips dan Tricks untuk Desain yang Memukau",
        excerpt: "Pelajari teknik-teknik CSS advanced untuk membuat desain yang lebih menarik.",
        category: "Design",
        author: "Frisyilia Febrina",
        date: "10 April 2026",
        readTime: "7 min read",
        emoji: "🎨",
        content: `<p>CSS adalah alat yang powerful untuk membuat desain web yang memukau. Dengan menguasai CSS dengan baik, kamu bisa membuat desain yang tidak hanya indah tapi juga responsif.</p>
        
        <h3>Flexbox dan Grid</h3>
        <p>Flexbox dan CSS Grid adalah dua fitur CSS yang sangat berguna untuk membuat layout yang kompleks dengan mudah. Keduanya sangat penting untuk dikuasai oleh setiap web developer modern.</p>
        
        <h3>Animasi dan Transisi</h3>
        <p>Dengan CSS animations dan transitions, kamu bisa membuat website yang lebih interaktif dan menarik tanpa perlu JavaScript.</p>`
    },
    {
        id: 3,
        title: "JavaScript ES6: Fitur-fitur Penting yang Perlu Diketahui",
        excerpt: "Pelajari fitur-fitur modern JavaScript yang akan membuat coding lebih efisien.",
        category: "Programming",
        author: "Frisyilia Febrina",
        date: "8 April 2026",
        readTime: "8 min read",
        emoji: "⚡",
        content: `<p>JavaScript ES6 (ECMAScript 2015) membawa banyak perubahan yang signifikan. Fitur-fitur baru seperti arrow functions, destructuring, dan async/await membuat JavaScript lebih mudah digunakan.</p>
        
        <h3>Arrow Functions</h3>
        <p>Arrow functions adalah cara yang lebih singkat dan elegan untuk menulis function biasa. Tidak hanya sintaksnya lebih ringkas, tapi juga otomatis binding 'this'.</p>
        
        <h3>Async/Await</h3>
        <p>Async/await membuat handling asynchronous code menjadi lebih mudah dan lebih seperti synchronous code yang biasa kita tulis. Ini adalah cara terbaik untuk handling promises di JavaScript modern.</p>`
    },
    {
        id: 4,
        title: "Responsive Web Design: Panduan Lengkap",
        excerpt: "Buat website yang terlihat sempurna di semua ukuran layar.",
        category: "Design",
        author: "Frisyilia Febrina",
        date: "5 April 2026",
        readTime: "6 min read",
        emoji: "📱",
        content: `<p>Di era sekarang, kebanyakan orang mengakses internet melalui smartphone. Oleh karena itu, website yang responsive adalah keharusan, bukan pilihan.</p>
        
        <h3>Mobile First Approach</h3>
        <p>Mulai desain dari mobile terlebih dahulu, kemudian expand ke tablet dan desktop. Ini akan membuat design process menjadi lebih efisien.</p>
        
        <h3>Media Queries</h3>
        <p>Media queries memungkinkan kita untuk mengaplikasikan CSS yang berbeda berdasarkan ukuran layar. Dengan media queries yang tepat, kita bisa membuat layout yang responsive.</p>`
    },
    {
        id: 5,
        title: "Membangun REST API dengan Node.js dan Express",
        excerpt: "Tutorial membuat backend API yang robust dan scalable.",
        category: "Backend",
        author: "Frisyilia Febrina",
        date: "2 April 2026",
        readTime: "10 min read",
        emoji: "🔧",
        content: `<p>Node.js dan Express adalah kombinasi yang powerful untuk membuat REST API. Dengan kedua framework ini, kita bisa membuat API yang cepat, scalable, dan mudah di-maintain.</p>
        
        <h3>Setup Project</h3>
        <p>Pertama, install Node.js di komputer kamu. Kemudian, buat folder project baru dan inisialisasi npm. Install express dan dependency lainnya.</p>
        
        <h3>Membuat Endpoints</h3>
        <p>Express membuat membuat endpoints menjadi sangat mudah. Cukup define route dan handler function, kamu sudah bisa membuat API endpoint yang berfungsi.</p>`
    },
    {
        id: 6,
        title: "Database dan SQL: Pengenalan untuk Web Developer",
        excerpt: "Pelajari dasar-dasar database dan SQL untuk menyimpan data aplikasi.",
        category: "Backend",
        author: "Frisyilia Febrina",
        date: "31 Maret 2026",
        readTime: "9 min read",
        emoji: "🗄️",
        content: `<p>Setiap aplikasi membutuhkan database untuk menyimpan data. SQL adalah bahasa standard untuk mengelola database relasional.</p>
        
        <h3>CRUD Operations</h3>
        <p>CRUD (Create, Read, Update, Delete) adalah operasi dasar yang paling sering dilakukan pada database. Kuasai keempat operasi ini dengan baik.</p>
        
        <h3>Normalisasi Database</h3>
        <p>Normalisasi database adalah proses mengorganisir data untuk mengurangi redundansi. Dengan normalisasi yang baik, database akan lebih efisien dan mudah di-maintain.</p>`
    }
];

// ========== STATE ==========
let currentFilter = 'All';
let searchTerm = '';
let selectedPost = null;

// ========== DOM ELEMENTS ==========
const featuredPostEl = document.getElementById('featuredPost');
const postsGridEl = document.getElementById('postsGrid');
const categoryTagsEl = document.getElementById('categoryTags');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');
const postModal = document.getElementById('postModal');
const closePostModal = document.getElementById('closePostModal');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedPost();
    renderPosts();
    renderCategories();
    setupEventListeners();
    updateNavLinks();
});

// ========== FUNCTIONS ==========

function renderFeaturedPost() {
    const featured = blogs[0];
    if (!featured) return;
    
    const html = `
        <div class="featured-post-content">
            <span class="featured-post-category">${featured.category}</span>
            <h2 class="featured-post-title">${featured.title}</h2>
            <p class="featured-post-excerpt">${featured.excerpt}</p>
            <div class="featured-post-meta">
                <div class="featured-post-meta-item">📅 ${featured.date}</div>
                <div class="featured-post-meta-item">⏱️ ${featured.readTime}</div>
                <div class="featured-post-meta-item">✍️ ${featured.author}</div>
            </div>
        </div>
    `;
    
    featuredPostEl.innerHTML = html;
    featuredPostEl.style.cursor = 'pointer';
    featuredPostEl.addEventListener('click', () => openPostModal(featured));
}

function renderPosts() {
    let filteredPosts = blogs.filter(post => {
        const matchCategory = currentFilter === 'All' || post.category === currentFilter;
        const matchSearch = searchTerm === '' || 
                          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });
    
    if (filteredPosts.length === 0) {
        postsGridEl.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #64748b;">
            😔 Tidak ada artikel yang cocok dengan filter. Coba filter yang berbeda!
        </div>`;
        return;
    }
    
    postsGridEl.innerHTML = filteredPosts.map(post => `
        <div class="post-card" onclick="openPostModal(${post.id})">
            <div class="post-image">${post.emoji}</div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-meta-item">📅 ${post.date}</span>
                    <span class="post-meta-item">⏱️ ${post.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    const categories = ['All', ...new Set(blogs.map(post => post.category))];
    
    categoryTagsEl.innerHTML = categories.map(cat => `
        <button class="category-tag ${cat === currentFilter ? 'active' : ''}" 
                onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function filterByCategory(category) {
    currentFilter = category;
    searchTerm = '';
    if (searchBox) searchBox.value = '';
    renderCategories();
    renderPosts();
}

function searchPosts() {
    searchTerm = searchBox.value.trim();
    renderPosts();
}

function openPostModal(postId) {
    const post = blogs.find(p => p.id === postId);
    if (!post) return;
    
    selectedPost = post;
    const postDetailEl = document.getElementById('postModalContent');
    
    postDetailEl.innerHTML = `
        <div class="post-detail-header">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${post.emoji}</div>
            <span class="post-detail-category">${post.category}</span>
            <h2 class="post-detail-title">${post.title}</h2>
            <div class="post-detail-meta">
                <span>📅 ${post.date}</span>
                <span>⏱️ ${post.readTime}</span>
                <span>✍️ ${post.author}</span>
            </div>
        </div>
        <div class="post-detail-body">
            ${post.content}
        </div>
    `;
    
    postModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePostModalFn() {
    postModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function setupEventListeners() {
    // Search
    if (searchBox) {
        searchBox.addEventListener('input', searchPosts);
    }
    
    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
            themeToggle.textContent = document.body.style.filter === 'invert(1)' ? '☀️' : '🌙';
        });
    }
    
    // Modal Close
    if (closePostModal) {
        closePostModal.addEventListener('click', closePostModalFn);
    }
    
    if (postModal) {
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) {
                closePostModalFn();
            }
        });
    }
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                updateNavLinks();
            }
        });
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    
    if (name && email && phone) {
        alert(`Terima kasih ${name}! Kontak Anda telah diterima.\n\nEmail: ${email}\nNo Telp: ${phone}\n\nKami akan segera menghubungi Anda!`);
        // Reset hanya field phone, name dan email tetap terisi
        document.getElementById('contactPhone').value = '0857-2502-8988';
    } else {
        alert('Mohon isi semua field terlebih dahulu!');
    }
}

function updateNavLinks() {
    const scrollPosition = window.scrollY;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            const targetPosition = target.offsetTop;
            const targetHeight = target.offsetHeight;
            
            if (scrollPosition >= targetPosition - 100 && scrollPosition < targetPosition + targetHeight - 100) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// Scroll event listener untuk update nav
window.addEventListener('scroll', updateNavLinks);

// Export untuk debugging
window.blogs = blogs;
window.filterByCategory = filterByCategory;
window.openPostModal = openPostModal;
