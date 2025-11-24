import User from "../models/User.js";
import bcrypt from "bcryptjs";

async function createAdminIfNotExists() {
  const admin = await User.findOne({ role: "admin" });

  if (!admin) {
    const hashed = bcrypt.hashSync("", 10);

    await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashed,
      role: "admin",
    });

    console.log("Usuario ADMIN creado");
  }
}

export default createAdminIfNotExists;