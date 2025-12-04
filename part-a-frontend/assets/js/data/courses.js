import { difficulty_t, codeMenuCard, DifficultyLookup } from "./modules/cards-utils.js";
import { category_t, CategoryLookup, similarityGraph } from "./modules/category-similarity-graph.js";
import { ArrayFilterStrategy, FilterLookup, FiltersInfo_t, getVisibleElements } from "./modules/filter-section.js"

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

function createCourseButton(courseName) {
    let learn_button = document.createElement("button");
    learn_button.classList.add("card_learn_btn");
    learn_button.textContent = "Learn " + courseName;

    const buttonListener = () => {
        courseName = courseName.toLowerCase().replaceAll("+", "p");
        const coursePageUrl = `course-details.html?course=${courseName}`;
        window.location.href = coursePageUrl;
    };

    learn_button.addEventListener("click", buttonListener);

    return learn_button;
}

function createCardElem(cardInfo) {

    let cardElem = document.createElement("div");
    cardElem.classList.add("course-card");

    let cardBanner = document.createElement("div");
    cardBanner.classList.add("card-banner");
    cardBanner.style.background = difficulty_t[cardInfo.difficulty].bannerColor;

    let difficultyBadge = document.createElement("span");
    difficultyBadge.classList.add("difficulty-badge");
    difficultyBadge.textContent = difficulty_t[cardInfo.difficulty].name;

    cardBanner.appendChild(difficultyBadge);

    cardElem.appendChild(cardBanner);

    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    let courseTitle = document.createElement("div");
    courseTitle.classList.add("course-title");
    courseTitle.textContent = cardInfo.name;
    cardContent.appendChild(courseTitle);

    let courseDesc = document.createElement("p");
    courseDesc.innerHTML = cardInfo.description;
    courseDesc.classList.add("course-desc");

    cardContent.appendChild(courseDesc);

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    let cardBtn = document.createElement("button");
    cardBtn.classList.add("card-btn");
    cardBtn.textContent = `Learn ${cardInfo.name}`
    cardFooter.appendChild(cardBtn);

    cardElem.appendChild(cardContent);
    cardElem.appendChild(cardFooter);

    return cardElem;
}

function appendCategoryContainer(card) {

    let cardContainerElem = document.getElementById(`categoryId-${card.category}`);
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

var filters = {};
Object.values(FilterLookup).forEach((value) => filters[value] = new ArrayFilterStrategy(FiltersInfo_t[value]));

function createFilterElem(name, value, filterLookupId, additionalStyleFunction) {

    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("checkbox-wrapper");

    let inputElem = document.createElement("input");
    inputElem.id = `check-${name}-${filterLookupId}`;
    inputElem.name = "check";
    inputElem.value = "";
    inputElem.type = "checkbox";

    inputElem.addEventListener("change", () => {

        console.log(`checked ${name}-${filterLookupId}`);

        let categoryFilters = filters[filterLookupId];
        console.log(categoryFilters);

        if (inputElem.checked) {
            if (!categoryFilters.includes(value)) {
                categoryFilters.push(value);
                console.log(filters);
                populateCategoryLessonContent();
            }
        }
        else {
            categoryFilters.remove(value);
            console.log(filters);
            populateCategoryLessonContent();
        }
    });

    categoryDiv.appendChild(inputElem);

    let categoryElem = document.createElement("label");
    categoryElem.htmlFor = `check-${name}-${filterLookupId}`
    let checkmarkElem = document.createElement("span");
    categoryElem.textContent = name;

    categoryElem.appendChild(checkmarkElem);

    categoryDiv.appendChild(categoryElem);

    if (additionalStyleFunction) {
        additionalStyleFunction(categoryElem, checkmarkElem);
    }

    return categoryDiv;
}

function populateDifficultyFilters() {
    let difficultyWrapper = document.getElementById("difficulty-filter-wrapper");

    Object.values(difficulty_t)
        .forEach((difficulty) => {
            let filterElem = createFilterElem(difficulty.name, difficulty.value, FilterLookup.DIFFICULTY, (_, checkmarkElem) => {
                checkmarkElem.style.setProperty("--box-color", difficulty.baseColor);
            });
            difficultyWrapper.appendChild(filterElem);
        });
}

function populateCategoryFilters() {
    let categoryWrapper = document.getElementById("category-filter-wrapper");

    Object.values(category_t).forEach((category) => {
        categoryWrapper.appendChild(createFilterElem(category.name, category.id, FilterLookup.CATEGORY));
    });
}

function populateCategoryLessonContent() {
    let content = document.getElementById("content-wrapper");
    content.replaceChildren();

    let visibleCards = getVisibleElements(cardsList, filters);

    console.log(`visibleCards: ${visibleCards}`);

    let categoryIds = new Set(visibleCards.map((card) => card.category));

    categoryIds.forEach((category) => {
        content.appendChild(createCategoryContainer(category))
    });
    visibleCards.forEach((card) => appendCategoryContainer(card));

}

window.onload = () => {
    populateCategoryFilters();
    populateDifficultyFilters();
    populateCategoryLessonContent();
};