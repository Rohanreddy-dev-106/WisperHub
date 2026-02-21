import mongoose from "mongoose";
import BanModel from "../models/ban.user.js";
import userModel from "../models/users.schema.js";
import banUser from "../models/ban.user.js";

export default class Banrepository {

    async banuser(data) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const banuser = await userModel
                .findOne({ Uniqueid: data.uniqueid })
                .session(session);
            if (!banuser) {
                throw new Error("User not found");
            }

            const exist = await BanModel
                .findOne({ anonymousId: banuser.Uniqueid })
                .session(session);

            if (exist) {
                await BanModel.findByIdAndUpdate(
                    exist._id,
                    { $push: { ip: data.ip } },
                    { session }
                );

                await session.commitTransaction();
                return "already_banned";
            }

            const ban = new BanModel({
                ip: [data.ip],
                anonymousId: banuser.Uniqueid,
                reason: data.reason,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day ban
            });

            const baninfo = await ban.save({ session });

            await userModel.findOneAndUpdate(
                { _id: banuser._id },
                {
                    $set: {
                        isBanned: true,
                        Baninfo: baninfo._id
                    }
                },
                { session }
            );

            await session.commitTransaction();
            return baninfo;

        } catch (error) {
            await session.abortTransaction();
            console.error("Transaction aborted:", error.message);
            throw error;
        } finally {
            session.endSession();
        }
    }
}