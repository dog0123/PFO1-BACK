// passport/signup.js
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default function (passport) {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "username",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        try {
          const existing = await User.findOne({ username });

          if (existing) {
            console.log("User already exists:", username);
            return done(null, false, req.flash("message", "User already exists"));
          }

          const newUser = new User({
            username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });

          await newUser.save();

          console.log("User Registration successful");
          return done(null, newUser);
        } catch (err) {
          console.log("Error in signup:", err);
          return done(err);
        }
      }
    )
  );
}
