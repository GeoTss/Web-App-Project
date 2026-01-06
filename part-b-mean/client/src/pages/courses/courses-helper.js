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

async function createCardElem(cardInfo) {
    console.log(cardInfo);

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

    let dropEnrollElem = null;

    await fetch(`/api/enrollments/progress/${cardInfo._id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        if (!response.ok)
            return null;
        return response.json();
    }).then((data) => {
        console.log(data);
        if (!data)
            return;

        const progressLabel = document.createElement("div");
        progressLabel.classList.add("progress-label");

        const { percentageCompleted } = data;
        progressLabel.textContent = `${percentageCompleted}% Complete`;

        const progressContainer = document.createElement("div");
        progressContainer.classList.add("progress-container");

        const progressFill = document.createElement("div");
        progressFill.classList.add("progress-fill");
        progressFill.style.width = `${percentageCompleted}%`;
        progressFill.style.background = difficulty_t[cardInfo.difficulty].bannerColor;

        progressContainer.appendChild(progressFill);

        cardContent.append(progressLabel, progressContainer);

        dropEnrollElem = document.createElement("button");
        dropEnrollElem.classList.add("card-btn");
        dropEnrollElem.textContent = "Drop Enroll";
        dropEnrollElem.style.backgroundColor = "red";

        dropEnrollElem.addEventListener("click", async () => {

            fetch("/api/enrollments/enroll", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    courseId: cardInfo._id
                })
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Error during deleting enrollment");
                }
                window.history.pushState({}, '', '/courses');
                window.dispatchEvent(new PopStateEvent('popstate'));
            }).catch((error) => {
                console.error(error);
            });
        });
    });

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
    if (dropEnrollElem)
        cardFooter.appendChild(dropEnrollElem);

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

    let categoriesList = filterController.managersMap[FilterLookup.CATEGORY].getFiltersList();
    let difficultyList = filterController.managersMap[FilterLookup.DIFFICULTY].getFiltersList();

    console.log(`Categories: ${categoriesList}`);
    console.log(`Difficulties: ${difficultyList}`);

    fetch('/api/courses/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            category: categoriesList,
            difficulty: difficultyList
        })
    }).then((response) => {
        if (!response.ok)
            return null;
        return response.json();
    }).then((data) => {
        console.log(data)
        if (!data)
            return;

        let { courseList: cardsList } = data;

        const categoryIds = new Set(
            cardsList.map(card => card.category)
        );

        categoryIds.forEach(categoryId => {
            content.appendChild(createCategoryContainer(categoryId));
        });

        cardsList.forEach(async card => {
            document
                .getElementById(`categoryId-${card.category}`)
                .appendChild(await createCardElem(card));
        });
    })
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

    fetch('/api/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok)
            return null;
        return response.json();
    }).then((data) => {
        console.log("Data: ", data);
        let preferableCategories = [];
        let preferableDifficulties = [];

        if (data && data.preferences) {
            preferableCategories = data.preferences.categories;
            preferableDifficulties = data.preferences.difficulties;
        }
        console.log(`Preferable categories: ${preferableCategories}`);
        console.log(`Preferable diff: ${preferableDifficulties}`);

        filterController.populateManager(
            FilterLookup.DIFFICULTY,
            Object.values(difficulty_t),
            preferableDifficulties
        );

        filterController.populateManager(
            FilterLookup.CATEGORY,
            Object.values(category_t),
            preferableCategories
        );

        addFiltersChangeCallback(populateCategoryLessonContent);
        // applyFiltersFromUrl();
        populateCategoryLessonContent();
    })
}

