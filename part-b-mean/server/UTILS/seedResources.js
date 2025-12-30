require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('../models/resource.model');
const { CategoryLookup, resourceTypeLookup, category_t } = require('../../client/src/modules/category-utils.js');
const uname = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PASSWORD;
const uri = process.env.MONGO_URI || `mongodb+srv://${uname}:${encodeURIComponent(pwd)}@webappprojectaueb.ms7f1ey.mongodb.net/?appName=WebAppProjectAueb`;  

function getCategoryTag(id) {
    const cat = category_t[id];
    return {
        categoryLookupId: id,
        tagName: cat.name,
        tagColor: cat.color,
        tagClass: `tag-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    };
}

const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const resources = [
  // BOOKS
  {
    type: resourceTypeLookup.BOOK,
    title: "Computer Systems: A Programmer's Perspective",
    author: "Randal E. Bryant",
    url: "https://example.com/book/csapp",
    coverImage: "9780134092669-L.jpg",
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Making Embedded Systems",
    author: "Elecia White",
    url: "https://example.com/book/embedded",
    coverImage: "9781449302146-L.jpg",
    category: CategoryLookup.EMBEDDED_SYSTEMS
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    url: "https://example.com/book/clean-architecture",
    coverImage: "9780134494166-L.jpg",
    category: CategoryLookup.APP_DEVELOPMENT
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "You Don't Know JS Yet: Get Started",
    author: "Kyle Simpson",
    url: "https://example.com/book/ydkjs",
    coverImage: "9781673053138-L.jpg",
    category: CategoryLookup.WEB_DEVELOPMENT
  },

  // VIDEOS
  {
    type: resourceTypeLookup.VIDEO,
    title: "Systems Programming Video",
    author: "Clueless Code Learning",
    url: SAMPLE_VIDEO_URL,
    coverImage: "maxresdefault0.jpg",
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Embedded Systems Video",
    author: "Clueless Code Learning",
    url: SAMPLE_VIDEO_URL,
    coverImage: "maxresdefault1.jpg",
    category: CategoryLookup.EMBEDDED_SYSTEMS
  }
];


async function seedResources() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Resource.deleteMany({});
    console.log('Old resources removed');

    await Resource.insertMany(resources);
    console.log('Resources seeded successfully');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedResources();