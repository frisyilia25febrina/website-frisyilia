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
        content: `<p>Mari Bersama Kita Pelajari Membuat Topologi Star,Ring,Mesh,Bus</p>
        
        <h3>Langkah-langkah Awal</h3>
        <p>Pertama, pahami konsep dasar.</p>
        
        <h3>Praktik Adalah Kunci</h3>
        <p>jangan hanya membaca teori. Langsung praktek membuat project kecil seperti membuat nya dengan applikasi cisco paket tracer dengan praktek, kamu akan lebih memahami konsepnya.</p>`
    },
    {
        id: 2,
        title: "Membuat Topologi Star",
        excerpt: "Pelajari Topologi Star Dengan Cisco Paket Tracer.",
        category: "Cisco",
        author: "Frisyilia Febrina",
        date: "09 April 2026",
        readTime: "7 min read",
        emoji: "🎨",
        content: `<p>memakai 1 buah switch,1 buah server,dan 5 buah pc,lalu di sambungkan dari switch ke server menggunakan kabel straight dan dari switch ke seluruh pc yang ada juga disambungkan memakai kabel straight.lalu kita ke server lalu ke bagian desktop lalu ke ip configuration lalu kita isi ip nya memakai 192.168.10.1 subnet mask nya 255.255.255.0 setelah itu kita ke bagian services lalu ke dhcp service nya di on kan lalu default gateway nya kita isi 192.168.1.1 lalu kita save.kemudian setelah itu kita klik setiap pc lalu ke bagian desktop ke ip konfiguration kita pencet DHCP maka ip secara otomatis akan terisi sendiri kita lakukan ke seluruh pc yang ada.lalu setelah itu kita cek menggunakan pesan yang bentuk nya seperti amplop tertutup dari server ke setiap pc kalo status nya successful tanda nya berhasil lakukan ke seluruh pc yang ada atau bisa juga dengan klik server lalu ke desktop lalu ke command prompt lalu ketik ping ke ip address yang mau dituju misalkan 192.168.10.2 kalo status nya TTL artinya berhasil..</p>
        
        <h3>Kegunaan Topologi Star</h3>
        <p>Topologi star adalah salah satu jenis topologi jaringan yang paling umum digunakan. Dalam topologi ini, semua perangkat terhubung ke satu titik pusat, yaitu switch atau hub.</p>
        
        <h3>Fungsi Fungsi Utama Topologi Star</h3>
        <p>Fungsi utama topologi star adalah sebagai berikut:</p>
        <ul>
            <li>Memudahkan pengelolaan dan pemeliharaan jaringan</li>
            <li>Meningkatkan kinerja jaringan dengan mengurangi konflik dan collision</li>
            <li>Memungkinkan penambahan perangkat baru dengan mudah</li>
        </ul>`
    },
    {
        id: 3,
        title: "Membuat Topologi Ring",
        excerpt: "Pelajari Topologi Ring Dengan Cisco Paket Tracer.",
        category: "Cisco",
        author: "Frisyilia Febrina",
        date: "8 April 2026",
        readTime: "8 min read",
        emoji: "⚡",
        content: `<p>.</p>
        
        <h3>langkah-langkah</h3>membutuhkan 5 buah switch, dan tambahkan pc masing masing ke setiap switc. dan sambungkan setiap switch ke pc masing masing setelah itu kita sambungkan seluruh switch hingga membentuk ring atau lingkaran. lalu kita klik pc terus ke desktop lalu ke ip configuration ketik 192.168.10.1 dan subnet nya yang otomatis. selanjutnya kita lakuin ke setiap pe nya hanya dibedakan angka belakang nya saja ganti setiap pc nya bertambah satu angka misalkan pc 2 jadi 192.168.10.2 dan setiap ganti po bertambah satu angka-setelah itu kita lakukan pengecekan ke seluruh pc yang ada kalo statusnya successful tandannya berhasil.
        <p>Arrow functions adalah cara yang lebih singkat dan elegan untuk menulis function biasa. Tidak hanya sintaksnya lebih ringkas, tapi juga otomatis binding 'this'.</p>
        
        <h3>Kelebihan Dan Kekurangan Topologi Ring</h3>
        <p>Kelebihan
Minim collision data
Performa stabil saat traffic tinggi
Setiap node punya hak akses yang sama.
Kekurangan Jika satu kabel/node rusak, jaringan bisa terganggu
Penambahan/perubahan node bisa mengganggu jaringan
Troubleshooting bisa sulit jika tidak pakai sistem dual ring.</p>`
    },
    {
        id: 4,
        title: "Membuat Topologi Mesh",
        excerpt: "Pelajari Topologi Mesh Dengan Cisco Paket Tracer.",
        category: "Cisco",
        author: "Frisyilia Febrina",
        date: "5 April 2026",
        readTime: "6 min read",
        emoji: "📱",
        content: `<p>membutuhkan 5 buah switc, dan kita tambahkan kan pc di masing masing switch yang ada. kita hubungkan switch ke pc nya masing masing, lalu kita hubungkan seluruh switch yang ada dan kita pastikan seluruh switch telah terhubung satu sama lain, setelah semua switch terhubung kita klik pc nya terus ke desktop lalu ke ip configuration masukkin ip nya 192.168.1.1 subnetmask nya 255.255.255.0 kita terapkan ke seluruh pc yang ada tapi akhiran nya kita ganti ke angka selanjutnya misalnya 192.168.1.2 dan seterusnya sampe semua pe terisi ip nya.lalu kita lakukan pengecekan dari pc1 ke pc2 dan kita lakukan ke seluruh pc yang ada.kalo semua nya sudah successful artinya berhasil..</p>
        
        <h3>Kelebihan Dan Kekurangan Topologi Mesh</h3>
        <p> Kelebihan

✔ Sangat handal (reliable)
✔ Tidak mudah down
✔ Performa tinggi

 Kekurangan

✖ Biaya sangat mahal (butuh banyak kabel & port)
✖ Instalasi rumit
✖ Tidak efisien untuk jaringan kecil.</p>
        
        <h3>kegunaan Topologi Mesh</h3>
        <p>Topologi mesh digunakan untuk jaringan yang membutuhkan keamanan tinggi, kestabilan maksimal, dan minim gangguan, meskipun biayanya mahal..</p>`
    },
    {
        id: 5,
        title: "Mengsetup DHCP Server",
        excerpt: "Pelajari cara mengatur DHCP Server untuk memberikan alamat IP secara otomatis kepada perangkat jaringan.",
        category: "Linux Debian 8",
        author: "Frisyilia Febrina",
        date: "2 April 2026",
        readTime: "10 min read",
        emoji: "🔧",
        content: `<p>1.sebelum setting dhcp server kita edit IP ke static terlebih dahulu (nano /etc/network/interfaces)
2.atur IP ke static sesuai keinginan kita,kalo saya sendiri pake IP static nya 30.30.30.1/24
saya pake adapter network nya :Host & Only
3.setelah itu saya restart network nya (/etc/init.d/networking restart)
4.setelah itu saya cek menggunakan ip a untuk memastikan apakah ip sudah benar
5.setelah cek ip dan ip nya sudah sesuai,ini langkah pertama yang saya lakukan adalah meng update sampai selesai (apt-get update)
6.habis itu saya install isc-dhcp-server sampai selesai (apt-install isc-dhcp-server)
7.ping 30.30.30.1 kalo TTL berhasil
8.ketik nano /etc/dhcp/dhcpd.conf edit sesuai dengan ip yang kita pakai.
9.service isc-dhcp-server status kalo running berhasil
10.Kalo ip bisa di ping di cmd tandanya sudah berjalan,atau bisa juga cek di control panel,ip nya akan otomatis masuk ke control panel.
11.selesai
.</p>
        
        <h3>Kegunaan DHCP Server</h3>
        <p>DHCP Server digunakan untuk memberikan alamat IP secara otomatis kepada perangkat jaringan, sehingga pengguna tidak perlu mengatur alamat IP secara manual.</p>
        
        <h3>Kelebihan Dan Kekurangan DHCP Server</h3>
        <p>Kelebihan:fleksibel,dan manajement IP lebih mudah. Kekurangan:Troubleshooting lebih susah,Kurang cocok untuk server penting.</p>`
    },
    {
        id: 6,
        title: "SSH Server",
        excerpt: "Pelajari cara mengatur SSH Server .",
        category: "Linux Debian 8",
        author: "Frisyilia Febrina",
        date: "31 Maret 2026",
        readTime: "9 min read",
        emoji: "🗄️",
        content: `<p>1.langkah pertama yang saya lakukan untuk menginstall ssh server adalah meng update sampai selesai (apt-get update)
2.terus di install (apt-get install openssh-server)
3.service ssh status setelah running
4.ke cmd masukkin ssh user@ip nya,password nya,lalu masuk pake (su).</p>
        
        <h3>Kegunaan SSH Server</h3>
        <p>SSH Server digunakan untuk mengizinkan akses jarak jauh ke sistem komputer secara aman. Dengan SSH, pengguna dapat menjalankan perintah dan mentransfer file secara enkripsi.</p>
        
    <h3>Kekurangan Dan Kelebihan SSH Server</h3>
        <p>Kelebihan: Akses jarak jauh yang aman, enkripsi data, dan kemampuan untuk menjalankan perintah secara remote. Kekurangan: Konfigurasi yang kompleks, risiko keamanan jika tidak diatur dengan benar, dan potensi serangan brute force.</p>`
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
    
    const date = featured.date || 'Tanpa tanggal';
    const readTime = featured.readTime || '5 min read';
    
    const html = `
        <div class="featured-post-content">
            <span class="featured-post-category">${featured.category}</span>
            <h2 class="featured-post-title">${featured.title}</h2>
            <p class="featured-post-excerpt">${featured.excerpt}</p>
            <div class="featured-post-meta">
                <div class="featured-post-meta-item">📅 ${date}</div>
                <div class="featured-post-meta-item">⏱️ ${readTime}</div>
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
    
    postsGridEl.innerHTML = filteredPosts.map(post => {
        const date = post.date || 'Tanpa tanggal';
        const readTime = post.readTime || '5 min read';
        
        return `
        <div class="post-card" onclick="openPostModal(${post.id})">
            <div class="post-image">${post.emoji}</div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-meta-item">📅 ${date}</span>
                    <span class="post-meta-item">⏱️ ${readTime}</span>
                </div>
            </div>
        </div>
    `;
    }).join('');
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
