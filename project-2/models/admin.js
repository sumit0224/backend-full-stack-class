// models/Admin.js
import mongoose  from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    permissions: {
      type: [String],
      default: ["manage_users"],
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Admin", adminSchema);