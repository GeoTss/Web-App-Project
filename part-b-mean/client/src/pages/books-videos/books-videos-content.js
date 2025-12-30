import { CategoryLookup, category_t, resourceTypeLookup } from "../../modules/category-utils.js";

function getCategoryTag(id) {
    const cat = category_t[id];
    return {
        categoryLookupId: id,
        tagName: cat.name,
        tagColor: cat.color,
        tagClass: `tag-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    };
}

const path = "imagesBV/";
const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const resources = [
    // --- BOOKS ---
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Systems: A Programmer's Perspective",
        author: "Randal E. Bryant",
        coverUrl: `${path}9780134092669-L.jpg`,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Making Embedded Systems",
        author: "Elecia White",
        coverUrl: `${path}9781449302146-L.jpg`,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        coverUrl: `${path}9780134494166-L.jpg`,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "You Don't Know JS Yet: Get Started",
        author: "Kyle Simpson",
        coverUrl: `${path}9781673053138-L.jpg`,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        coverUrl: `${path}9781491957660-L.jpg`,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        coverUrl: `${path}9780134610993-L.jpg`,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Computer Networking: A Top-Down Approach",
        author: "James Kurose",
        coverUrl: `${path}9780136681557-L.jpg`,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Web Application Hacker's Handbook",
        author: "Dafydd Stuttard",
        coverUrl: `${path}9781118026472-L.jpg`,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Cloud Native Patterns",
        author: "Cornelia Davis",
        coverUrl: `${path}9781617294297-L.jpg`,
        ...getCategoryTag(CategoryLookup.CLOUD_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "The Phoenix Project",
        author: "Gene Kim",
        coverUrl: `${path}9780988262591-L.jpg`,
        ...getCategoryTag(CategoryLookup.DEVOPS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Real-Time Rendering",
        author: "Tomas Akenine-Möller",
        coverUrl: `${path}9781138627000-L.jpg`,
        ...getCategoryTag(CategoryLookup.GRAPHICS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Game Programming Patterns",
        author: "Robert Nystrom",
        coverUrl: `${path}9780990582908-L.jpg`,
        ...getCategoryTag(CategoryLookup.GAME_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        coverUrl: `${path}9781449373320-L.jpg`,
        ...getCategoryTag(CategoryLookup.DATABASE_MANAGEMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Programming Quantum Computers",
        author: "Eric R. Johnston",
        coverUrl: `${path}9781492039686-L.jpg`,
        ...getCategoryTag(CategoryLookup.QUANTUM_COMPUTING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.BOOK,
        title: "Mastering Bitcoin",
        author: "Andreas M. Antonopoulos",
        coverUrl: `${path}9781491954386-L.jpg`,
        ...getCategoryTag(CategoryLookup.BLOCKCHAIN)
    },

    // --- VIDEOS ---
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault0.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault1.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault2.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault3.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault4.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault5.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault6.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        resourceTypeLookupId: resourceTypeLookup.VIDEO,
        coverUrl: `${path}maxresdefault7.jpg`,
        videoSrc: SAMPLE_VIDEO_URL,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    }
];