import { codeMenuCard } from "../modules/cards-utils.js";
import { CategoryLookup, DifficultyLookup } from "../modules/category-utils.js";

export const cardsList = [
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