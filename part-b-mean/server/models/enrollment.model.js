const mongoose = require('mongoose');
const { Schema } = mongoose;
const EnrollmentStatus = require('./constants');

const EnrollmentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(EnrollmentStatus.ENROLLMENT_STATES),
            default: EnrollmentStatus.ENROLLMENT_STATES.ENROLLED,
        },

        topics: [
            {
                topicId: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                checked: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
