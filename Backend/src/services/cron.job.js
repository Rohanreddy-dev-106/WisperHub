import cron from "node-cron";
import BanModel from "../models/ban.user.js";
import UserModel from "../models/users.schema.js";

const UpdateBan = async () => {
    try {
        let banids = [];
        const baninfo = await BanModel.find({ expiresAt: { $lte: new Date() } });

        for (let info of baninfo) {
            banids.push(info.anonymousId);
        }

        await UserModel.updateMany(
            { anonymousId: { $in: banids } },
            { $set: { isBanned: false, Baninfo: null } }
        );
        await BanModel.deleteMany({ anonymousId: { $in: banids } })

    } catch (error) {
        console.log(error.message);
        throw new Error("THIS IS A CRON JOB ERROR");
    }
};

export const startBanCron = () => {
    UpdateBan(); // run once on startup to catch missed jobs
    cron.schedule("0 0 0 * * *", UpdateBan); // runs every day at 12 AM
};