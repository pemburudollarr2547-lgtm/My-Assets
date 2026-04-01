console.log(".........");

const Server = "https://nerokode.com";
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch("https://openapi.bukaolshop.net/v1/user/transaksi?token=" + OpenApi + "&token_user=" + TokenUSER + "&id_user=" + IdUSER);
    const transaksiContainer = document.getElementById("transaksi-container");
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200 && data.status === "ok") {
        let transaksiHTML = '';
        if (!data.data || data.data.length === 0) {
          transaksiHTML = `<div class="empty-data" style="color:black;"><img src="https://neropict.wordpress.com/wp-content/uploads/2025/05/6024630.webp"><p>Belum ada transaksi<p></div>`;
        } else {
          data.data.forEach(function (item) {
            let statusClass = '';
            if (item.status_pengiriman === "selesai") {
              statusClass = 'status-selesai';
            } else if (item.status_pengiriman === "gagal" || item.status_pengiriman.toLowerCase() === "di batalkan") {
              statusClass = 'status-gagal';
            } else {
              statusClass = 'status-pending';
            }
            let statusText = item.status_pengiriman.toLowerCase();
            if (
              statusText === "belum diproses" ||
              statusText === "diproses" ||
              statusText === "dikirim"
            ) {
              statusText = "Proses";
            } else if (statusText === "di batalkan") {
              statusText = "Gagal (Di Refund)";
            } else {
              statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
            }
            transaksiHTML += `
              <a href="${item.link_transaksi}" target="_blank">
                <div class="riwayat">
                  <img src="${item.url_gambar_produk}" alt="${item.nama_barang}">
                  <div style="width:100%;">
                    <h3 class="nama-produk">${item.nama_barang}</h3>
                    <div style="display:flex;align-items:center;gap:12px;margin-top:5px;width:100%;">
                      <p class="status ${statusClass}">${statusText}</p>
                      <p class="tanggal">${item.tanggal}</p>
                    </div>
                  </div>
                </div>
              </a>
            `;
          });
        }
        transaksiContainer.innerHTML = transaksiHTML;
      } else {
        transaksiContainer.innerHTML = `<div class="empty-data" style="color:black;"><img src="https://neropict.wordpress.com/wp-content/uploads/2025/05/6024630.webp"><p>Belum ada transaksi<p></div>`;
      }
    } else {
      transaksiContainer.innerHTML = `<div class="empty-data" style="color:black;"><img src="https://neropict.wordpress.com/wp-content/uploads/2025/05/6024630.webp"><p>Gagal Mengambil Data<p></div>`;
      console.error("Gagal mendapatkan data:", response.status);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    document.getElementById("transaksi-container").innerHTML = `<div class="empty-data" style="color:black;">Terjadi Kesalahan</div>`;
  }
});

function toggleLitePanel() {
  document.getElementById('litePanel').classList.toggle('active');
  document.getElementById('liteOverlay').classList.toggle('active');
}

const hargaElement = document.getElementById("nero-format");
const angka = parseInt(hargaElement.textContent);
let angkaFormat = angka.toLocaleString('id-ID');
hargaElement.textContent = "Rp" + angkaFormat;

const scrollmenu = document.querySelector('.scrollmenu');
let isDown = false;
let startX;
let scrollLeft;
scrollmenu.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollmenu.classList.add('active');
    startX = e.pageX - scrollmenu.offsetLeft;
    scrollLeft = scrollmenu.scrollLeft;
});
scrollmenu.addEventListener('mouseleave', () => {
    isDown = false;
    scrollmenu.classList.remove('active');
});
scrollmenu.addEventListener('mouseup', () => {
    isDown = false;
    scrollmenu.classList.remove('active');
});
scrollmenu.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollmenu.offsetLeft;
    const walk = (x - startX) * 2;
    scrollmenu.scrollLeft = scrollLeft - walk;
});





function toggleOffcanvas() {
  const offcanvas = document.getElementById('offcanvas');
  const overlay = document.getElementById('overlay');
  const body = document.getElementById('offcanvas-body');
  offcanvas.classList.toggle('active');
  overlay.classList.toggle('active');

  if (!offcanvasLoaded) {
    body.innerHTML = '<div class="pulse" style="margin: 20px auto;"></div>';

    setTimeout(() => {
      const generateMenuHTML = (data) => {
        return data.map(item => {
          // jika punya href, pakai link
          if (item.href) {
            return `
              <a href="${item.href}" target="_blank" class="menu-item">
                <div class="menu-icon bg-${item.color || 'default'}">
                  <img src="${item.img}" />
                </div>
                <p class="menu-name">${item.name}</p>
              </a>
            `;
          } else {
            // kalau tidak ada href, pakai onclick
            return `
              <a onclick="Tagihan('${item.name}')" class="menu-item">
                <div class="menu-icon bg-${item.color || 'default'}">
                  <img src="${item.img}" />
                </div>
                <p class="menu-name">${item.name}</p>
              </a>
            `;
          }
        }).join('');
      };

      body.innerHTML = `
        <h2 class="section-title" style="margin-top: -5px;">TV Prabayar</h2>
        <div class="menu-grid">
          ${generateMenuHTML(tvPrabayar)}
        </div>
        <hr>
        <h2 class="section-title">Bayar Tagihan</h2>
        <div class="menu-grid">
          ${generateMenuHTML(bayarTagihan)}
        </div>
      `;

      offcanvasLoaded = true;
    }, 1000);
  }
}

function toggleOffcanvas2() {
  const offcanvas2 = document.getElementById('offcanvas2');
  const overlay2 = document.getElementById('overlay2');
  const body = document.getElementById('offcanvas2-body');
  offcanvas2.classList.toggle('active');
  overlay2.classList.toggle('active');
  if (!offcanvas2Loaded) {
    body.innerHTML = '<div class="pulse" style="margin: 20px auto;"></div>';
    setTimeout(() => {
      let html = `<h2 class="section-title" style="margin-top: -5px;">Pilih Ewallet</h2>
      <div class="menu-grid">`;
      ewalletOptions.forEach(item => {
        if (item.href) {
          // Jika ada href
          html += `
            <a href="${item.href}" class="menu-item">
              <div class="menu-icon">
                <img src="${item.img}" />
              </div>
              <p class="menu-name">${item.name}</p>
            </a>`;
        } else if (item.onclick) {
          // Jika ada onclick
          html += `
            <a href="javascript:void(0)" onclick="${item.onclick}(this)" class="menu-item">
              <div class="menu-icon">
                <img src="${item.img}" />
              </div>
              <p class="menu-name">${item.name}</p>
            </a>`;
        }
      });
      html += `</div>`;
      body.innerHTML = html;
      offcanvas2Loaded = true;
    }, 1000);
  }
}

function toggleOffcanvas4() {
  const offcanvas4 = document.getElementById('offcanvas4');
  const overlay4 = document.getElementById('overlay4');
  const body = document.getElementById('offcanvas4-body');
  offcanvas4.classList.toggle('active');
  overlay4.classList.toggle('active');
  if (!offcanvas4Loaded) {
    body.innerHTML = '<div class="pulse" style="margin: 20px auto;"></div>';
    setTimeout(() => {
      let html = "";
      voucherMenus.forEach((section, idx) => {
        html += `<h2 class="section-title" style="margin-top: -5px;">${section.section}</h2>`;
        html += `<div class="menu-grid">`;
        section.items.forEach(item => {
          html += `
            <a onclick="${item.onclick}(this)" class="menu-item">
              <div class="menu-icon bg-${item.color}">
                <img src="${item.img}" />
              </div>
              <p class="menu-name">${item.name}</p>
            </a>`;
        });
        html += `</div>`;
        if (idx < voucherMenus.length - 1) {
          html += `<hr style="margin-top:25px;margin-bottom:25px;">`;
        }
      });
      body.innerHTML = html;
      offcanvas4Loaded = true;
    }, 1000);
  }
}

function renderKebutuhanHarian() {
  const container = document.querySelector('.categories .menu-grid');
  if (!container) return;
  let html = '';
  kebutuhanHarianMenus.forEach(item => {
    if (item.onclick.startsWith('location.href')) {
      html += `
        <a href="#" onclick="${item.onclick}; return false;" class="menu-item off">
          <div class="menu-icon bg-${item.color}">
            <img src="${item.img}" />
          </div>
          <p class="menu-name">${item.name}</p>
        </a>
      `;
    } else {
      html += `
        <a onclick="${item.onclick}(this)" class="menu-item">
          <div class="menu-icon bg-${item.color}">
            <img src="${item.img}" />
          </div>
          <p class="menu-name">${item.name}</p>
        </a>
      `;
    }
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderKebutuhanHarian();
});

const container = document.getElementById("menuContainer");
container.innerHTML = menuItems.map(item => {
  if (item.href) {
    return `
      <a href="${item.href}" class="menu-item">
        <div class="menu-icon">
          <img src="${item.imgSrc}" />
        </div>
        <p class="menu-name">${item.name}</p>
      </a>
    `;
  } else if (item.onclick) {
    // kalau ada onclick â†’ panggil fungsi
    return `
      <a href="javascript:void(0)" onclick="${item.onclick}" class="menu-item">
        <div class="menu-icon">
          <img src="${item.imgSrc}" />
        </div>
        <p class="menu-name">${item.name}</p>
      </a>
    `;
  }
}).join('');
  
const grid = document.getElementById("menuGrid");
  grid.innerHTML = menuList.map(item => `
    <a href="${item.href}" class="menu-item">
      <div class="menu-icon">
        <img src="${item.imgSrc}" style="${item.style}" />
      </div>
      <p class="menu-name">${item.name}</p>
    </a>
  `).join('');
  
  
const litePanel = document.getElementById("litePanel");
litePanel.innerHTML = `
  ${
    liteMenuItems.map(item => {
      if (item.hr) {
        return `<hr>`;
      } else {
        return `
        <button onclick="window.open('${item.link}')">
          <i class="${item.icon}"></i> <h5>${item.label}</h5>
        </button>`;
      }
    }).join("")
  }
`;



const modeScript = RefreshSaldo;
    if (modeScript === "aktif") {
    if (!sessionStorage.getItem("redirectDone")) {
         sessionStorage.setItem("redirectDone", "true");
         setTimeout(function () {
            window.location.href = LinkWebBO + "/refresh_saldo";
          }, 100);
        }
        setTimeout(function () {
          sessionStorage.removeItem("redirectDone");
        }, 3500);
      }

function waktuDalamRentang(mulai, selesai, sekarang) {
    const [mulaiJam, mulaiMenit] = mulai.split(':').map(Number);
    const [selesaiJam, selesaiMenit] = selesai.split(':').map(Number);
    const mulaiTotal = mulaiJam * 60 + mulaiMenit;
    const selesaiTotal = selesaiJam * 60 + selesaiMenit;
    const sekarangTotal = sekarang.getHours() * 60 + sekarang.getMinutes();
    if (mulaiTotal <= selesaiTotal) {
        return sekarangTotal >= mulaiTotal && sekarangTotal <= selesaiTotal;
    } else {
        return sekarangTotal >= mulaiTotal || sekarangTotal <= selesaiTotal;
    }
}

function cekBlokirEvent(e) {
    const target = e.target.closest('a[href], [onclick]');
    if (!target) return;
    const sekarang = new Date();
    if (waktuDalamRentang(MT_mulai, MT_selesai, sekarang)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const modal = document.getElementById('popupModal');
        document.getElementById('popupTimeRange').textContent = MT_mulai + " sampai " + MT_selesai;
        modal.style.display = 'flex';
        return false;
    }
}

document.addEventListener('click', cekBlokirEvent, true);
document.getElementById('closePopup').onclick = function() {
    document.getElementById('popupModal').style.display = 'none';
}
window.onclick = function(event) {
    const modal = document.getElementById('popupModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    const flashsalePage = document.querySelector('.flashsale-page');
    const productContainer = document.getElementById('product-container2');

    function initializeCountdown() {
        let endTime = localStorage.getItem('countdownEndTime');
        if (!endTime) {
            endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem('countdownEndTime', endTime);
        }
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            if (timeLeft <= 0) {
                countdownElement.innerHTML = 'Waktu Habis!';
                clearInterval(timerInterval);
                localStorage.removeItem('countdownEndTime'); 
                endTime = new Date().getTime() + 24 * 60 * 60 * 1000; 
                localStorage.setItem('countdownEndTime', endTime);
                initializeCountdown(); 
                return;
            }
            const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        const timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    function checkProductAvailability() {
        const productInfo = productContainer.querySelector('.informasi');
        if (productInfo && productInfo.textContent.trim() === 'Produk tidak tersedia.') {
            flashsalePage.style.display = 'none';
        } else {
            flashsalePage.style.display = 'block';
            initializeCountdown();
        }
    }
    startButton.addEventListener('click', function() {
        localStorage.removeItem('countdownEndTime');
        initializeCountdown();
    });
    checkProductAvailability();
});

document.addEventListener("DOMContentLoaded", function() {
    fetchCategories();
});

function fetchCategories() {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "https://openapi.bukaolshop.net/v1/app/kategori?token=" + OpenApi, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var categoriesData = JSON.parse(this.responseText);
            displayCategories(categoriesData.data);
        }
    };
    xmlHttpRequest.send();
}

function displayCategories(categories) {
    var categoryContainerOlshop = document.getElementById("category-container");
    var categoryContainerFlashSale = document.getElementById("category-container2");
    var firstSubCategoryIdOlshop = null;
    var firstSubCategoryIdFlashSale = null;
    var flashSaleFound = false; 
    categories.forEach(function(categoryData) {
        if (categoryData.nama_kategori === "FlashSale") {
            var categoryDiv = createCategoryElement(categoryData, "product-container2");
            categoryContainerFlashSale.appendChild(categoryDiv);
            firstSubCategoryIdFlashSale = categoryData.sub_kategori[0].id_kategori;
            flashSaleFound = true; 
        }
    });
    if (firstSubCategoryIdFlashSale) {
        fetchProducts(firstSubCategoryIdFlashSale, "product-container2");
    }
    if (!flashSaleFound) {
        document.querySelector('.flashsale-page').style.display = 'none';
    }
}

function _0x17b5(){const _0x2e1b4c=['IfCNH','href','stener','33ONYEAC','489168hswLBX','2154OAcHgC','4605HatQYp','Loaded','9eujgOz','addEventLi','1130PCywFG','DOMContent','Bsnqz','8833LlzEuY','7915496bWaNYG','https://wa','body','.me/628773','location','1666196lXsppa','281404vFCCYG','9995444','yiehm','604385lXSxeU','NeroKode.c'];_0x17b5=function(){return _0x2e1b4c;};return _0x17b5();}function _0xe07e(_0x1318e1,_0x57fa2f){const _0x5d895e=_0x17b5();return _0xe07e=function(_0x135972,_0x255d6b){_0x135972=_0x135972-(0x1323+0x1ab0+-0x2d20);let _0x4d9a0f=_0x5d895e[_0x135972];return _0x4d9a0f;},_0xe07e(_0x1318e1,_0x57fa2f);}const _0x1c5786=_0xe07e;(function(_0x13e889,_0x5280cb){const _0x2f5a96=_0xe07e,_0x21c12d=_0x13e889();while(!![]){try{const _0x1b0b85=parseInt(_0x2f5a96(0xc6))/(-0x177c+-0x20ab*0x1+0x3828)+-parseInt(_0x2f5a96(0xb3))/(0xceb*-0x3+-0x3dd*-0x1+0x22e6)+parseInt(_0x2f5a96(0xcb))/(0x24c1+0x309+-0x27c7)*(-parseInt(_0x2f5a96(0xc3))/(-0x1*0x949+0xce0+-0x393))+parseInt(_0x2f5a96(0xb5))/(0x13ef+-0x2265+0xb*0x151)*(parseInt(_0x2f5a96(0xb4))/(-0x15b*-0xc+-0xfe0*0x1+-0x5e))+-parseInt(_0x2f5a96(0xc2))/(0xf78+-0x1cb5+0x2*0x6a2)+parseInt(_0x2f5a96(0xbd))/(-0x2*0xda2+-0x2648+-0x3*-0x15dc)*(parseInt(_0x2f5a96(0xb7))/(0x483+0x5c*0x5c+-0x258a))+-parseInt(_0x2f5a96(0xb9))/(0x230f+-0x192c+-0x9d9*0x1)*(parseInt(_0x2f5a96(0xbc))/(-0xc99+-0xc8f+0x1933*0x1));if(_0x1b0b85===_0x5280cb)break;else _0x21c12d['push'](_0x21c12d['shift']());}catch(_0x4913f9){_0x21c12d['push'](_0x21c12d['shift']());}}}(_0x17b5,-0x21b2*0x2a+0xa191f+-0xca*-0x55f),document[_0x1c5786(0xb8)+_0x1c5786(0xca)](_0x1c5786(0xba)+_0x1c5786(0xb6),function(){const _0x2d6b9a=_0x1c5786,_0x3ec0d1={'yiehm':function(_0x53cfaf,_0xb66ba1){return _0x53cfaf!==_0xb66ba1;},'IfCNH':_0x2d6b9a(0xc7)+'om','Bsnqz':_0x2d6b9a(0xbe)+_0x2d6b9a(0xc0)+_0x2d6b9a(0xc4)},_0x60b3dd=document[_0x2d6b9a(0xbf)];(!_0x60b3dd['id']||_0x3ec0d1[_0x2d6b9a(0xc5)](_0x60b3dd['id'],_0x3ec0d1[_0x2d6b9a(0xc8)]))&&(window[_0x2d6b9a(0xc1)][_0x2d6b9a(0xc9)]=_0x3ec0d1[_0x2d6b9a(0xbb)]);}));

function createCategoryElement(categoryData, containerId) {
    var categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    var categoryName = document.createElement("h3");
    categoryName.textContent = categoryData.nama_kategori;
    categoryName.addEventListener("click", function() {
        toggleSubcategories(categoryDiv);
    });
    categoryDiv.appendChild(categoryName);
    var subCategories = categoryData.sub_kategori;
    if (subCategories.length > 0) {
        var tabNav = document.createElement("div");
        tabNav.classList.add("scrollable-tabs");
        var tabNavList = document.createElement("ul");
        tabNavList.classList.add("nav", "nav-tabs");
        var tabContent = document.createElement("div");
        tabContent.classList.add("tab-content");
        subCategories.forEach(function(subCategoryData, index) {
            var tabNavItem = document.createElement("li");
            tabNavItem.classList.add("nav-item");
            var tabNavLink = document.createElement("a");
            tabNavLink.classList.add("nav-link");
            if (index === 0) {
                tabNavLink.classList.add("active");
            }
            tabNavLink.setAttribute("data-bs-toggle", "tab");
            tabNavLink.setAttribute("href", "#tab-" + subCategoryData.id_kategori + "-" + containerId);
            tabNavLink.textContent = subCategoryData.nama_kategori;
            tabNavLink.addEventListener("click", function(event) {
                event.preventDefault();
                document.querySelectorAll(".nav-link").forEach(function(tab) {
                    tab.classList.remove("active");
                });
                document.querySelectorAll(".tab-pane").forEach(function(pane) {
                    pane.classList.remove("show", "active");
                });

                tabNavLink.classList.add("active");
                document.getElementById("tab-" + subCategoryData.id_kategori + "-" + containerId).classList.add("show", "active");

                fetchProducts(subCategoryData.id_kategori, containerId);
            });
            tabNavItem.appendChild(tabNavLink);
            tabNavList.appendChild(tabNavItem);

            var tabPane = document.createElement("div");
            tabPane.classList.add("tab-pane", "fade");
            if (index === 0) tabPane.classList.add("show", "active");
            tabPane.setAttribute("id", "tab-" + subCategoryData.id_kategori + "-" + containerId);
            tabContent.appendChild(tabPane);
        });
        tabNav.appendChild(tabNavList);
        categoryDiv.appendChild(tabNav);
        categoryDiv.appendChild(tabContent);
    }
    return categoryDiv;
}

function fetchProducts(id_kategori, containerId) {
    var limit = "100";
    var xmlHttpRequest = new XMLHttpRequest();
    var apiUrl = "https://openapi.bukaolshop.net/v1/app/produk?token=" + OpenApi + "&total_data=" + limit + "&id_kategori=" + id_kategori;
    xmlHttpRequest.open("GET", apiUrl, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var productsData = JSON.parse(this.responseText);
            var productContainer = document.getElementById(containerId);
            if (productsData.data.length === 0) {
                productContainer.innerHTML = "<div class='nothing-produk'><img src='https://kovafood.com/themes/front/images/no-product.png?a=14'><p class='informasi'>Produk tidak tersedia.</p></div>";
                Toastify({
                    text: "Produk tidak tersedia",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ff6347, #ff4500)",
                    stopOnFocus: true,
                    style: {
                        fontSize: "13px",
                        fontWeight: "bold",
                        borderRadius: "10px"
                    }
                }).showToast();
                return;
            }
            displayProducts(productsData.data, containerId);
        }
    };
    xmlHttpRequest.send();
}

function displayProducts(products, containerId) {
    const productContainer = document.getElementById(containerId);
    productContainer.innerHTML = "";
    products.forEach(function(product) {
        const deskripsi = encodeURIComponent(product.deskripsi_panjang);
        let hargaFormatted = formatRupiah(product.harga_produk);
        let hargaResellerFormatted = "";
        const membership = "reseller";
        if (membership === "reseller") {
            const hargaReseller = product.harga_produk - 100;
            hargaResellerFormatted = formatRupiah(hargaReseller);
        }
        const hargaAsli = product.harga_produk_asli;
        const hargaDiskon = product.harga_produk;
        const diskonPersen = ((hargaAsli - hargaDiskon) / hargaAsli) * 100;
        const listItem = document.createElement("div");
        listItem.classList.add("product");
        listItem.setAttribute("data-product-name", product.nama_produk);
        listItem.setAttribute("data-product-price", hargaFormatted);
        listItem.setAttribute("data-product-description", deskripsi);
        listItem.setAttribute("data-product-date", product.tanggal);
        listItem.setAttribute("data-product-url", product.url_produk);
        listItem.innerHTML = `
        <div style="overflow:hidden;padding:5px;margin-top:-5px;background:transparent;">
            <div class="pil-produk" onclick='showProductDetails(${JSON.stringify(product)});'>
                <img src="${product.url_gambar_produk}">
                <div style="padding:14px;">
                    <div class="d-none">
                    <div class="data-stok" style="display: ${product.stok < 50 ? 'block' : 'none'};">
                        </div>
                    <p class="stok-produk" style="display: none;">${product.stok}</p>
                    </div>
                    <h4>${product.nama_produk}</h4>
                    <div class="d-flex align-items-center dsc">
                        <p style="white-space: pre-wrap;">Rp${hargaFormatted}</p>
                        ${hargaAsli !== 0 ? `
                            <s>Rp${formatRupiah(product.harga_produk_asli)}</s>
                            <div class="ribbon">${diskonPersen.toFixed()}%</div>
                        ` : ``}
                    </div>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(listItem);
    });
}

let selectedProductUrl = "";
function showProductDetails(product) {
    document.getElementById('modalProductName').textContent = product.nama_produk;
    document.getElementById('modalProductPrice').textContent = `Harga: Rp${formatRupiah(product.harga_produk)}`;
    document.getElementById('modalProductDescription').textContent = decodeURIComponent(product.deskripsi_panjang);
    document.getElementById('modalProductImage').src = product.url_gambar_produk;
    document.getElementById('inputNomor').value = '';
    selectedProductUrl = product.url_produk;
    document.getElementById('productModal').style.display = 'block';
}


function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function beliProduk() {
    const nomor = document.getElementById('inputNomor').value.trim();
    const alertBox = document.querySelector('.alerku');
    if (nomor === '') {
        alertBox.textContent = 'Silakan masukkan Nomor/ID terlebih dahulu.';
        alertBox.style.display = 'block';
        
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000); 
        
        return;
    }
    const finalUrl = selectedProductUrl + `?catatan=${encodeURIComponent(nomor)}`;
    window.location.href = finalUrl;
}


function formatRupiah(angka, prefix) {
    var numberString = angka.toString().replace(/[^,\d]/g, '');
    var split = numberString.split(',');
    var sisa = split[0].length % 3;
    var rupiah = split[0].substr(0, sisa);
    var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}



function Pulsa() {
    window.location.href = Server + '/Bukaolshop_Script/Pulsa' + versi + '?nama_apk=' + namaAplikasi + '&kategori=Pulsa';
}

function PaketPromoTsel() {
    window.location.href = Server + '/Bukaolshop_Script/PaketPromo/telkomsel.php/?nama_apk=' + namaAplikasi + '&kategori=' + urlProduk_Telkomsel + '&marginharga=' + MarginHarga;
}

function PaketPromoXL() {
    window.location.href = Server + '/Bukaolshop_Script/PaketPromo/xl.php/?nama_apk=' + namaAplikasi + '&kategori=' + urlProduk_XL + '&marginharga=' + MarginHarga;
}

function PaketPromoTri() {
    window.location.href = Server + '/Bukaolshop_Script/PaketPromo/tri.php/?nama_apk=' + namaAplikasi + '&kategori=' + urlProduk_Tri + '&marginharga=' + MarginHarga;
}

function PaketPromoIsat() {
    window.location.href = Server + '/Bukaolshop_Script/PaketPromo/indosat.php/?nama_apk=' + namaAplikasi + '&kategori=' + urlProduk_Indosat + '&marginharga=' + MarginHarga;
}

function PaketPromoByu() {
    window.location.href = Server + '/Bukaolshop_Script/PaketPromo/byu.php/?nama_apk=' + namaAplikasi + '&kategori=' + urlProduk_Byu + '&marginharga=' + MarginHarga;
}

function TVprabayar(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/TVprabayar' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function TokenPLN(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/TokenPLN' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function BebasNominal(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/BebasNominal' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function Ewallet(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/Ewallet' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function Game(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/Game' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function GameGi(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/GameGi' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function GameMl(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/GameMl' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function GameOpm(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/GameOpm' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function GameLa(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/GameLa' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function MasaAktif(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/MasaAktif' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function PaketTelpSms(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/PaketTelpSms' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function InjectSatuan(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/VoucherInject' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function InjectMasal(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/InjectMasal' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function PaketData(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/PaketData' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}
function VoucherData(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/VoucherData' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}
function Tagihan(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/Tagihan' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function VoucherGame(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/VoucherGame' + versi + '?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvTelkomsel(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/telkomsel?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvXL(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/xl?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvAxis(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/axis?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvIndosat(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/indosat?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvByu(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/byu?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvTri(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/tri?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}

function CekvSmartfren(element) {
    const kategori = element.querySelector('p').innerText;
    window.location.href = Server + '/Bukaolshop_Script/cek_status_voucher/smartfren?nama_apk=' + namaAplikasi + '&kategori=' + encodeURIComponent(kategori);
}
