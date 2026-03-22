import cron from "node-cron";
import BanModel from "../models/ban.user.js";
import UserModel from "../models/users.schema.js";

const UpdateBan = async () => {
    try {
        const expired = await BanModel.find(
            { expiresAt: { $lte: new Date() } },
            { anonymousId: 1 }
        ).lean();

        if (expired.length === 0) return;

        const banids = expired.map((b) => b.anonymousId);

        await UserModel.updateMany(
            { anonymousId: { $in: banids } },
            { $set: { isBanned: false, Baninfo: null } }
        );
        await BanModel.deleteMany({ anonymousId: { $in: banids } });

        console.log(`[BanCron] Lifted ${banids.length} expired ban(s).`);
    } catch (error) {
        console.error("[BanCron] Error:", error.message);
    }
};

export const startBanCron = () => {
    UpdateBan(); // run once on startup to catch missed jobs
    cron.schedule("0 0 * * *", UpdateBan); // every day at 00:00
};