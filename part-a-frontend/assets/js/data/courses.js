import { difficulty_t, codeMenuCard, DifficultyLookup } from "./modules/cards-utils.js";
import { category_t, CategoryLookup } from "./modules/category-utils.js";
import { FilterLookup, FilterInputType, createFilterSection, addFiltersChangeCallback, FilterSectionManager, FiltersController } from "./modules/filter-section.js"

let cardsList = [
    new codeMenuCard(
        "C++",
        "Perfect language",
        DifficultyLookup.HARD,
        CategoryLookup.SYSTEMS_PROGRAMMING
    ),
    new codeMenuCard(
        "Python",
        "Meh",
        DifficultyLookup.EASY,
        CategoryLookup.DATA_SCIENCE
    ),
    new codeMenuCard(
        "Javascript",
        "JSON slander",
        DifficultyLookup.EASY,
        CategoryLookup.WEB_DEVELOPMENT
    ),
    new codeMenuCard(
        "Rust",
        "Compiler show compassion plz",
        DifficultyLookup.HARD,
        CategoryLookup.SYSTEMS_PROGRAMMING
    ),
    new codeMenuCard(
        "Assembly",
        "Rollercoaster simulation?",
        DifficultyLookup.DEMON,
        CategoryLookup.SYSTEMS_PROGRAMMING
    ),
    new codeMenuCard(
        "OpenGL",
        "Triangles everywhere",
        DifficultyLookup.HARD,
        CategoryLookup.GRAPHICS_PROGRAMMING
    ),
    new codeMenuCard(
        "Vulkan",
        "Couldn't be harder than OpenGL right?",
        DifficultyLookup.DEMON,
        CategoryLookup.GRAPHICS_PROGRAMMING
    ),
    new codeMenuCard(
        "TensorFlow",
        "Teaching rocks to think",
        DifficultyLookup.HARD,
        CategoryLookup.ARTIFICIAL_INTELLIGENCE
    ),
    new codeMenuCard(
        "Arduino",
        "Beep boop lights go flash",
        DifficultyLookup.MEDIUM,
        CategoryLookup.EMBEDDED_SYSTEMS
    ),
    new codeMenuCard(
        "AWS",
        "Someone else's computer",
        DifficultyLookup.MEDIUM,
        CategoryLookup.CLOUD_COMPUTING
    )
];

var filterManagers = [
    new FilterSectionManager(FilterLookup.DIFFICULTY, "difficulty", FilterInputType.CHECKBOX, (itemInfo, checkmarkElem) => {
        checkmarkElem.style.setProperty("--box-color", itemInfo.baseColor);
    }),
    new FilterSectionManager(FilterLookup.CATEGORY, "category", FilterInputType.CHECKBOX)
];

var filterController = new FiltersController(filterManagers);

function createCardElem(cardInfo) {

    let cardElem = document.createElement("div");
    cardElem.classList.add("course-card");

    let cardBanner = document.createElement("div");
    cardBanner.classList.add("card-banner");
    cardBanner.style.background = difficulty_t[cardInfo.difficultyLookupId].bannerColor;

    let difficultyBadge = document.createElement("span");
    difficultyBadge.classList.add("difficulty-badge");
    difficultyBadge.textContent = difficulty_t[cardInfo.difficultyLookupId].name;

    cardBanner.appendChild(difficultyBadge);

    cardElem.appendChild(cardBanner);

    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    let courseTitle = document.createElement("div");
    courseTitle.classList.add("course-title");
    courseTitle.textContent = cardInfo.langName;
    cardContent.appendChild(courseTitle);

    let courseDesc = document.createElement("p");
    courseDesc.innerHTML = cardInfo.description;
    courseDesc.classList.add("course-desc");

    cardContent.appendChild(courseDesc);

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    let cardBtn = document.createElement("button");
    cardBtn.classList.add("card-btn");
    cardBtn.textContent = `Learn ${cardInfo.langName}`

    cardBtn.addEventListener("click", () => {
        let courseName = cardInfo.langName;

        courseName = courseName.toLowerCase().replaceAll("+", "p");
        const coursePageUrl = `course-details.html?course=${courseName}`;
        window.location.href = coursePageUrl;
    });

    cardFooter.appendChild(cardBtn);

    cardElem.appendChild(cardContent);
    cardElem.appendChild(cardFooter);

    return cardElem;
}

function appendCategoryContainer(card) {
    let cardContainerElem = document.getElementById(`categoryId-${card.categoryLookupId}`);
    cardContainerElem.appendChild(createCardElem(card));
}

function createCategoryContainer(categoryId) {

    let categoryInfo = category_t[categoryId];

    let categoryElem = document.createElement("div");
    categoryElem.classList.add("category-panel");

    let categoryHeader = document.createElement("div");
    categoryHeader.classList.add("category-header");
    categoryHeader.textContent = categoryInfo.name;

    categoryElem.appendChild(categoryHeader);

    let cardContainerElem = document.createElement("div");
    cardContainerElem.id = `categoryId-${categoryId}`
    cardContainerElem.classList.add("card-container");

    categoryElem.appendChild(cardContainerElem);

    return categoryElem;
}

function populateCategoryLessonContent() {
    let content = document.getElementById("content-wrapper");
    content.replaceChildren();

    let filters = filterController.getActiveFilterChain();
    console.log(filters);

    let visibleCards = filterController.getSatisfyingElements(cardsList);
    console.log(`visibleCards: ${visibleCards}`);

    let categoryIds = new Set(visibleCards.map((card) => card.categoryLookupId));

    console.log(categoryIds);

    categoryIds.forEach((category) => {
        content.appendChild(createCategoryContainer(category))
    });
    visibleCards.forEach((card) => appendCategoryContainer(card));
}

window.onload = () => {
    createFilterSection(filterManagers);
    console.log(filterManagers);

    filterController.populateManager(FilterLookup.DIFFICULTY, Object.values(difficulty_t));
    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));

    addFiltersChangeCallback(populateCategoryLessonContent);

    populateCategoryLessonContent();
};