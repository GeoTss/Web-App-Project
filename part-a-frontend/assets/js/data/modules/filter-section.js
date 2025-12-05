import { difficulty_t } from "./cards-utils";
import { category_t } from "./category-utils";

export class FilterInfo {
    constructor(field, priority) {
        this.field = field;
        this.priority = priority;
    }
};

export const FilterLookup = {
    CATEGORY: 0,
    DIFFICULTY: 1
};

export const FiltersInfo_t = {
    [FilterLookup.CATEGORY]: new FilterInfo("category", 0),
    [FilterLookup.DIFFICULTY]: new FilterInfo("difficulty", 1)
};

export class ArrayFilterStrategy {
    constructor(filterInfo) {
        this.filters = [];
        this.field = filterInfo.field;
        this.priority = filterInfo.priority;
    }

    push(value) {
        this.filters.push(value);
    }

    remove(value) {
        let idx = this.filters.indexOf(value);
        if (idx > -1)
            this.filters.splice(idx, 1);
    }

    includes(value) {
        return this.filters.includes(value);
    }

    isEmpty() {
        return this.filters.length === 0;
    }

    matches(card) {
        if (!this.filters || this.filters.length === 0)
            return true;

        return this.filters.includes(card[this.field]);
    }
};

export class FiltersController {
    constructor() {
        this.filtersMap = {}
        Object.values(FilterLookup).forEach((value) => filters[value] = new ArrayFilterStrategy(FiltersInfo_t[value]));
    }
};

export function getActiveFilters(filterList) {
    let activeFilterChain = [];
    Object.values(filterList).forEach((filterStrat) => {
        if (!filterStrat.isEmpty())
            activeFilterChain.push(filterStrat);
    });

    activeFilterChain.sort((a, b) => a.priority - b.priority);

    return activeFilterChain;
}

export function getVisibleElements(cards, filterList) {
    let activeFilterChain = getActiveFilters(filterList);

    return cards.filter((card) =>
        activeFilterChain.every((strat) => strat.matches(card))
    );
}

function createFilterContainer() {
    let filtersContainer = document.getElementById("filters-wrapper");

    if (window.innerWidth < 700) {

        let showBtnWrap = document.getElementById("show-filter-btn-wrap");

        let showFiltersButton = document.createElement("button");
        showFiltersButton.classList.add("show-filters-btn")

        showFiltersButton.addEventListener("click", () => {
            filtersContainer.classList.toggle("visible");
        });

        showBtnWrap.appendChild(showFiltersButton);
    }
}

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
    let difficultyWrapper = document.getElementById("difficulty-filters");

    Object.values(difficulty_t)
        .forEach((difficulty) => {
            let filterElem = createFilterElem(difficulty.name, difficulty.value, FilterLookup.DIFFICULTY, (_, checkmarkElem) => {
                checkmarkElem.style.setProperty("--box-color", difficulty.baseColor);
            });
            difficultyWrapper.appendChild(filterElem);
        });
}

function populateCategoryFilters() {
    let categoryWrapper = document.getElementById("category-filters");

    Object.values(category_t).forEach((category) => {
        categoryWrapper.appendChild(createFilterElem(category.name, category.id, FilterLookup.CATEGORY));
    });
}

export function createFilterSection() {
    createFilterContainer();
    populateDifficultyFilters();
    populateCategoryFilters();
}

export function getFilterList() {
    let categoryFilters = document.getElementById("category-filters");

    for (const child in categoryFilters.children()) {

    }

    let difficultyFilters = document.getElementById("difficulty-filters");
}