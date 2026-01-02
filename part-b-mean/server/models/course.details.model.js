const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseDetailsSchema = Schema(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
            index: true,
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

const CourseDetails = mongoose.model('CourseDetails', CourseDetailsSchema);

module.exports = CourseDetails;