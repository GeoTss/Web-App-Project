require('dotenv').config();
const Resource = require('../models/resource.model');
const { CategoryLookup, resourceTypeLookup, category_t } = require('../../client/src/modules/category-utils.js');

const connectDB  = require('../config/db.js');
const path = "imagesBV/";

const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const resources = [
  // BOOKS
  {
    type: resourceTypeLookup.BOOK,
    title: "Computer Systems: A Programmer's Perspective",
    author: "Randal E. Bryant",
    url: "https://example.com/book/csapp",
    coverImage: `${path}9780134092669-L.jpg`,
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Making Embedded Systems",
    author: "Elecia White",
    url: "https://example.com/book/embedded",
    coverImage: `${path}9781449302146-L.jpg`,
    category: CategoryLookup.EMBEDDED_SYSTEMS
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    url: "https://example.com/book/clean-architecture",
    coverImage: `${path}9780134494166-L.jpg`,
    category: CategoryLookup.APP_DEVELOPMENT
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "You Don't Know JS Yet: Get Started",
    author: "Kyle Simpson",
    url: "https://example.com/book/ydkjs",
    coverImage: `${path}9781673053138-L.jpg`,
    category: CategoryLookup.WEB_DEVELOPMENT
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    url: "https://example.com/book/python-data-analysis",
    coverImage: `${path}9781491957660-L.jpg`,
    category: CategoryLookup.DATA_SCIENCE
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    url: "https://example.com/book/artificial-intelligence",
    coverImage: `${path}9780134610993-L.jpg`,
    category: CategoryLookup.ARTIFICIAL_INTELLIGENCE
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Computer Networking: A Top-Down Approach",
    author: "James Kurose",
    url: "https://example.com/book/computer-networking",
    coverImage: `${path}9780136681557-L.jpg`,
    category: CategoryLookup.NETWORKS
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "The Web Application Hacker's Handbook",
    author: "Dafydd Stuttard",
    url: "https://example.com/book/web-application-hackers-handbook",
    coverImage: `${path}9781118026472-L.jpg`,
    category: CategoryLookup.CYBERSECURITY
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Cloud Native Patterns",
    author: "Cornelia Davis",
    url: "https://example.com/book/cloud-native-patterns",
    coverImage: `${path}9781617293623-L.jpg`,
    category: CategoryLookup.CLOUD_COMPUTING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "The Phoenix Project",
    author: "Gene Kim",
    url: "https://example.com/book/phoenix-project",
    coverImage: `${path}9781942788294-L.jpg`,
    category: CategoryLookup.CLOUD_COMPUTING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Real-Time Rendering",
    author: "Tomas Akenine-Möller",
    url: "https://example.com/book/real-time-rendering",
    coverImage: `${path}9781138627000-L.jpg`,
    category: CategoryLookup.GRAPHICS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Game Programming Patterns",
    author: "Robert Nystrom",
    url: "https://example.com/book/game-programming-patterns",
    coverImage: `${path}9780990582905-L.jpg`,
    category: CategoryLookup.GRAPHICS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    url: "https://example.com/book/designing-data-intensive-applications",
    coverImage: `${path}9781449373320-L.jpg`,
    category: CategoryLookup.DATA_SCIENCE
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Programming Quantum Computers",
    author: "Eric R. Johnston",
    url: "https://example.com/book/programming-quantum-computers",
    coverImage: `${path}9781492039686-L.jpg`,
    category: CategoryLookup.QUANTUM_COMPUTING
  },
  {
    type: resourceTypeLookup.BOOK,
    title: "Mastering Bitcoin",
    author: "Andreas M. Antonopoulos",
    url: "https://example.com/book/mastering-bitcoin",
    coverImage: `${path}9781491954386-L.jpg`,
    category: CategoryLookup.BLOCKCHAIN
  },

  // VIDEOS
  {
    type: resourceTypeLookup.VIDEO,
    title: "Programming with Schizophrenia: The Tragic Story of Terry A. Davis",
    videoId: "YMUhbIAA9-8",
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Embedded Systems Video",
    videoId: "3r1z5NDXU3s",
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Web Development Video",
    videoId: "ArkLSz-It0s",
    category: CategoryLookup.WEB_DEVELOPMENT
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "App Development Video",
    videoId: "CgdKYBqe6QA",
    category: CategoryLookup.APP_DEVELOPMENT
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Go back to cave",
    videoId: "g5yatQ80GVI",
    category: CategoryLookup.ARTIFICIAL_INTELLIGENCE
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Data Science Video",
    videoId: "ua-CiDNNj30",
    category: CategoryLookup.DATA_SCIENCE
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Cybersecurity Video",
    videoId: "9Wg6tiaar9M",
    category: CategoryLookup.CYBERSECURITY
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Networks Video",
    videoId: "_Z5RbmFcjjc",
    category: CategoryLookup.NETWORKS
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "RAGEBAIT",
    videoId: "tD5NrevFtbU",
    category: CategoryLookup.GRAPHICS_PROGRAMMING  
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "I HACK NUCLEAR REACTORS",
    videoId: "rhfniSrNXRs",
    category: CategoryLookup.SYSTEMS_PROGRAMMING
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Quantum Computing Video",
    videoId: "3hVXt9NYiJA",
    category: CategoryLookup.QUANTUM_COMPUTING
  },
  {
    type: resourceTypeLookup.VIDEO,
    title: "Blockchain Video",
    videoId: "-nMxwlqdl7I",
    category: CategoryLookup.BLOCKCHAIN
  }
];

(async () => {
    try {
      await connectDB();
      await Resource.deleteMany({});
      console.log('Old resources removed');

      await Resource.insertMany(resources);
      console.log('Resources seeded successfully');
      await Resource.deleteMany({});
      console.log('Old resources removed');
      await Resource.insertMany(resources);
      console.log('Resources seeded successfully');

      process.exit(0);
    } catch (err) {
      console.error('Seeding failed:', err);
      process.exit(1);
    }
})();
