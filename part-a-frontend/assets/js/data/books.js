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

const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const resources = [
    // --- BOOKS ---
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Systems: A Programmer's Perspective",
        author: "Randal E. Bryant",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134092669-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Making Embedded Systems",
        author: "Elecia White",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781449302146-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "You Don't Know JS Yet: Get Started",
        author: "Kyle Simpson",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781673053138-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781491957660-L.jpg",
        rating: 4.6,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Networking: A Top-Down Approach",
        author: "James Kurose",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780136681557-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Web Application Hacker's Handbook",
        author: "Dafydd Stuttard",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781118026472-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Cloud Native Patterns",
        author: "Cornelia Davis",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781617294297-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CLOUD_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Phoenix Project",
        author: "Gene Kim",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780988262591-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.DEVOPS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Real-Time Rendering",
        author: "Tomas Akenine-Möller",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781138627000-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.GRAPHICS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Game Programming Patterns",
        author: "Robert Nystrom",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780990582908-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.GAME_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.DATABASE_MANAGEMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Programming Quantum Computers",
        author: "Eric R. Johnston",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781492039686-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.QUANTUM_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Mastering Bitcoin",
        author: "Andreas M. Antonopoulos",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781491954386-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.BLOCKCHAIN)
    },

    // --- VIDEOS ---
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "CppCon: Back to Basics: Move Semantics",
        channel: "CppCon",
        coverUrl: "https://img.youtube.com/vi/St0MNEU5b0o/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:02:00",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "How Computer Memory Works",
        channel: "Branch Education",
        coverUrl: "https://img.youtube.com/vi/p3q5zWCw8J4/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "28:15",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "What the heck is the event loop anyway?",
        channel: "JSConf",
        coverUrl: "https://img.youtube.com/vi/8aGhZQkoFbQ/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "26:52",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Clean Code - Uncle Bob",
        channel: "Lesson 1",
        coverUrl: "https://img.youtube.com/vi/7EmboKQH8lM/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:00:00",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "But what is a Neural Network?",
        channel: "3Blue1Brown",
        coverUrl: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "19:13",
        rating: 5.0,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Data Science for Beginners",
        channel: "Microsoft Developer",
        coverUrl: "https://img.youtube.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "1:20:00",
        rating: 4.6,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Kubernetes Explained in 100 Seconds",
        channel: "Fireship",
        coverUrl: "https://img.youtube.com/vi/Pzt55h_3YJI/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "2:08",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.DEVOPS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Cross Site Scripting (XSS)",
        channel: "Computerphile",
        coverUrl: "https://img.youtube.com/vi/L5l9lSnNMxg/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "9:20",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        title: "Map of Computer Science",
        channel: "Domain of Science",
        coverUrl: "https://img.youtube.com/vi/SzJ46YA_RaA/maxresdefault.jpg",
        videoSrc: SAMPLE_VIDEO_URL,
        duration: "10:55",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    }
];