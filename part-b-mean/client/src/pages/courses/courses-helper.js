import { category_t, difficulty_t } from "../../modules/category-utils.js";
import {
    FilterLookup,
    FilterInputType,
    createFilterSection,
    addFiltersChangeCallback,
    FilterSectionManager,
    FiltersController
} from "../../modules/filter-section.js";

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
        difficulty_t[cardInfo.difficulty].bannerColor;

    const difficultyBadge = document.createElement("span");
    difficultyBadge.classList.add("difficulty-badge");
    difficultyBadge.textContent =
        difficulty_t[cardInfo.difficulty].name;

    cardBanner.appendChild(difficultyBadge);
    cardElem.appendChild(cardBanner);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const courseTitle = document.createElement("div");
    courseTitle.classList.add("course-title");
    courseTitle.textContent = cardInfo.title;

    const courseDesc = document.createElement("p");
    courseDesc.classList.add("course-desc");
    courseDesc.innerHTML = cardInfo.description;

    cardContent.append(courseTitle, courseDesc);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const cardBtn = document.createElement("button");
    cardBtn.classList.add("card-btn");
    cardBtn.textContent = `Learn ${cardInfo.title}`;

    cardBtn.addEventListener("click", async () => {

        let response = await fetch(`/api/courses/${cardInfo._id}/details`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(response);

        if (response.status === 404) {
            console.log("Course details not found");
            return;
        }

        response = await fetch('/api/enrollments/enroll', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                courseId: cardInfo._id
            })
        });

        if (response.status !== 201) {
            console.log("Problem during enrolling!");
            return;
        }
        window.history.pushState(data, "", `/course-details`);
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

async function populateCategoryLessonContent() {
    const content = document.getElementById("content-wrapper");
    content.replaceChildren();

    let categoriesList = filterController.managersMap[FilterLookup.CATEGORY].getFiltersList();
    let difficultyList = filterController.managersMap[FilterLookup.DIFFICULTY].getFiltersList();

    console.log(typeof ([0, 1, 2]) === typeof (categoriesList));

    console.log(categoriesList);
    console.log(difficultyList);

    let response = await fetch('/api/courses/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            category: categoriesList,
            difficulty: difficultyList
        })
    });

    let cardsList = await response.json();

    console.log(cardsList)

    const categoryIds = new Set(
        cardsList.map(card => card.category)
    );

    categoryIds.forEach(categoryId => {
        content.appendChild(createCategoryContainer(categoryId));
    });

    cardsList.forEach(card => {
        document
            .getElementById(`categoryId-${card.category}`)
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

