import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", ""); 

    if (!token) {
        return res.json({ status: "error", message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.json({ status: "error", message: "Invalid token" });
    }
};

export default verifyToken;
