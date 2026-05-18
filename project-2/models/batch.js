import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    enrolls: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },

        joinDate: {
          type: Date,
          default: Date.now,
        },

        feesStatus: {
          type: String,
          enum: ["pending", "paid"],
          default: "pending",
        },
      },
    ],

    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Batch", batchSchema)