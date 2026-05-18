import mongoose from "mongoose";
// models/Student.js


const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    fees: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);