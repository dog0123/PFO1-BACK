// passport/init.js
import login from "./login.js";
import signup from "./signup.js";
import User from "../models/user.js";

export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id); // Guarda solo el ID en la sesión
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  login(passport);
  signup(passport);
}
