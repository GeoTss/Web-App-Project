import { FilterLookup, FilterInputType, createFilterSection, addFiltersChangeCallback, FilterSectionManager, FiltersController } from "../modules/filter-section.js"
import { CategoryLookup, category_t, resourceTypeLookup, resourceType_t } from "../modules/category-utils.js";
import { resources } from "../data/books.js";


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

function createVideoElem(videoInfo) {
    let videoElem = document.createElement("div");
    videoElem.classList.add("video-card");

    let thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.classList.add("video-wrapper");

    let coverElem = document.createElement("video");
    coverElem.classList.add("thumbnail-video");
    coverElem.controls = true;
    coverElem.poster = videoInfo.coverUrl;
    coverElem.playsInline = true;

    let sourceVideo = document.createElement("source");
    sourceVideo.src = videoInfo.videoSrc;
    sourceVideo.type = "video/mp4";

    coverElem.appendChild(sourceVideo);

    thumbnailWrapper.appendChild(coverElem);

    videoElem.appendChild(thumbnailWrapper);

    let videoTagElem = document.createElement("div");
    videoTagElem.classList.add("book-tag");
    videoTagElem.style.background = videoInfo.tagColor;
    videoTagElem.textContent = videoInfo.tagName;

    videoElem.appendChild(videoTagElem);

    return videoElem;
}

function createResourceElem(resourceInfo) {
    if (resourceInfo.resourceTypeLookupId === resourceTypeLookup.BOOK) {
        return createBookCard(resourceInfo);
    } else if (resourceInfo.resourceTypeLookupId === resourceTypeLookup.VIDEO) {
        return createVideoElem(resourceInfo);
    }
}

var filterManagers = [
    new FilterSectionManager(FilterLookup.RESOURCE_TYPE, "resource type", FilterInputType.CHECKBOX),
    new FilterSectionManager(FilterLookup.CATEGORY, "category", FilterInputType.CHECKBOX)
];

var filterController = new FiltersController(filterManagers);

function populateBookContainer() {
    let content = document.getElementById("content-wrapper");
    content.replaceChildren();

    let filters = filterController.getActiveFilterChain();
    console.log(filters);

    let visibleCards = filterController.getSatisfyingElements(resources);
    console.log(`visibleCards: ${visibleCards}`);

    visibleCards.forEach((resourceInfo) => {
        content.appendChild(createResourceElem(resourceInfo));
    })
}

window.onload = () => {
    createFilterSection(filterManagers);

    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));
    filterController.populateManager(FilterLookup.RESOURCE_TYPE, Object.values(resourceType_t));

    addFiltersChangeCallback(populateBookContainer);

    let content = document.getElementById("content-wrapper");

    resources.forEach((resourceInfo) => {
        content.appendChild(createResourceElem(resourceInfo));
    })
}