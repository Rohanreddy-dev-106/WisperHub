import mongoose from "mongoose";
import AudienceModel from "../models/follow.follower.schema.js";

export default class Audiencerepository {

    // If this user doesn't have a follow profile yet, create one for them.
    // We check by userId — if a profile already exists, nothing changes.
    async createFollowProfileIfNotExists(userId) {
        const alreadyExists = await AudienceModel
            .findOne({ user: userId });

        if (!alreadyExists) {
            const audience = new AudienceModel({
                user: userId,
                followers: [],
                following: []
            });

            await audience.save();
        }
    }

    async followme(yourid, targetid) {
        if (String(yourid) === String(targetid)) {
            throw new Error("You cannot follow yourself");
        }

        // Make sure both users have a follow profile before we update anything
        await this.createFollowProfileIfNotExists(yourid);
        await this.createFollowProfileIfNotExists(targetid);

        await Promise.all([
            AudienceModel.findOneAndUpdate(
                { user: targetid },
                { $addToSet: { followers: yourid } }
            ),
            AudienceModel.findOneAndUpdate(
                { user: yourid },
                { $addToSet: { following: targetid } }
            )
        ]);

        return "Followed...";
    }

    async unfollowme(yourid, targetid) {
        await Promise.all([
            AudienceModel.findOneAndUpdate(
                { user: targetid },
                { $pull: { followers: yourid } }
            ),
            AudienceModel.findOneAndUpdate(
                { user: yourid },
                { $pull: { following: targetid } }
            )
        ]);

        return "Unfollowed...";
    }

    async checkStatus(yourid, targetid) {
        // Need to check target's followers count and if yourid is in target's followers
        const targetProfile = await AudienceModel.findOne({ user: targetid });
        if (!targetProfile) return { isFollowing: false, followerCount: 0 };
        const followerCount = targetProfile.followers.length;
        const isFollowing = targetProfile.followers.some(id => String(id) === String(yourid));
        return { isFollowing, followerCount };
    }
}