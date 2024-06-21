import JWT from "jsonwebtoken";
import User from "../models/User.js";

function verify  (req,res,next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json("Token is not valid !!");
            req.user = user;
            next(); 
        });
    } else {
        return res.status(401).json("you are not authenticated")
    }
}

export default verify;