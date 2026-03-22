import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESSTOKEN_KEY);

        req.user = {
            UserID: payload.UserID,
            uniqueid: payload.uniqueid
        };

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}
