/* =========================================
   JS PENGGANTI HOMENERO V3 (MANDIRI)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Menu Saldo Utama (Isi Saldo, Transfer, dll)
    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid && typeof menuList !== 'undefined') {
        menuList.forEach(m => {
            menuGrid.innerHTML += `
                <div class="menu-item" onclick="location.href='${m.href}'">
                    <div class="menu-icon" style="${m.style}"><img src="${m.imgSrc}" alt="${m.name}"></div>
                    <div class="menu-name">${m.name}</div>
                </div>`;
        });
    }

    // 2. Render Menu Promo (Telkomsel, Tri, dll)
    const menuContainer = document.getElementById('menuContainer');
    if (menuContainer && typeof menuItems !== 'undefined') {
        menuItems.forEach(m => {
            menuContainer.innerHTML += `
                <div class="menu-item" onclick="${m.onclick}">
                    <img src="${m.imgSrc}" alt="${m.name}">
                    <div class="menu-name">${m.name}</div>
                </div>`;
        });
    }

    // 3. Render Kebutuhan Harian dipanggil otomatis oleh HTML asli
    // Pastikan function renderKebutuhanHarian tersedia di global scope
    window.renderKebutuhanHarian = function() {
        const catContainer = document.querySelector('.categories .menu-grid');
        if (catContainer && typeof kebutuhanHarianMenus !== 'undefined') {
            catContainer.innerHTML = '';
            kebutuhanHarianMenus.forEach(m => {
                catContainer.innerHTML += `
                    <div class="menu-item" onclick="${m.onclick}">
                        <img src="${m.img}" alt="${m.name}">
                        <div class="menu-name">${m.name}</div>
                    </div>`;
            });
        }
    };
    window.renderKebutuhanHarian(); // Panggil manual untuk jaga-jaga

    // 4. Render Offcanvas Lainnya (Bayar Tagihan & TV)
    const offcanvasBody = document.getElementById('offcanvas-body');
    if (offcanvasBody && typeof bayarTagihan !== 'undefined') {
        bayarTagihan.forEach(m => {
            offcanvasBody.innerHTML += `
                <div class="menu-item" onclick="alert('Menu ${m.name} diklik')">
                    <img src="${m.img}" alt="${m.name}">
                    <div class="menu-name">${m.name}</div>
                </div>`;
        });
    }

    // 5. Render E-Wallet (Dana, OVO, dll)
    const offcanvas2Body = document.getElementById('offcanvas2-body');
    if (offcanvas2Body && typeof ewalletOptions !== 'undefined') {
        ewalletOptions.forEach(m => {
            offcanvas2Body.innerHTML += `
                <div class="menu-item" onclick="alert('Buka menu ${m.name}')">
                    <img src="${m.img}" alt="${m.name}">
                    <div class="menu-name">${m.name}</div>
                </div>`;
        });
    }

    // 6. Format Saldo (Sederhana)
    const saldoEl = document.getElementById('nero-format');
    if (saldoEl) {
        let text = saldoEl.innerText.replace(/[^0-9]/g, '');
        if(text) saldoEl.innerText = 'Rp ' + parseInt(text).toLocaleString('id-ID');
    }

    // 7. Timer Flashsale Dummy
    setInterval(() => {
        let h = document.getElementById('hours');
        let m = document.getElementById('minutes');
        let s = document.getElementById('seconds');
        if(h && m && s) {
            let sec = parseInt(s.innerText) - 1;
            if(sec < 0) { sec = 59; m.innerText = String(parseInt(m.innerText) - 1).padStart(2, '0'); }
            s.innerText = String(sec).padStart(2, '0');
        }
    }, 1000);
});

/* =========================================
   FUNGSI INTERAKTIF (POPUP & KLIK)
   ========================================= */

// Fungsi Toggle Pop-Up Bawah (Offcanvas)
function toggleOffcanvas() {
    document.getElementById('offcanvas').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}
function toggleOffcanvas2() {
    document.getElementById('offcanvas2').classList.toggle('active');
    document.getElementById('overlay2').classList.toggle('active');
}
function toggleOffcanvas4() {
    document.getElementById('offcanvas4').classList.toggle('active');
    document.getElementById('overlay4').classList.toggle('active');
}

// Fungsi Toggle Panel Samping (Lite Panel)
function toggleLitePanel() {
    document.getElementById('litePanel').classList.toggle('active');
    document.getElementById('liteOverlay').classList.toggle('active');
}

// Fungsi Modal
function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// Kumpulan Fungsi Tujuan Klik (Routing)
function Pulsa() { location.href = LinkWebBO + "/kategori/pulsa"; }
function PaketData() { location.href = LinkWebBO + "/kategori/paket-data"; }
function TokenPLN() { location.href = LinkWebBO + "/kategori/token-pln"; }
function PaketTelpSms() { location.href = LinkWebBO + "/kategori/paket-nelfon"; }

// Promo Fungsi
function PaketPromoTsel() { location.href = urlProduk_Telkomsel; }
function PaketPromoIndosat() { location.href = urlProduk_Indosat; }
// Tambahkan fungsi routing lain sesuai kebutuhan jika alert muncul
