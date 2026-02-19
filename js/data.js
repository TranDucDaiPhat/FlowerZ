// mockAPI tranphat1747

// cost_type: true = gold, false = red gold
const flowers = [
    {
        id: 1,
        url_image: "flower-2.png",
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
    {
        id: 2,
        url_image: "flower-9.png",
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
    {
        id: 3,
        url_image: "flower-11.png",
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
    gold: 45,
    red_gold: 5,
    num_of_placed: 5,
    water: 5,
    max_water: 15,
    water_recovery_time: 15, // 15s
    flowers: [
        {
            id: 1,
            level: 1,
            earned: 5,
            water: 15,
            irrigation_time: 5 * 60 + 30, // 5p30s
        },
        {
            id: 1,
            level: 2,
            earned: 5,
            water: 15,
            irrigation_time: 15 * 60 + 45,
        },
        {
            id: 2,
            level: 1,
            earned: 5,
            water: 15,
            irrigation_time: 54 * 60 + 15,
        },
    ],
    flowers_in_bag: [
        {
            "id": 1,
            "level": 1
        },
        {
            "id": 1,
            "level": 1
        },
        {
            "id": 2,
            "level": 1
        }
    ]
}

const flowerMap = {};

flowers.forEach(f => {
    flowerMap[f.id] = f;
});

export function getFlowerById(id) {
    return flowerMap[id];
}