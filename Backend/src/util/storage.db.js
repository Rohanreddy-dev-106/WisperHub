// NOTE: If you want to insert any new names, run this only with admin or manager-level access...

import useridModel from "../models/user.id.js";
import uniqueids from "../tests/names.js"

export default async function Generateuserid() {
    try {
        const Userid = new useridModel(uniqueids);
        await Userid.save()

        console.log("Default usernames inserted successfully");
    } catch (error) {
        console.log(error.message);
    }
}
