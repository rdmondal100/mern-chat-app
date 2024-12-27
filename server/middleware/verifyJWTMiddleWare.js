import jwt from 'jsonwebtoken'

const verifyJWT = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const token = req.cookies?.accessToken || req.get("Authorization")?.split(' ')[1]
        if (!token) {
            return res.status(400).json({
                message: "Unauthorized token",
                success: false
            })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.body.userId = decodedToken.userId

        next();
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}


export default verifyJWT