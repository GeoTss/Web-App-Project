const mongoose = require('mongoose');
const { Schema } = mongoose;
const EnrollmentStatus = require('./constants');

const EnrollmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(EnrollmentStatus.ENROLLMENT_STATES),
      default: EnrollmentStatus.ENROLLMENT_STATES.ENROLLED,
    },

    progress: {
      type: Number, // %
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
