/*const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userid = decoded.userid;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = authMiddleware;
*/
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Authorization header missing or malformed");
        return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userid = decoded.userid; // Assuming `userid` exists in the token payload
       // console.log("Authenticated user ID:", req.userid); // Debug log
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
