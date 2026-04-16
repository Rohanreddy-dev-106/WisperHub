import useridModel from "../models/user.id.js";
import usernames from "../tests/names.js"; //  IMPORTANT

async function fetchUsernameSource() {
    let data = await useridModel.findOne({});

    // ✅ AUTO-SEED from test folder
    if (!data) {
        data = await useridModel.create({
            firstNames: usernames.firstNames,
            lastNames: usernames.lastNames
        });
        console.log("Username source auto-created from test/usernames.js");
    }

    return data;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default async function generateAnonymousId() {
    const { firstNames, lastNames } = await fetchUsernameSource();

    return (
        "@" +
        randomItem(firstNames) +
        randomItem(lastNames) +
        Date.now().toString(36) +
        Math.random().toString(36).slice(2, 4)
    );
}