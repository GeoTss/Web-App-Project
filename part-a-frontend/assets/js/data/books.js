import { FilterLookup, FilterInputType, createFilterSection, addFiltersChangeCallback, FilterSectionManager, FiltersController } from "./modules/filter-section.js"
import { CategoryLookup, category_t } from "./modules/category-utils.js";

function getCategoryTag(id) {
    const cat = category_t[id];
    return {
        categoryLookupId: id,
        tagName: cat.name,
        tagColor: cat.color,
        tagClass: `tag-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    };
}

export const books = [
    // --- SYSTEMS & CORE ---
    {
        title: "Computer Systems: A Programmer's Perspective",
        author: "Randal E. Bryant",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134092669-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.SYSTEMS_PROGRAMMING)
    },
    {
        title: "Making Embedded Systems",
        author: "Elecia White",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781449302146-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.EMBEDDED_SYSTEMS)
    },

    // --- WEB & APP ---
    {
        title: "Clean Architecture",
        author: "Robert C. Martin",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.APP_DEVELOPMENT)
    },
    {
        title: "You Don't Know JS Yet: Get Started",
        author: "Kyle Simpson",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781673053138-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.WEB_DEVELOPMENT)
    },

    // --- DATA & AI ---
    {
        title: "Python for Data Analysis",
        author: "Wes McKinney",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781491957660-L.jpg",
        rating: 4.6,
        ...getCategoryTag(CategoryLookup.DATA_SCIENCE)
    },
    {
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.ARTIFICIAL_INTELLIGENCE)
    },

    // --- INFRASTRUCTURE & SECURITY ---
    {
        title: "Computer Networking: A Top-Down Approach",
        author: "James Kurose",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780136681557-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.NETWORKS)
    },
    {
        title: "The Web Application Hacker's Handbook",
        author: "Dafydd Stuttard",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781118026472-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CYBERSECURITY)
    },
    {
        title: "Cloud Native Patterns",
        author: "Cornelia Davis",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781617294297-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.CLOUD_COMPUTING)
    },
    {
        title: "The Phoenix Project",
        author: "Gene Kim",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780988262591-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.DEVOPS)
    },

    // --- SPECIALIZED ---
    {
        title: "Real-Time Rendering",
        author: "Tomas Akenine-Möller",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781138627000-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.GRAPHICS_PROGRAMMING)
    },
    {
        title: "Game Programming Patterns",
        author: "Robert Nystrom",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780990582908-L.jpg",
        rating: 4.8,
        ...getCategoryTag(CategoryLookup.GAME_DEVELOPMENT)
    },
    {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
        rating: 4.9,
        ...getCategoryTag(CategoryLookup.DATABASE_MANAGEMENT)
    },
    {
        title: "Programming Quantum Computers",
        author: "Eric R. Johnston",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781492039686-L.jpg",
        rating: 4.5,
        ...getCategoryTag(CategoryLookup.QUANTUM_COMPUTING)
    },
    {
        title: "Mastering Bitcoin",
        author: "Andreas M. Antonopoulos",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781491954386-L.jpg",
        rating: 4.7,
        ...getCategoryTag(CategoryLookup.BLOCKCHAIN)
    }
];

function createBookCard(bookInfo) {
    let bookCardElem = document.createElement("div");
    bookCardElem.classList.add("book-card");

    let bookCardCoverElem = document.createElement("div");
    bookCardCoverElem.classList.add("book-card-cover");

    let imgElem = document.createElement("img");

    imgElem.src = bookInfo.coverUrl;
    imgElem.classList.add("book-image");

    bookCardCoverElem.appendChild(imgElem);

    bookCardElem.appendChild(bookCardCoverElem);

    let separator = document.createElement("span");
    separator.classList.add("book-separator");

    bookCardElem.appendChild(separator);

    let bookTagElem = document.createElement("div");
    bookTagElem.classList.add("book-tag");
    bookTagElem.style.background = bookInfo.tagColor;
    bookTagElem.textContent = bookInfo.tagName;

    bookCardElem.appendChild(bookTagElem);

    let bookInfoElem = document.createElement("div");
    bookInfoElem.classList.add("book-info");

    let bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = bookInfo.title;

    bookInfoElem.appendChild(bookTitle);

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = "by " + bookInfo.author;

    bookInfoElem.appendChild(bookAuthor);

    bookCardElem.appendChild(bookInfoElem);

    separator = document.createElement("span");
    separator.classList.add("book-separator");

    bookCardElem.appendChild(separator);

    return bookCardElem;
}

var filterManagers = [
    // new FilterSectionManager(FilterLookup.RATING, "rating", FilterInputType.RANGE),
    new FilterSectionManager(FilterLookup.CATEGORY, "category", FilterInputType.CHECKBOX)
];

var filterController = new FiltersController(filterManagers);

function populateBookContainer() {
    let content = document.getElementById("content-wrapper");
    content.replaceChildren();

    let filters = filterController.getActiveFilterChain();
    console.log(filters);

    let visibleCards = filterController.getSatisfyingElements(books);
    console.log(`visibleCards: ${visibleCards}`);

    let categoryIds = new Set(visibleCards.map((card) => card.categoryLookupId));

    console.log(categoryIds);

    visibleCards.forEach((book) => {
        content.appendChild(createBookCard(book));
    })
}

window.onload = () => {
    createFilterSection(filterManagers);

    // filterController.populateManager(FilterLookup.RATING, Object.values(difficulty_t));
    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));

    addFiltersChangeCallback(populateBookContainer);

    let content = document.getElementById("content-wrapper");

    books.forEach((book) => {
        content.appendChild(createBookCard(book));
    })
}