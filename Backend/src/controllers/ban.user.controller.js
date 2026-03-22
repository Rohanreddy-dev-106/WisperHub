import Banrepository from "../repo/ban.user.repo.js";

export default class BanController {
    _Banrepo;

    constructor() {
        this._Banrepo = new Banrepository();
    }

    async banuser(req, res, next) {
        try {
            const { uniqueid, reason } = req.body;

            if (!uniqueid || !reason) {
                return res.status(400).json({
                    success: false,
                    message: "uniqueid and reason are required"
                });
            }

            // Prevent banning yourself before doing any DB work
            if (uniqueid === req.user.uniqueid) {
                return res.status(403).json({
                    success: false,
                    message: "You cannot ban yourself"
                });
            }

            const ip =
                req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
                req.ip;

            const result = await this._Banrepo.banuser({ uniqueid, ip, reason });

            if (result === "already_banned") {
                return res.status(200).json({
                    success: true,
                    message: "User is already banned. Your IP report has been recorded."
                });
            }

            return res.status(201).json({
                success: true,
                message: "User has been banned successfully",
                data: result
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
