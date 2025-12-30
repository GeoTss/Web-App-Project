import {
  FilterLookup,
  FilterInputType,
  createFilterSection,
  addFiltersChangeCallback,
  FilterSectionManager,
  FiltersController
} from "../../modules/filter-section.js";

import {
  category_t,
  resourceTypeLookup,
  resourceType_t
} from "../../modules/category-utils.js";

import { resources } from "./books-videos-content.js";

let filterController;

function createBookCard(bookInfo) {
  const bookCardElem = document.createElement("div");
  bookCardElem.classList.add("book-card");

  const cover = document.createElement("div");
  cover.classList.add("book-card-cover");

  const img = document.createElement("img");
  img.src = bookInfo.coverUrl;
  img.classList.add("book-image");

  cover.appendChild(img);
  bookCardElem.appendChild(cover);

  const separator = document.createElement("span");
  separator.classList.add("book-separator");
  bookCardElem.appendChild(separator);

  const tag = document.createElement("div");
  tag.classList.add("book-tag");
  tag.style.background = bookInfo.tagColor;
  tag.textContent = bookInfo.tagName;
  bookCardElem.appendChild(tag);

  const info = document.createElement("div");
  info.classList.add("book-info");

  const title = document.createElement("h3");
  title.classList.add("book-title");
  title.textContent = bookInfo.title;

  const author = document.createElement("div");
  author.classList.add("book-author");
  author.textContent = "by " + bookInfo.author;

  info.append(title, author);
  bookCardElem.appendChild(info);

  bookCardElem.appendChild(separator.cloneNode());

  return bookCardElem;
}

function createVideoElem(videoInfo) {
  const videoElem = document.createElement("div");
  videoElem.classList.add("video-card");

  const wrapper = document.createElement("div");
  wrapper.classList.add("video-wrapper");

  const video = document.createElement("video");
  video.classList.add("thumbnail-video");
  video.controls = true;
  video.poster = videoInfo.coverUrl;
  video.playsInline = true;

  const source = document.createElement("source");
  source.src = videoInfo.videoSrc;
  source.type = "video/mp4";

  video.appendChild(source);
  wrapper.appendChild(video);
  videoElem.appendChild(wrapper);

  const tag = document.createElement("div");
  tag.classList.add("book-tag");
  tag.style.background = videoInfo.tagColor;
  tag.textContent = videoInfo.tagName;

  videoElem.appendChild(tag);

  return videoElem;
}

function createResourceElem(resourceInfo) {
  if (resourceInfo.resourceTypeLookupId === resourceTypeLookup.BOOK) {
    return createBookCard(resourceInfo);
  }
  if (resourceInfo.resourceTypeLookupId === resourceTypeLookup.VIDEO) {
    return createVideoElem(resourceInfo);
  }
}

function populateResources() {
  const content = document.getElementById("content-wrapper");
  content.replaceChildren();

  const visible = filterController.getSatisfyingElements(resources);
  visible.forEach(r => content.appendChild(createResourceElem(r)));
}

export function initBooksVideos() {
  const filterManagers = [
    new FilterSectionManager(
      FilterLookup.RESOURCE_TYPE,
      "resource type",
      FilterInputType.CHECKBOX
    ),
    new FilterSectionManager(
      FilterLookup.CATEGORY,
      "category",
      FilterInputType.CHECKBOX
    )
  ];

  filterController = new FiltersController(filterManagers);

  createFilterSection(filterManagers);

  filterController.populateManager(
    FilterLookup.CATEGORY,
    Object.values(category_t)
  );

  filterController.populateManager(
    FilterLookup.RESOURCE_TYPE,
    Object.values(resourceType_t)
  );

  addFiltersChangeCallback(populateResources);

  populateResources();
}
