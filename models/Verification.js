import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
  user_id: String,
  verification_code: String,
  created_at: Date,
  expires_at: Date,
});

export default mongoose.model("Verification", VerificationSchema);
