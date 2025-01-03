import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../../Models/userModels.js";
import { generateToken } from "../../Config/authConfig.js";

dotenv.config();

const router = express.Router();

// Google Client ID and Secret from your Google Cloud Console
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log("this is client id",GOOGLE_CLIENT_ID," and secret",GOOGLE_CLIENT_SECRET);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // (profile, done) => {
            // Save user profile to database or return user data
            // Example:
            // console.log("it is users profile", profile);
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    async (req, res) => {
        try {
            const { email } = req.user._json; // Extract email from _json
            const { id } = req.user; // Extract id

            console.log("these are email and id", email, id);  // Log email and id

            if (!id || !email) {
                return res.status(400).json({ success: false, msg: "Google ID or email is missing" });
            }

            // Check if the user already exists in the database
            let existingUser = await User.findOne({ email });

            console.log("this is existing user", existingUser)

            if (!existingUser) {
                let isAdmin = false;
                if (email === "abrar@gmail.com") {
                    isAdmin = true;
                }

                const newUser = new User({
                    email,
                    firstName: "ali",
                    lastName: "ali",
                    userName: "aliAhmad1", 
                    phoneNumber: "03418998765",
                    password: "123456"
                });

                await newUser.save();
                existingUser = newUser;
            }

            // Generate a token for the user
            const token = generateToken(existingUser._id, existingUser.email, existingUser.userName, existingUser.isAdmin);

            // Respond with the user data and token
            const userResponse = {
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                userName: existingUser.userName,
                isAdmin: existingUser.isAdmin,
            };


            return res.redirect(`http://localhost:3000/?token=${token}`);

            // Send the response
            // return res.status(200).json({
            //     success: true,
            //     msg: "Logged in successfully with Google",
            //     token,
            //     data: userResponse,
            // });
        } catch (error) {
            console.log("Error during Google login callback:", error);
            return res.status(500).json({ success: false, msg: "Server Error" });
        }
    }
);



export default router;
