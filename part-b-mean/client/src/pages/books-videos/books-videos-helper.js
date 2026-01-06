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

let filterController;

function createBookCard(bookInfo) {

  const bookCardElem = document.createElement("div");
  bookCardElem.classList.add("book-card");

  const cover = document.createElement("div");
  cover.classList.add("book-card-cover");

  const img = document.createElement("img");
  img.classList.add("book-image");
  img.src = bookInfo.coverImage;

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

  info.appendChild(title);
  info.appendChild(author);
  bookCardElem.appendChild(info);

  bookCardElem.appendChild(separator.cloneNode());

  return bookCardElem;
}

function createVideoElem(videoInfo) {
  const videoElem = document.createElement("div");
  videoElem.classList.add("video-card");

  const wrapper = document.createElement("div");
  wrapper.classList.add("video-wrapper");

  wrapper.innerHTML = `<iframe class="thumbnail-video" 
    src="https://www.youtube.com/embed/${videoInfo.videoId}" 
    title="" 
    frameborder="0" 
    allow="accelerometer; 
    autoplay; clipboard-write; 
    encrypted-media; gyroscope; 
    picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>`

  // const video = document.createElement("video");
  // video.classList.add("thumbnail-video");
  // video.controls = true;
  // video.poster = videoInfo.coverImage;
  // video.playsInline = true;

  // const source = document.createElement("source");
  // source.src = videoInfo.url;
  // source.type = "video/mp4";

  // video.appendChild(source);
  // wrapper.appendChild(video);
  videoElem.appendChild(wrapper);

  const tag = document.createElement("div");
  tag.classList.add("book-tag");
  tag.style.background = videoInfo.tagColor;
  tag.textContent = videoInfo.tagName;

  videoElem.appendChild(tag);

  return videoElem;
}

function getCategoryTag(id) {
  const cat = category_t[id];
  return {
    tagName: cat.name,
    tagColor: cat.color,
    tagClass: `tag-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
  };
}

function createResourceElem(resourceInfo) {
  resourceInfo = {
    ...resourceInfo,
    ...getCategoryTag(resourceInfo.category)
  };

  if (resourceInfo.type === resourceTypeLookup.BOOK) {
    return createBookCard(resourceInfo);
  }
  if (resourceInfo.type === resourceTypeLookup.VIDEO) {
    return createVideoElem(resourceInfo);
  }
}

function populateResources() {
  const content = document.getElementById("content-wrapper");
  content.replaceChildren();

  let categoriesList = filterController.managersMap[FilterLookup.CATEGORY].getFiltersList();
  let typesList = filterController.managersMap[FilterLookup.RESOURCE_TYPE].getFiltersList();

  fetch('/api/resources/search', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: typesList,
      category: categoriesList
    })
  }).then((response) => {
    if (!response.ok)
      throw new Error('Failed to get resources');
    return response.json()
  }).then((data) => {
    let { resources } = data;
    console.log(resources);

    resources.forEach(r => content.appendChild(createResourceElem(r)));
  }).catch((error) => {
    console.error('Error fetching resources:', error);
  });

}

var preferableCategories = [];

function initializeFilters() {

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
    Object.values(category_t),
    preferableCategories
  );

  filterController.populateManager(
    FilterLookup.RESOURCE_TYPE,
    Object.values(resourceType_t),
    null
  );
}

export function initBooksVideos() {

  fetch('/api/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).then((data) => {
    if (data)
      preferableCategories = data.preferences.categories;

    let filterContainerElem = document.getElementById("filters-wrapper");
    if (filterContainerElem.childElementCount === 0)
      initializeFilters();

    addFiltersChangeCallback(populateResources);

    populateResources();

  }).catch((error) => {
    console.error('Error fetching profile info:', error);
  });


}
