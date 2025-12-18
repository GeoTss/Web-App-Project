import { FilterLookup, FilterInputType, createFilterSection, addFiltersChangeCallback, FilterSectionManager, FiltersController } from "../modules/filter-section.js"
import { CategoryLookup, category_t, resourceTypeLookup, resourceType_t } from "../modules/category-utils.js";

function getCategoryTag(id) {
    const cat = category_t[id];
    return {
        categoryLookupId: id,
        tagName: cat.name,
        tagColor: cat.color,
        tagClass: `tag-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    };
}

const path = "./assets/img/courses-videos/";
const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const resources = [
    // --- BOOKS ---
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Systems: A Programmer's Perspective",
        author: "Randal E. Bryant",
        coverUrl: `${path}9780134092669-L.jpg`,
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Making Embedded Systems",
        author: "Elecia White",
        coverUrl: `${path}9781449302146-L.jpg`,
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        coverUrl: `${path}9780134494166-L.jpg`,
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "You Don't Know JS Yet: Get Started",
        author: "Kyle Simpson",
        coverUrl: `${path}9781673053138-L.jpg`,
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        coverUrl: `${path}9781491957660-L.jpg`,
        rating: 4.6,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        coverUrl: `${path}9780134610993-L.jpg`,
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Networking: A Top-Down Approach",
        author: "James Kurose",
        coverUrl: `${path}9780136681557-L.jpg`,
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Web Application Hacker's Handbook",
        author: "Dafydd Stuttard",
        coverUrl: `${path}9781118026472-L.jpg`,
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Cloud Native Patterns",
        author: "Cornelia Davis",
        coverUrl: `${path}9781617294297-L.jpg`,
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CLOUD_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Phoenix Project",
        author: "Gene Kim",
        coverUrl: `${path}9780988262591-L.jpg`,
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.DEVOPS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Real-Time Rendering",
        author: "Tomas Akenine-Möller",
        coverUrl: `${path}9781138627000-L.jpg`,
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.GRAPHICS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Game Programming Patterns",
        author: "Robert Nystrom",
        coverUrl: `${path}9780990582908-L.jpg`,
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.GAME_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        coverUrl: `${path}9781449373320-L.jpg`,
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.DATABASE_MANAGEMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Programming Quantum Computers",
        author: "Eric R. Johnston",
        coverUrl: `${path}9781492039686-L.jpg`,
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.QUANTUM_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Mastering Bitcoin",
        author: "Andreas M. Antonopoulos",
        coverUrl: `${path}9781491954386-L.jpg`,
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.BLOCKCHAIN)
    },

    // --- VIDEOS ---
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "CppCon: Back to Basics: Move Semantics",
        channel: "CppCon",
        coverUrl: `${path}maxresdefault0.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:02:00",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "How Computer Memory Works",
        channel: "Branch Education",
        coverUrl: `${path}maxresdefault1.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "28:15",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "What the heck is the event loop anyway?",
        channel: "JSConf",
        coverUrl: `${path}maxresdefault2.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "26:52",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Clean Code - Uncle Bob",
        channel: "Lesson 1",
        coverUrl: `${path}maxresdefault3.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:00:00",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "But what is a Neural Network?",
        channel: "3Blue1Brown",
        coverUrl: `${path}maxresdefault4.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "19:13",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Data Science for Beginners",
        channel: "Microsoft Developer",
        coverUrl: `${path}maxresdefault5.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:20:00",
        rating: 4.6,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    // {
    //     resourceTypeLookupId: resourceTypeLookup.VIDEO,
    //     title: "TempleOS: An Operating System for the Programmer God",
    //     channel: "Fireship",
    //     coverUrl: `${path}maxresdefault.jpg`,
    //     videoSrc: "https://youtu.be/lzYIkVxnDlo?si=NvaQWCYaPagixM8H",
    //     duration: "2:08",
    //     rating: 4.9,
    //     ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    // },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Cross Site Scripting (XSS)",
        channel: "Computerphile",
        coverUrl: `${path}maxresdefault6.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "9:20",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Map of Computer Science",
        channel: "Domain of Science",
        coverUrl: `${path}maxresdefault7.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "10:55",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    }
];