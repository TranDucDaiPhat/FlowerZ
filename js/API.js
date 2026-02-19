import { user } from "./data.js"

// update
export function updateUserData(id, data) {
    fetch(`https://698e0a8caded595c2530e638.mockapi.io/user-data/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log("Updated:", data);
        });
}

// get
export async function getDataById(id) {
    try {
        const response = await fetch(`https://698e0a8caded595c2530e638.mockapi.io/user-data/${id}`);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        if (data != null)
            Object.assign(user, data);
        return data;
    } catch (error) {
        console.error("Get data failed:", error);
        return null;
    }
}