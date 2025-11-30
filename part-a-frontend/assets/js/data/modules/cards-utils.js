class Difficulty {
    constructor(name, color, value) {
        this.name = name;
        this.color = color;
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
    [DifficultyLookup.EASY]: new Difficulty("Easy", "green", 0),
    [DifficultyLookup.MEDIUM]: new Difficulty("Medium", "orange", 1),
    [DifficultyLookup.HARD]: new Difficulty("Hard", "red", 2),
    [DifficultyLookup.DEMON]: new Difficulty("Demon", "crimson", 3)
}

export class codeMenuCard {
    constructor(langName, desc, difficulty, category) {
        this.name = langName;
        this.description = desc;
        this.difficulty = difficulty;
        this.category = category;
    }
}