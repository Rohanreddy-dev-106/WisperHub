import Userrepo from "../repo/users.repo.js";
import generateAnonymousId from "../util/generateAnonymousId.js"
import generateAccessToken from "../util/generateAccessToken.js";

export default class UserController {
    _userrepository;
    constructor() {
        this._userrepository = new Userrepo();

    }
    async Register(req, res, next) {
        try {
            const { age, bio } = req.body;
            if (!age || !bio) {
                return res.status(400).json({
                    success: false,
                    message: "Username, age, and bio are required"
                });
            }
            if (age < 18 || age > 60) {
                return res.status(400).json({
                    success: false,
                    message: "Age must be between 18 and 60"
                });
            }
            const uniqueid = generateAnonymousId();
            if (!uniqueid) {
                return res.status(400).json({
                    success: false,
                    message: "Unique_id is not Generated"
                });
            }
            const ip =
                req.headers["x-forwarded-for"]?.split(",")[0] ||
                req.ip;
            const ua = req.useragent;
            const deviceName = `${ua.browser} on ${ua.os}`;
            const user = await this._userrepository.register({
                Uniqueid: uniqueid,
                Ip: ip,
                IpHistory: [ip],
                UserDevice: deviceName,
                Age: age,
                Bio: bio,
            });
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            })
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }
    }

    async Login(req, res, next) {
        try {
            const ip =
                req.headers["x-forwarded-for"]?.split(",")[0] ||
                req.ip;
            const { Uniqueid } = req.body;
            const ua = req.useragent;
            const deviceName = `${ua.browser} on ${ua.os}`;
            let user_present = await this._userrepository.login(Uniqueid);
            if (!user_present) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            if (user_present.UserDevice !== deviceName) {
                user_present.UserDevice = deviceName
            }
            user_present.Ip = ip;
            if (!user_present.IpHistory.includes(ip)) {
                user_present.IpHistory.push(ip);
            }
            await user_present.save();
            const accesstoken = generateAccessToken(user_present);
            const ACCESS_COOKIE_EXPIRE = 60 * 60 * 1000; // 3,600,000 ms = 1 hour
            res.cookie("jwtToken", accesstoken, {
                maxAge: ACCESS_COOKIE_EXPIRE,
                httpOnly: true,
            });
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: "User not found.."
            })
        }

    }
    async Logout(req, res, next) {
        try {
            console.log("Logout", req.user.UserID);

            res.clearCookie("jwtToken", { httpOnly: true });

            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            return res.status(500).send("Logout failed");
        }
    }
}

