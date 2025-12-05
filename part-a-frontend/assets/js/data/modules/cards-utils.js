class Difficulty {
    constructor(id, name, baseColor, bannerColor, lineColor, value) {
        this.id = id;
        this.name = name;
        this.baseColor = baseColor;
        this.bannerColor = bannerColor;
        this.lineColor = lineColor;
        this.value = value;
    }
}

export const DifficultyLookup = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    DEMON: 3
};

export const difficulty_t = {
    [DifficultyLookup.EASY]: new Difficulty(DifficultyLookup.EASY, "Easy", "green", "linear-gradient(135deg, #48bb78 0%, #38a169 100%)", "#38a169", 0),
    [DifficultyLookup.MEDIUM]: new Difficulty(DifficultyLookup.MEDIUM, "Medium", "orange", "linear-gradient(135deg, #ecc94b 0%, #d69e2e 100%)", "#d69e2e", 1),
    [DifficultyLookup.HARD]: new Difficulty(DifficultyLookup.HARD, "Hard", "red", "linear-gradient(135deg, #f56565 0%, #c53030 100%)", "#c53030", 2),
    [DifficultyLookup.DEMON]: new Difficulty(DifficultyLookup.DEMON, "Demon", "crimson", "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)", "#8B0000", 3)
}

export class codeMenuCard {
    constructor(langName, desc, difficultyId, categoryId) {
        this.langName = langName;
        this.description = desc;
        this.difficultyLookupId = difficultyId;
        this.categoryLookupId = categoryId;
    }
}