import jwt from "jsonwebtoken"
import "dotenv/config";

const auth = (req, res, next) => {
    const token = req.headers.authorization
    // console.log(token.split(" ")[1])
    try {
        const { id, role } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET)
        req.user = {}
        req.user.id = id
        req.user.role = role
        next()
    }
    catch (error) {
        console.log(error);
        res.json({ status: 0, message: "unauthorized" })
    }
}

export default auth;