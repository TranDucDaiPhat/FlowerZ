// mockAPI tranphat1747

// cost_type: true = gold, false = red gold
const flowers = [
    {
        id: 1,
        url_image: "flower-9.png",
        name: "Hoa Tàn Ảnh",
        rank: "C",
        cost_type: true,
        cost: 15,
        limit: 1,
        level: [
            {
                lvl: 1,
                produce: 5,
                max: 145,
                water: 55,
                sell: 5,
            },
            {
                lvl: 2,
                produce: 7,
                max: 165,
                water: 65,
                sell: 9,
            }
        ],
        description: "Chỉ nở khi hoàng hôn buông xuống. Có thể hấp thụ năng lượng của các ngôi sao.",
        probability: [
            {
                rank: "D",
                percent: 25
            },
            {
                rank: "C",
                percent: 5
            }
        ]
    },
    {
        id: 2,
        url_image: "flower-11.png",
        name: "Hoa Huyết Lộ",
        rank: "C",
        cost_type: true,
        cost: 15,
        limit: 9,
        level: [
            {
                lvl: 1,
                produce: 6,
                max: 146,
                water: 56,
                sell: 5,
            },
            {
                lvl: 2,
                produce: 7,
                max: 165,
                water: 65,
                sell: 9,
            }
        ],
        description: "Trên cánh hoa luôn rỉ ra chất lỏng đỏ sẫm như sương máu. Người chạm vào sẽ thấy ký ức buồn bã không thuộc về mình.",
        probability: [
            {
                rank: "D",
                percent: 25
            },
            {
                rank: "C",
                percent: 5
            }
        ]
    },
    {
        id: 3,
        url_image: "flower-11.png",
        name: "anc",
        rank: "D",
        cost_type: true,
        cost: 15,
        limit: 1,
        level: [
            {
                lvl: 1,
                produce: 5,
                max: 145,
                water: 55,
                sell: 5,
            },
            {
                lvl: 2,
                produce: 7,
                max: 165,
                water: 65,
                sell: 9,
            }
        ],
        description: "",
        probability: [
            {
                rank: "D",
                percent: 25
            },
            {
                rank: "C",
                percent: 5
            }
        ]
    },
    {
        id: 13,
        url_image: "flower-13.png",
        name: "anc",
        rank: "D",
        cost_type: true,
        cost: 15,
        limit: 9,
        level: [
            {
                lvl: 1,
                produce: 5,
                max: 145,
                water: 55,
                sell: 5,
            },
            {
                lvl: 2,
                produce: 7,
                max: 165,
                water: 65,
                sell: 9,
            }
        ],
        description: "",
        probability: [
            {
                rank: "D",
                percent: 25
            },
            {
                rank: "C",
                percent: 5
            }
        ]
    },
]

const object = {

}


export const cost_per_place = [0, 0, 0, 10, 25, 40, 55, 70, 90, 110]

export const user = {
    time_update: "13-2-2026 14:32:54",
    gold: 0,
    red_gold: 0,
    water: 5,
    max_water: 15,
    water_recovery_time: 15, // 15s
    flowers: [
        {
            id: -1
        },
        {
            id: -1
        },
        {
            id: -1
        },
    ],
    flowers_in_bag: [
        {
            "id": 1,
            "level": 1,
            "water": 0,
            "irrigation_time": 0
        },
        {
            "id": 1,
            "level": 1,
            "water": 0,
            "irrigation_time": 0
        },
        {
            "id": 2,
            "level": 1,
            "water": 0,
            "irrigation_time": 0
        },
    ]
}

const flowerMap = {};

flowers.forEach(f => {
    flowerMap[f.id] = f;
});

export function getFlowerById(id) {
    return flowerMap[id];
}

export function countFlowerById(id) {
    let count = 0;
    user.flowers.forEach(f => {
        if (f.id == id) {
            count++;
        }
    })

    return count;
}