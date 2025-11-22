import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // admin / user
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export default mongoose.model("User", UserSchema);

