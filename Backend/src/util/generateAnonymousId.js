import useridModel from "../models/user.id.js";

async function fetchUsernameSource() {
    return await useridModel.findOne({});
}

function randomItem(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
}

export default async function generateAnonymousId() {
    const data = await fetchUsernameSource();
    if (!data) {
        throw new Error("Username source document not found in DB. Run Generateuserid() first.");
    }
    const { firstNames, lastNames } = data;
    const user_id = `@${randomItem(firstNames)}${randomItem(lastNames)}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 4)}`;
    return user_id;
}

