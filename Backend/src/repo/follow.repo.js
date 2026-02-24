import mongoose from "mongoose";
import AudienceModel from "../models/follow.follower.schema.js";
import UserModel from "../models/users.schema.js";

export default class Audiencerepository {

    async followme(yourid, targetid) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            if (yourid === targetid) {
                throw new Error("You cannot follow yourself");
            }

            let users = await UserModel.find({}, { _id: 1 }).session(session);

            for (const u of users) {
                const is_present = await AudienceModel.findById(u._id).session(session);
                if (!is_present) {
                    await AudienceModel.create(
                        [{
                            user: u._id,
                            followers: [],
                            following: []
                        }],
                        { session }
                    );
                }
            }

            const is_exist = await AudienceModel.findById(targetid).session(session);
            if (is_exist) {
                await UserModel.findByIdAndUpdate(
                    yourid,
                    { $inc: { following: 1 } },
                    { session }
                );

                await UserModel.findByIdAndUpdate(
                    targetid,
                    { $inc: { followers: 1 } },
                    { session }
                );

                await AudienceModel.findByIdAndUpdate(
                    targetid,
                    { $addToSet: { followers: yourid } },
                    { session }
                );

                await AudienceModel.findByIdAndUpdate(
                    yourid,
                    { $addToSet: { following: targetid } },
                    { session }
                );
            }

            await session.commitTransaction();
            return "Followed...";
        } catch (error) {
            await session.abortTransaction();
            throw new Error(error.message);
        } finally {
            session.endSession();
        }
    }

    async unfollowme(yourid, targetid) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const is_exist = await AudienceModel.findById(targetid).session(session);
            if (is_exist) {
                await UserModel.findByIdAndUpdate(
                    yourid,
                    { $inc: { following: -1 } },
                    { session }
                );

                await UserModel.findByIdAndUpdate(
                    targetid,
                    { $inc: { followers: -1 } },
                    { session }
                );

                await AudienceModel.findByIdAndUpdate(
                    targetid,
                    { $pull: { followers: yourid } },
                    { session }
                );

                await AudienceModel.findByIdAndUpdate(
                    yourid,
                    { $pull: { following: targetid } },
                    { session }
                );
            }

            await session.commitTransaction();
            return "Unfollowed...";
        } catch (error) {
            await session.abortTransaction();
            throw new Error(error.message);
        } finally {
            session.endSession();
        }
    }
}