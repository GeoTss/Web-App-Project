import { FilterLookup, FilterInputType, createFilterSection, addFiltersChangeCallback, FilterSectionManager, FiltersController } from "./modules/filter-section.js"
import { category_t } from "./modules/category-utils.js";

// book data
const books = [
    {
        title: "Effective Modern C++",
        author: "Scott Meyers",
        coverUrl: "https://m.media-amazon.com/images/I/41-sN-mzwKL.jpg",
        rating: 4.9,
        tagClass: "tag-cpp",
        tagName: "C++",
        badge: "Best Seller"
    },
    {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        coverUrl: "https://eloquentjavascript.net/img/cover.jpg",
        rating: 4.7,
        tagClass: "tag-js",
        tagName: "JavaScript",
        badge: "Free"
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        coverUrl: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        rating: 4.6,
        tagClass: "tag-cpp",
        tagName: "General",
        badge: "Classic"
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

    return bookCardElem;
}

var filterManagers = [
    // new FilterSectionManager(FilterLookup.RATING, "rating"),
    new FilterSectionManager(FilterLookup.CATEGORY, "category", FilterInputType.CHECKBOX)
];

var filterController = new FiltersController(filterManagers);

window.onload = () => {
    createFilterSection(filterManagers);

    // filterController.populateManager(FilterLookup.RATING, Object.values(difficulty_t));
    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));

    let content = document.getElementById("content-wrapper");

    books.forEach((book) => {
        content.appendChild(createBookCard(book));
    })
}