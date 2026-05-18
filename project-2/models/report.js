import mongoose from "mongoose";

const reportCardSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    examTitle: {
      type: String,
      required: true,
      trim: true,
    },

    subjects: [
      {
        subjectName: {
          type: String,
          required: true,
        },

        totalMarks: {
          type: Number,
          required: true,
        },

        obtainedMarks: {
          type: Number,
          required: true,
        },

        grade: {
          type: String,
        },

        remarks: {
          type: String,
        },
      },
    ],

    totalObtainedMarks: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    finalGrade: {
      type: String,
    },

    result: {
      type: String,
      enum: ["pass", "fail"],
      default: "pass",
    },

    teacherRemark: {
      type: String,
      trim: true,
    },

    examDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ReportCard", reportCardSchema);