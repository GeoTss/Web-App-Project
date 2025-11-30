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