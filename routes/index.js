import { Router } from "express";

const router = Router();

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
}

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  return res.status(403).send("Acceso denegado");
}


// Export con función que recibe passport
export default (passport) => {
  // GET Login Page
  router.get("/", (req, res) => {
    res.render("index", { message: req.flash("message") });
  });

  // Handle Login POST
  router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  (req, res) => {
    return res.redirect("/home");
  }
);

  router.get("/home", isAuthenticated, (req, res) => {
    res.render("home", { user: req.user });
  });

  router.post(
  "/signup",
  isAdmin, 
  passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signup", isAdmin, (req, res) => {
  res.render("nuevoUsuario", { user: req.user });
});

  // Logout
  router.get("/signout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

  return router;
};
