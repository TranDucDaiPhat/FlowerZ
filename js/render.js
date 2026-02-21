import { user, cost_per_place, getFlowerById } from "./data.js"



export function renderMainScreen() {
    const container = document.querySelector("#flower-container");
    const num_of_flower = document.getElementById("num-of-flower");
    const num_of_gold = document.getElementById("num-of-gold");
    const num_of_red_gold = document.getElementById("num-of-red-gold");
    const num_of_water = document.getElementById("num-of-water");
    if (!container) return;

    const { flowers = [] } = user;

    let html = "";
    let slots = [];

    /* =========================
       Thêm các flower đã trồng
    ========================== */
    flowers.forEach((f, index) => {
        let json = JSON.stringify(f)
        let escapedJson = json.replace(/"/g, '&quot;');
        if (f.id == -1) {
            slots.push(`
            <div class="item" data-flower="${escapedJson}" data-index="${index}">
                <img class="empty-flower-img" src="res/icon/empty-flower.png" alt="">
            </div>`);
            return;
        }
        const flowerData = getFlowerById(f.id);
        if (!flowerData) {
            console.warn("Không tìm thấy flower id:", f.id);
            return;
        }

        slots.push(`
            <div class="item" data-flower="${escapedJson}" data-index="${index}">
                <img class="item-img" src="res/flowers/${flowerData.url_image}" alt="" srcset="">
                <button class="item-button">Tưới nước</button>
                <img class="drop" src="res/icon/drop.png" alt="" srcset="">
            </div>
        `);
    });

    /* =========================
       Nếu còn có thể mua thêm slot → thêm nút add
    ========================== */
    if (cost_per_place.length > flowers.length) {
        const cost = cost_per_place[flowers.length];
        slots.push(`
            <div id="add-flower-item" class="add-flower-item">
                <img class="empty-flower-img add-flower-img"
                     src="res/icon/add-flower.png" alt="">
                <p>${cost}v</p>
            </div>
        `);
    }

    /* =========================
       Render theo từng row (3 item / row)
    ========================== */
    const totalSlots = slots.length;
    const remainder = totalSlots % 3;
    const padding = remainder === 0 ? 0 : 3 - remainder;

    // Thêm empty để đủ 3 cột
    for (let i = 0; i < padding; i++) {
        slots.push(`<div class="empty"></div>`);
    }

    // Chia thành từng row
    for (let i = 0; i < slots.length; i++) {
        if (i % 3 === 0) {
            html += `<div class="item-row">`;
        }

        html += slots[i];

        if (i % 3 === 2) {
            html += `</div>`;
        }
    }

    if (num_of_flower && num_of_gold && num_of_red_gold && num_of_water) {
        let num = 0
        user.flowers.forEach(f => {
            if (f.id != -1) {
                num++;
            }
        })
        num_of_flower.innerHTML = `<p id="num-of-flower">${num}</p>`
        num_of_gold.innerHTML = `<p id="num-of-gold">${user.gold}</p>`
        num_of_red_gold.innerHTML = `<p id="num-of-red-gold">${user.red_gold}</p>`
        num_of_water.innerHTML = `<p id="num-of-water">${user.water}/${user.max_water}</p>`
    }
    container.innerHTML = html;
}

export function renderInventoryScreen() {
    const container = document.querySelector("#flower-container-bag");
    const num_of_flower = document.getElementById("num-of-flower-bag");
    if (!container) return;

    const { flowers_in_bag = [] } = user;

    let html = "";
    let slots = [];

    if (num_of_flower) {
        num_of_flower.innerHTML = `<p id="num-of-flower-bag">${user.flowers_in_bag.length}/50</p>`
    }

    if (flowers_in_bag.length == 0) {
        html = `<div style="width: 100%; height: 150px; display: flex; justify-content: center; align-items: center;">
                        <p style="color: lightgray; width: 300px; font-size: 21px; text-align: center;">Hiện không có bông hoa nào trong Kho Đồ!</p>
                    </div>`;
        container.innerHTML = html;
        return;
    }

    /* =========================
       Thêm các flower trong kho đồ
    ========================== */
    flowers_in_bag.forEach((f, index) => {
        const flowerData = getFlowerById(f.id);
        if (!flowerData) {
            console.warn("Không tìm thấy flower id:", f.id);
            return;
        }

        slots.push(`
            <div class="item" data-index="${index}">
                <img class="item-img" src="res/flowers/${flowerData.url_image}" alt="">
            </div>
        `);
    });

    /* =========================
       Render theo từng row (3 item / row)
    ========================== */
    const totalSlots = slots.length;
    const remainder = totalSlots % 3;
    const padding = remainder === 0 ? 0 : 3 - remainder;

    // Thêm empty để đủ 3 cột
    for (let i = 0; i < padding; i++) {
        slots.push(`<div class="empty"></div>`);
    }

    // Chia thành từng row
    for (let i = 0; i < slots.length; i++) {
        if (i % 3 === 0) {
            html += `<div class="item-row">`;
        }

        html += slots[i];

        if (i % 3 === 2) {
            html += `</div>`;
        }
    }
    container.innerHTML = html;
}