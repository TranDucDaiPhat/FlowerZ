let currentMenu = null;
const overlay = document.getElementById("overlay");
const btn = document.getElementById("toggleBtn");
const btnFlower = document.getElementById("nav-bar-flower");
const btnGoldCoin = document.getElementById("nav-bar-gold-coin");
const btnRedCoin = document.getElementById("nav-bar-red-coin");
const btnWater = document.getElementById("nav-bar-water");

function tonggleMenu(menuId) {
    const menu = document.getElementById(menuId);

    // Nếu click lại menu đang mở → đóng
    if (currentMenu === menu) {
        closeAllMenus();
        return;
    }

    // Đóng menu cũ (nếu có)
    closeAllMenus();

    // Mở menu mới
    menu.classList.add("open");
    overlay.classList.add("show");
    currentMenu = menu;
    btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
}

function closeAllMenus() {
    document.querySelectorAll(".menu.open").forEach(el => {
        el.classList.remove("open");
    });

    overlay.classList.remove("show");
    currentMenu = null
}

// Click overlay → đóng hết
overlay.addEventListener("click", closeAllMenus);

btn.addEventListener("click", () => {
    tonggleMenu('sidebar');
    btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
});

btnFlower.addEventListener("click", () => {
    tonggleMenu('flower-info');
});

btnGoldCoin.addEventListener("click", () => {
    tonggleMenu('gold-coin-info');
});

btnRedCoin.addEventListener("click", () => {
    tonggleMenu('red-coin-info');
});

btnWater.addEventListener("click", () => {
    tonggleMenu('water-info');
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
});