import { user, cost_per_place, getFlowerById } from "./data.js"
import { updateUserData, getDataById } from "./API.js"
import {
    renderMainScreen,
    renderInventoryScreen
} from "./render.js";


let currentMenu = null;
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const btn = document.getElementById("toggleBtn");


document.addEventListener("click", (e) => {
    if (e.target.closest(".add-flower-item")) {
        notifyAddFlowerItem()
    } else if (e.target.closest(".btnCancel")) {
        closeAllMenus()
    } else if (e.target.closest("#btnAgree")) {
        user.gold -= cost_per_place[user.num_of_placed]
        user.num_of_placed++;
        renderMainScreen()
        closeAllMenus()
    } else if (e.target.closest("#nav-bar-water")) {
        tonggleMenu('water-info');
    } else if (e.target.closest("#nav-bar-red-coin")) {
        tonggleMenu('red-coin-info');
    } else if (e.target.closest("#nav-bar-gold-coin")) {
        tonggleMenu('gold-coin-info');
    } else if (e.target.closest("#nav-bar-flower")) {
        tonggleMenu('flower-info');
    } else if (e.target.closest("#toggleBtn")) {
        tonggleMenu('sidebar');
        btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
    } else if (e.target.closest("#overlay")) {
        closeAllMenus()
        btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
    } else if (e.target.closest("#btn-bag")) {
        switchScreen("inventory-screen");
        tonggleMenu('sidebar');
        btn.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
    } else if (e.target.closest("#btnBackToGame")) {
        switchScreen("game-screen");
    } else if (e.target.closest("#flower-container-bag")) {
        showFlowerInfo(e)
        const desc = document.getElementById("description");
        desc.classList.add("hidden");
    } else if (e.target.closest("#btn-add-flower")) {
        addFlowerItem()
    } else if (e.target.closest("#toggle-desc")) {
        const toggle = document.getElementById("toggle-desc");
        const desc = document.getElementById("description");

        desc.classList.toggle("hidden");

        if (desc.classList.contains("hidden")) {
            toggle.textContent = "Mô tả:＋";
        } else {
            toggle.textContent = "Mô tả: −";
        }
    }
});

function addFlowerItem() {
    if (selectedFlower) {
        if (user.flowers.length >= user.num_of_placed) {
            tonggleMenu('popup-notify');
            return;
        }
        const flower = {
            earned: 0,
            water: 0,
            irrigation_time: 60 * 60,
            ...selectedFlower
        }
        user.flowers.push(flower)
        const index = user.flowers_in_bag.findIndex(
            flower => flower.id === selectedFlower.id && flower.level === selectedFlower.level
        );

        if (index !== -1) {
            user.flowers_in_bag.splice(index, 1);
        }

    }
    closeAllMenus()
    renderMainScreen()
    renderInventoryScreen()
}

// updateUserData(1, user)

let selectedFlower = null;

function showFlowerInfo(e) {
    const item = e.target.closest(".item");
    if (!item) return;

    const index = item.dataset.index;
    selectedFlower = user.flowers_in_bag[index];

    tonggleMenu('popup-flower-info');
}

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


function notifyAddFlowerItem() {
    const cost = document.getElementById("cost-of-place");
    const btnAgree = document.getElementById("btnAgree");

    if (cost) {
        cost.innerHTML = `<p id="cost-of-place">Giá: ${cost_per_place[user.num_of_placed]}v</p>`
    }

    tonggleMenu('notify-add-flower');

    if (user.gold < cost_per_place[user.num_of_placed]) {
        btnAgree.classList.add("disabled");
        btnAgree.disabled = true;
    } else {
        btnAgree.classList.remove("disabled");
        btnAgree.disabled = false;
    }
}

getDataById(1)
    .then(data => {
        if (data?.flowers && data?.num_of_placed) {
            renderMainScreen()
            renderInventoryScreen()
        } else {
            console.log("Không có dữ liệu")
        }
    })

// renderInventoryScreen()

function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}

