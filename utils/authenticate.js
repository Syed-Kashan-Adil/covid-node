import JWT from "jsonwebtoken";
const authenticate = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        JWT.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) return res.status(403).send({ status: false, message: "Failed to authenticate token." });
            if (!req.value) {
                req.value = {};
                req.value.body = {};
            };
            req.value.body.userId = decoded.userId;
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({ status: false, message: "No token provided!" });
    }
};

export { authenticate }