import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    full_name: {
      type: String,
      minlength: 6,
      maxlength: 50,
      trim: true,
    },
    phone_number: {
      type: String,
      default: "+254",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    address: {
      street: String,
      city: String,
      landmark: String,
    },
    user_type: {
      type: String,
      enum: ["client", "worker", "admin"],
      default: "client",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = async function () {
  return jwt.sign(
    { user_id: this._id, user_type: this.user_type },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME || "10d",
    }
  );
};

export default mongoose.model("User", UserSchema);
