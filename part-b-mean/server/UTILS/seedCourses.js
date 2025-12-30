require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/course.model');
const { DifficultyLookup, CategoryLookup } = require('../../client/src/modules/category-utils.js');
const uname = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASSWORD;
const uri = process.env.MONGO_URI || `mongodb+srv://${uname}:${encodeURIComponent(pwd)}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;  

// const colors = [
//     "#708090",
//     "#DA70D6",
//     "#FF8C00",
//     "#2E8B57",
//     "#20B2AA",
//     "#4169E1",
//     "#8B0000",
//     "#9932CC",
//     "#00BFFF",
//     "#FF1493",
//     "#556B2F",
//     "#4682B4",
//     "#FF4500",
//     "#4B0082",
//     "#DAA520",
// ];

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

async function seedCourses() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    console.log('Old courses removed');

    await Course.insertMany(courses);
    console.log('Courses seeded successfully');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedCourses();
