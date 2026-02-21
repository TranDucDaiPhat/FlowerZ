import { user, cost_per_place, getFlowerById, countFlowerById } from "./data.js"
import { updateUserData, getDataById } from "./API.js"
import {
    renderMainScreen,
    renderInventoryScreen
} from "./render.js";


let currentMenu = null;
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const btn = document.getElementById("toggleBtn");
const detailBtn = document.getElementById("detail-button");
const btnAddFlower = document.getElementById('btn-add-flower')
const btnStorageFlower = document.getElementById('btn-storage-flower')
const btnCollectFlower = document.getElementById('btn-collect-flower')
const btnWaterFlower = document.getElementById('btn-water-flower')
const flowerName = document.getElementById('flower-name')
const flowerImg = document.getElementById('flower-img')
const description = document.getElementById('description')
const flowerCurrentLvl = document.getElementById('flower-current-lvl')
const flowerCollect = document.getElementById('flower-collect')
const flowerWater = document.getElementById('flower-water')
const flowerRank = document.getElementById('flower-rank')
const flowerMaxLvl = document.getElementById('flower-max-lvl')
const flowerProduce = document.getElementById('flower-produce')
const flowerRecoveryTime = document.getElementById('flower-recovery-time')
const flowerMaxPlace = document.getElementById('flower-max-place')
const warning = document.getElementById("warning")

let placeIndex = null;


document.addEventListener("click", (e) => {
    if (e.target.closest(".add-flower-item")) {
        notifyAddFlowerItem()
    } else if (e.target.closest(".btnCancel")) {
        closeAllMenus()
    } else if (e.target.closest("#btnAgree")) {
        user.gold -= cost_per_place[user.flowers.length]
        user.flowers.push({ id: -1 })
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
        showFlowerInBagInfo(e)
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
    } else if (e.target.closest("#flower-container")) {
        showFlowerInfo(e)
    } else if (e.target.closest(".item-button")) {

    } else if (e.target.closest("#detail-button")) {
        createFlowerDescription(getFlowerById(selectedFlower.id))

        btnAddFlower.classList.add('hidden')
        btnStorageFlower.classList.remove('hidden')
        btnCollectFlower.classList.remove('hidden')
        btnWaterFlower.classList.remove('hidden')
        tonggleMenu('popup-flower-info');
        const desc = document.getElementById("description");
        desc.classList.add("hidden");
    }
});

function addFlowerItem() {
    if (!selectedFlower) return;

    const flower = {
        earned: 0,
        irrigation_time: 0,
        ...selectedFlower
    };

    let placed = false;

    // If specific slot is provided
    if (placeIndex != null && user.flowers[placeIndex].id == -1) {
        user.flowers[placeIndex] = flower;
        placed = true;
    } else {
        // Find first empty slot
        for (let i = 0; i < user.flowers.length; i++) {
            if (user.flowers[i].id == -1) {
                user.flowers[i] = flower;
                placed = true;
                break;
            }
        }
    }

    // If no empty slot found
    if (!placed) {
        tonggleMenu('popup-notify');
        return;
    }

    // Remove from bag
    const bagIndex = user.flowers_in_bag.findIndex(
        f => f.id === selectedFlower.id && f.level === selectedFlower.level
    );

    if (bagIndex !== -1) {
        user.flowers_in_bag.splice(bagIndex, 1);
    }

    placeIndex = null;

    closeAllMenus();
    renderMainScreen();
    renderInventoryScreen();
}


function showFlowerInfo(e) {
    const item = e.target.closest(".item");
    if (!item) return;

    selectedFlower = JSON.parse(item.dataset.flower);

    if (selectedFlower.id == -1) {
        placeIndex = item.dataset.index
        switchScreen("inventory-screen");
    } else {
        detailBtn.classList.add('active')
    }
}

// updateUserData(1, user)

let selectedFlower = null;

function showFlowerInBagInfo(e) {
    const item = e.target.closest(".item");
    if (!item) return;

    const index = item.dataset.index;
    selectedFlower = user.flowers_in_bag[index];
    const flower = getFlowerById(selectedFlower.id)

    createFlowerDescription(flower)

    btnAddFlower.classList.remove('hidden')
    btnStorageFlower.classList.add('hidden')
    btnCollectFlower.classList.add('hidden')
    btnWaterFlower.classList.add('hidden')

    tonggleMenu('popup-flower-info');
}

function createFlowerDescription(flower) {
    flowerImg.src = `res/flowers/${flower.url_image}`

    description.textContent = flower.description

    flowerName.textContent = flower.name
    flowerCurrentLvl.textContent = `Level hiện tại: ${selectedFlower.level}`
    flowerCollect.textContent = `Thu nhập: 0v/${flower.level[selectedFlower.level-1].max}`
    flowerWater.textContent = `Lượng nước: ${selectedFlower.irrigation_time}/${flower.level[selectedFlower.level-1].water}`
    flowerRank.textContent = `Bậc: ${flower.rank}`

    flowerMaxLvl.textContent = `Level tối đa: ${flower.level.length}`
    flowerProduce.textContent = `Sản xuất: ${flower.level[selectedFlower.level-1].produce}v/1h`
    flowerRecoveryTime.textContent = `Thời gian tưới: ${formatSeconds(selectedFlower.irrigation_time)}`
    let count = countFlowerById(selectedFlower.id)
    flowerMaxPlace.textContent = `Số lượng tối đa: ${count}/${flower.limit}`

    if (count >= flower.limit) {
        warning.classList.remove('inactive')
        btnAddFlower.disabled = true;
    } else {
        warning.classList.add('inactive')
        btnAddFlower.disabled = false;
    }
}

function formatSeconds(seconds) {
    if (seconds < 60) {
        return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}p${remainingSeconds}s`;
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

document.addEventListener("click", function (e) {
    const clickedItem = e.target.closest(".item-img");
    const allItems = document.querySelectorAll(".item-img");

    // Nếu click vào item
    if (clickedItem) {
        // Xóa active của tất cả item
        allItems.forEach(item => item.classList.remove("active"));

        // Thêm active cho item được click
        clickedItem.classList.add("active");
    } else {
        // Nếu click ra ngoài -> bỏ active hết
        allItems.forEach(item => item.classList.remove("active"));
        detailBtn.classList.remove('active')
    }
});



function notifyAddFlowerItem() {
    const cost = document.getElementById("cost-of-place");
    const btnAgree = document.getElementById("btnAgree");

    if (cost) {
        cost.innerHTML = `<p id="cost-of-place">Giá: ${cost_per_place[user.flowers.length]}v</p>`
    }

    tonggleMenu('notify-add-flower');

    if (user.gold < cost_per_place[user.flowers.length]) {
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
// renderMainScreen()

function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}

