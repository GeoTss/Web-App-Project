const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseDetailsSchema = Schema(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        sections: [
            {
                title: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
            },
        ],  
    },
    {
        timestamps: true,
    }
);

CourseDetailsSchema.index({ course: 1}, { unique: true });

const CourseDetails = mongoose.model('CourseDetails', CourseDetailsSchema);

module.exports = CourseDetails;