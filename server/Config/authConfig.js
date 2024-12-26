import jwt from "jsonwebtoken";

export const generateToken = (userId, email, username, isAdmin) => {
    return jwt.sign(
        { _id: userId, email, username, isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const generateServiceProviderToken = (userId, email, username) => {
    return jwt.sign(
        { _id: userId, email, username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};
