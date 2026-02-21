import Userrepo from "../repo/users.repo.js";
import generateAnonymousId from "../util/generateAnonymousId.js"
import generateAccessToken from "../util/generateAccessToken.js";
import bcrypt from "bcrypt";

export default class UserController {
    _userrepository;
    constructor() {
        this._userrepository = new Userrepo();

    }
    async Register(req, res, next) {
        try {
            const { age, bio, password, avatar } = req.body;
            if (!age || !bio || !password || !avatar) {
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
            const uniqueid = await generateAnonymousId();
            if (!uniqueid) {
                return res.status(400).json({
                    success: false,
                    message: "Unique_id is not Generated"
                });
            }
            let username = uniqueid.slice(1, uniqueid.search(/mlv/));
            const ip =
                req.headers["x-forwarded-for"]?.split(",")[0] ||
                req.ip;
            const { browser, os, device } = req.useragent;
            const deviceName = `${device.vendor || "Unknown"} ${device.model || "Device"} | ${os.name || "Unknown OS"} | ${browser.name || "Unknown Browser"}`;
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await this._userrepository.register({
                Uniqueid: uniqueid,
                Ip: ip,
                IpHistory: [ip],
                UserDevice: deviceName,
                Age: age,
                Bio: bio,
                Password: hashedPassword,
                Avatar: avatar,
                Username: username
            });
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            })
        }
        catch (error) {
            console.log(error);
            
            if (error.message === "USER_ALREADY_EXISTS") {
                return res.status(409).json({ message: "User already exists" });
            }
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
            const { Uniqueid, password } = req.body;
            const { browser, os, device } = req.useragent;
            const deviceName = `${device.vendor || "Unknown"} ${device.model || "Device"} | ${os.name || "Unknown OS"} | ${browser.name || "Unknown Browser"}`;
            let user_present = await this._userrepository.findUser(Uniqueid);
            if (!user_present) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user_present.Password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }
            if (user_present.UserDevice !== deviceName) {
                user_present.UserDevice = deviceName;
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
            return res.json({ success: true, data: user_present });
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

