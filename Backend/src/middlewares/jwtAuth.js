import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).send("Invalid credentials");
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESSTOKEN_KEY);
        console.log("jwtverfy:", payload);


        req.user = {
            UserID: payload.UserID,
            uniqueid: payload.uniqueid
        };

        next();
    } catch (error) {
        return res.status(401).send("Invalid credentials");
    }
}
