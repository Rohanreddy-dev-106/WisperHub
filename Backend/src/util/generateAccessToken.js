import jwt from "jsonwebtoken";

export default function generateAccessToken(user) {
    return jwt.sign(
        { UserID: user._id, uniqueid: user.Uniqueid },
        process.env.ACCESSTOKEN_KEY,
        {
            algorithm: "HS256",
            expiresIn: "7d"
        }
    );
}
