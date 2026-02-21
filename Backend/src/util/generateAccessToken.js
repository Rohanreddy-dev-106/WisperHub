import jwt from "jsonwebtoken";
export default function generateAccessToken(user) {
    console.log("accessToken_user_id", user._id,user.Uniqueid);
    
        return jwt.sign(
           { UserID: user._id, uniqueid: user.Uniqueid },
            process.env.ACCESSTOKEN_KEY,
            {
                algorithm: "HS256",
                expiresIn: "15m"
            }
        );
    }
