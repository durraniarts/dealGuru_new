import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: { type: String, required: [true, "please enter password"] },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
