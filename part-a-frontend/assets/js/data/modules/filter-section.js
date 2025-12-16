export class FilterInfo {
    constructor(field, priority) {
        this.field = field;
        this.priority = priority;
    }
};

export const FilterLookup = {
    CATEGORY: 0,
    DIFFICULTY: 1,
    RATING: 2
};

export const CourseFiltersInfo_t = {
    [FilterLookup.CATEGORY]: new FilterInfo("categoryLookupId", 0),
    [FilterLookup.DIFFICULTY]: new FilterInfo("difficultyLookupId", 1),
    [FilterLookup.RATING]: new FilterInfo("ratingLookupId", 1)
};

export const FilterInputType = {
    CHECKBOX: 0,
    RANGE: 1,
};

class ArrayFilterStrategy {
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

    toggle(value) {
        if (this.includes(value))
            this.remove(value);
        else
            this.push(value);
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

function createCheckboxInput(itemInfo) {
    let filterDiv = document.createElement("div");
    filterDiv.classList.add("checkbox-wrapper");

    let inputElem = document.createElement("input");

    let itemFieldName = itemInfo["name"];
    let itemFieldId = itemInfo["id"];

    inputElem.id = `check-${itemFieldName}-${itemFieldId}`;
    inputElem.name = "check";
    inputElem.value = "";
    inputElem.type = "checkbox";

    inputElem.addEventListener("change", () => {
        console.log(`checked ${itemFieldName}-${itemFieldId}`);

        this.filterStrat.toggle(itemFieldId);
    });

    filterDiv.appendChild(inputElem);

    let filterElem = document.createElement("label");
    filterElem.htmlFor = `check-${itemFieldName}-${itemFieldId}`
    let checkmarkElem = document.createElement("span");
    filterElem.textContent = itemFieldName;

    filterElem.appendChild(checkmarkElem);

    filterDiv.appendChild(filterElem);

    if (this.callbackFunc) {
        this.callbackFunc(itemInfo, checkmarkElem);
    }

    return filterDiv;
}

function createRangeInput(itemInfo) {

}

const createInputElem = {
    [FilterInputType.CHECKBOX]: createCheckboxInput,
    [FilterInputType.RANGE]: createRangeInput
}

export class FilterSectionManager {
    constructor(id, name, inputType, callbackFunc) {
        this.parentElem = null;
        this.selfElem = null;

        this.id = id;
        this.name = name;
        this.inputType = inputType;

        this.callbackFunc = callbackFunc;

        this.filterStrat = new ArrayFilterStrategy(CourseFiltersInfo_t[id]);
    }

    initializeSection(parentElem) {
        this.parentElem = parentElem;

        let sectionWrap = document.createElement("div");
        let wrapId = `${this.name}-filters-wrap`;
        sectionWrap.id = wrapId;

        let sectionHeader = document.createElement("h3");
        sectionHeader.classList.add("filter-section-header");
        sectionHeader.textContent = `${this.name} filters`;

        sectionWrap.appendChild(sectionHeader);

        let filterSection = document.createElement("div");
        let sectionId = `${this.name}-filters`;
        filterSection.id = sectionId;

        sectionWrap.appendChild(filterSection);

        this.parentElem.appendChild(sectionWrap);

        this.selfElem = filterSection;
    }

    appendFilterElem(itemInfo) {
        let filterDiv = createInputElem[this.inputType](itemInfo);

        this.selfElem.appendChild(filterDiv);
    }

    populateSection(itemList) {
        itemList.forEach((item) => {
            this.appendFilterElem(item);
        });
    }
};

export class FiltersController {
    constructor(managersList) {
        this.managersMap = {};
        managersList.forEach((manager) => {
            this.managersMap[manager.id] = manager;
        });
    }

    getActiveFilterChain() {
        let activeFilterChain = [];
        Object.values(this.managersMap).forEach((manager) => {
            if (!manager.filterStrat.isEmpty())
                activeFilterChain.push(manager.filterStrat);
        });

        activeFilterChain.sort((a, b) => a.priority - b.priority);

        return activeFilterChain;
    }

    getSatisfyingElements(elemList) {
        let activeFilterChain = this.getActiveFilterChain();

        return elemList.filter((elem) =>
            activeFilterChain.every((strat) => strat.matches(elem))
        );
    }

    populateManager(id, itemList) {
        this.managersMap[id].populateSection(itemList);
    }
};

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

    return filtersContainer;
}

export function createFilterSection(filterManagersList) {
    let filtersContainer = createFilterContainer();

    for (let filterManager of filterManagersList) {
        filterManager.initializeSection(filtersContainer);
    }
}

export function addFiltersChangeCallback(callbackFunc) {
    let filtersWrap = document.getElementById("filters-wrapper");
    filtersWrap.addEventListener("change", () => callbackFunc());
}