import { category_t, difficulty_t } from "../../modules/category-utils.js";
import {
  FilterLookup,
  FilterInputType,
  createFilterSection,
  addFiltersChangeCallback,
  FilterSectionManager,
  FiltersController
} from "../../modules/filter-section.js";

import { cardsList } from "../../data/courses-cards.js";

let filterController;

const filterManagers = [
  new FilterSectionManager(
    FilterLookup.DIFFICULTY,
    "difficulty",
    FilterInputType.CHECKBOX,
    (itemInfo, checkmarkElem) => {
      checkmarkElem.style.setProperty("--box-color", itemInfo.baseColor);
    }
  ),
  new FilterSectionManager(
    FilterLookup.CATEGORY,
    "category",
    FilterInputType.CHECKBOX
  )
];

function createCardElem(cardInfo) {
  const cardElem = document.createElement("div");
  cardElem.classList.add("course-card");

  const cardBanner = document.createElement("div");
  cardBanner.classList.add("card-banner");
  cardBanner.style.background =
    difficulty_t[cardInfo.difficultyLookupId].bannerColor;

  const difficultyBadge = document.createElement("span");
  difficultyBadge.classList.add("difficulty-badge");
  difficultyBadge.textContent =
    difficulty_t[cardInfo.difficultyLookupId].name;

  cardBanner.appendChild(difficultyBadge);
  cardElem.appendChild(cardBanner);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const courseTitle = document.createElement("div");
  courseTitle.classList.add("course-title");
  courseTitle.textContent = cardInfo.langName;

  const courseDesc = document.createElement("p");
  courseDesc.classList.add("course-desc");
  courseDesc.innerHTML = cardInfo.description;

  cardContent.append(courseTitle, courseDesc);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");

  const cardBtn = document.createElement("button");
  cardBtn.classList.add("card-btn");
  cardBtn.textContent = `Learn ${cardInfo.langName}`;

  cardBtn.addEventListener("click", () => {
    const courseName = cardInfo.langName
      .toLowerCase()
      .replaceAll("+", "p");
    window.history.pushState({}, "", `/course/${courseName}`);
    window.dispatchEvent(new Event("popstate"));
  });

  cardFooter.appendChild(cardBtn);

  cardElem.append(cardContent, cardFooter);
  return cardElem;
}

function createCategoryContainer(categoryId) {
  const categoryInfo = category_t[categoryId];

  const categoryElem = document.createElement("div");
  categoryElem.classList.add("category-panel");

  const header = document.createElement("div");
  header.classList.add("category-header");
  header.textContent = categoryInfo.name;

  const cardsContainer = document.createElement("div");
  cardsContainer.id = `categoryId-${categoryId}`;
  cardsContainer.classList.add("card-container");

  categoryElem.append(header, cardsContainer);
  return categoryElem;
}

function populateCategoryLessonContent() {
  const content = document.getElementById("content-wrapper");
  content.replaceChildren();

  const visibleCards =
    filterController.getSatisfyingElements(cardsList);

  const categoryIds = new Set(
    visibleCards.map(card => card.categoryLookupId)
  );

  categoryIds.forEach(categoryId => {
    content.appendChild(createCategoryContainer(categoryId));
  });

  visibleCards.forEach(card => {
    document
      .getElementById(`categoryId-${card.categoryLookupId}`)
      .appendChild(createCardElem(card));
  });
}

function applyFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("filters");
  if (!encoded) return;

  const filtersData = JSON.parse(encoded);

  Object.keys(filtersData.managersMap).forEach(key => {
    if (filterController.managersMap[key]) {
      filterController.managersMap[key].filterStrat.filters =
        filtersData.managersMap[key].filterStrat.filters;
    }
  });

  filterController.updateFiltersInputElems();
}

export function initCourses() {
  filterController = new FiltersController(filterManagers);

  createFilterSection(filterManagers);

  filterController.populateManager(
    FilterLookup.DIFFICULTY,
    Object.values(difficulty_t)
  );

  filterController.populateManager(
    FilterLookup.CATEGORY,
    Object.values(category_t)
  );

  addFiltersChangeCallback(populateCategoryLessonContent);

  applyFiltersFromUrl();
  populateCategoryLessonContent();
}

