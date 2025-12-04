class Difficulty {
    constructor(name, baseColor, bannerColor, lineColor, value) {
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
    [DifficultyLookup.EASY]: new Difficulty("Easy", "green", "linear-gradient(135deg, #48bb78 0%, #38a169 100%)", "#38a169", 0),
    [DifficultyLookup.MEDIUM]: new Difficulty("Medium", "orange", "linear-gradient(135deg, #ecc94b 0%, #d69e2e 100%)", "#d69e2e", 1),
    [DifficultyLookup.HARD]: new Difficulty("Hard", "red", "linear-gradient(135deg, #f56565 0%, #c53030 100%)", "#c53030", 2),
    [DifficultyLookup.DEMON]: new Difficulty("Demon", "crimson", "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)", "#8B0000", 3)
}

export class codeMenuCard {
    constructor(langName, desc, difficulty, category) {
        this.name = langName;
        this.description = desc;
        this.difficulty = difficulty;
        this.category = category;
    }
}