// passport/login.js
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default function (passport) {
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "usernameEmail",
        passwordField: "password",
      },
      async (req, usernameEmail, password, done) => {
        try {
          const user = await User.findOne({
            $or: [{ username: usernameEmail }, { email: usernameEmail }],
          });

          if (!user) {
            console.log("Usuario no encontrado: " + usernameEmail);
            return done(null, false, req.flash("message", "Datos incorrectos"));
          }

          const valid = bcrypt.compareSync(password, user.password);
          if (!valid) {
            console.log("Invalid password");
            return done(null, false, req.flash("message", "Datos incorrectos"));
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}
