import Banrepository from "../repo/ban.user.repo.js";

export default class BanController {
    _Banrepo;

    constructor() {
        this._Banrepo = new Banrepository();
    }

    async banuser(req, res, next) {
        try {
            const { uniqueid, reason } = req.body;
            console.log(uniqueid, reason);
            if (uniqueid === req.user.uniqueid) {
                return res.status(404).json({
                    success: false,
                    message: "you cant ban your self..."
                });
            }

            const ip =
                req.headers["x-forwarded-for"]?.split(",")[0] ||
                req.ip;
            if (!uniqueid || !ip || !reason) {
                return res.status(400).json({
                    success: false,
                    message: "uniqueid, ip, and reason are required"
                });
            }

            const result = await this._Banrepo.banuser({ uniqueid, ip, reason });

            // Handle already banned case
            if (result === "already_banned") {
                return res.status(200).json({
                    success: true,
                    message: "This user has already been banned. Your request has been recorded."
                });
            }

            return res.status(201).json({
                success: true,
                message: "User has been banned successfully",
                data: result
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}
