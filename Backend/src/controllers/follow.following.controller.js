import Audiencerepository from "../repo/follow.repo.js";

export default class AudienceController {
    _Audiencerepo;

    constructor() {
        this._Audiencerepo = new Audiencerepository();
    }

    // FOLLOW
    async Follow(req, res, next) {
        try {
            const yourid = req.user.UserID;
            const { targetid } = req.params;
            console.log(targetid);
            

            if (!targetid) {
                return res.status(400).json({
                    success: false,
                    message: "targetid is required"
                });
            }

            await this._Audiencerepo.followme(yourid, targetid);

            return res.status(200).json({
                success: true,
                message: "Followed successfully"
            });
        } catch (error) {
            console.log(error.message);

        }
    }

    // UNFOLLOW
    async Unfollow(req, res, next) {
        try {
            const yourid = req.user.UserID;
            const { targetid } = req.params;

            if (!targetid) {
                return res.status(400).json({
                    success: false,
                    message: "targetid is required"
                });
            }

            await this._Audiencerepo.unfollowme(yourid, targetid);

            return res.status(200).json({
                success: true,
                message: "Unfollowed successfully"
            });
        } catch (error) {
            console.log(error.message);

        }
    }
}