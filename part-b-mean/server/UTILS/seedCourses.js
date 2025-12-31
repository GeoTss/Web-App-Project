require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/course.model');
const { DifficultyLookup, CategoryLookup } = require('../../client/src/modules/category-utils.js');
const connectDB = require('../config/db.js')

const courses = [
    {
        slug: 'c-plus-plus',
        title: 'C++',
        description: 'You manage memory. Or it manages you.',
        difficulty: DifficultyLookup.HARD,
        category: CategoryLookup.SYSTEMS_PROGRAMMING
    },
    {
        slug: 'javascript',
        title: 'JavaScript',
        description: 'The language everyone loves to hate.',
        difficulty: DifficultyLookup.EASY,
        category: CategoryLookup.WEB_DEVELOPMENT
    },
    {
        slug: 'rust',
        title: 'Rust',
        description: 'Compiler says no.',
        difficulty: DifficultyLookup.DEMON,
        category: CategoryLookup.SYSTEMS_PROGRAMMING
    },
    {
        slug: 'python',
        title: 'Python',
        description: 'Indentation is not optional.',
        difficulty: DifficultyLookup.EASY,
        category: CategoryLookup.DATA_SCIENCE
    },
    {
        slug: 'opengl',
        title: 'OpenGL',
        description: 'Why are there so many triangles?',
        difficulty: DifficultyLookup.HARD,
        category: CategoryLookup.GRAPHICS_PROGRAMMING
    },
    {
        slug: 'tensorflow',
        title: 'TensorFlow',
        description: 'Make your computer learn stuff.',
        difficulty: DifficultyLookup.HARD,
        category: CategoryLookup.ARTIFICIAL_INTELLIGENCE
    },
    {
        slug: 'aws',
        title: 'AWS',
        description: "It's not your computer.",
        difficulty: DifficultyLookup.MEDIUM,
        category: CategoryLookup.CLOUD_COMPUTING
    },
    {
        slug: 'arduino',
        title: 'Arduino',
        description: 'Blinking lights and beeping sounds.',
        difficulty: DifficultyLookup.MEDIUM,
        category: CategoryLookup.EMBEDDED_SYSTEMS
    },
    {
        slug: 'assembly',
        title: 'Assembly',
        description: 'Good luck.',
        difficulty: DifficultyLookup.DEMON,
        category: CategoryLookup.SYSTEMS_PROGRAMMING
    },
    {
        slug: 'vulkan',
        title: 'Vulkan',
        description: 'What do you mean I have to manage everything?',
        difficulty: DifficultyLookup.DEMON,
        category: CategoryLookup.GRAPHICS_PROGRAMMING
    }
];

(async () => {
    try {
        await connectDB();
        await Course.deleteMany({});
        console.log('Old courses removed');
        await Course.insertMany(courses);
        console.log('Courses seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
})();
