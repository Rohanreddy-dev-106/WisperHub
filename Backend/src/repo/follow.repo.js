import mongoose from "mongoose";
import AudienceModel from "../models/follow.follower.schema.js";

export default class Audiencerepository {

    // If this user doesn't have a follow profile yet, create one for them.
    // We check by userId — if a profile already exists, nothing changes.
    async createFollowProfileIfNotExists(userId, session) {
        const alreadyExists = await AudienceModel
            .findOne({ user: userId })
            .session(session);

        if (!alreadyExists) {
            const audience = new AudienceModel({
                user: userId,
                followers: [],
                following: []
            });

            await audience.save({ session });
        }
    }

    async followme(yourid, targetid) {
        if (String(yourid) === String(targetid)) {
            throw new Error("You cannot follow yourself");
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            // Make sure both users have a follow profile before we update anything
            await this.createFollowProfileIfNotExists(yourid, session);
            await this.createFollowProfileIfNotExists(targetid, session);

            // Atomically add to both sides runs asy task same time
            await Promise.all([
                AudienceModel.findOneAndUpdate(
                    { user: targetid },
                    { $addToSet: { followers: yourid } },
                    { session }
                ),
                AudienceModel.findOneAndUpdate(
                    { user: yourid },
                    { $addToSet: { following: targetid } },
                    { session }
                )
            ]);

            await session.commitTransaction();
            return "Followed...";
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async unfollowme(yourid, targetid) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            await Promise.all([
                AudienceModel.findOneAndUpdate(
                    { user: targetid },
                    { $pull: { followers: yourid } },
                    { session }
                ),
                AudienceModel.findOneAndUpdate(
                    { user: yourid },
                    { $pull: { following: targetid } },
                    { session }
                )
            ]);

            await session.commitTransaction();
            return "Unfollowed...";
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}