import Likerepo from "../repo/like.repo.js";

export default class Likes {
    _Likerepo;
    constructor() {
        this._Likerepo = new Likerepo()
    }
    async CreateLike(req, res, next) {
        const { postId } = req.params;
        const authorId = req.user.UserID
        try {
            const like = await this._Likerepo.createlikes({ authorId, postId });
            return res.status(201).json({ success: true, message: like });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}