import { FilterInputType, FilterLookup, FilterSectionManager, FiltersController, createFilterSection } from "../modules/filter-section.js"
import { category_t } from "../modules/category-utils.js"
import { difficulty_t } from "../modules/cards-utils.js"

var filterManagers = [
    new FilterSectionManager(FilterLookup.DIFFICULTY, "difficulty", FilterInputType.CHECKBOX, (itemInfo, checkmarkElem) => {
        checkmarkElem.style.setProperty("--box-color", itemInfo.baseColor);
    }),
    new FilterSectionManager(FilterLookup.CATEGORY, "category", FilterInputType.CHECKBOX)
];

var filterController = new FiltersController(filterManagers);


document.getElementById("password").addEventListener("input", e => {
    const password = e.target.value;
    document.getElementById("longer").textContent = password.length >= 8 ? " Is longer than 8 characters ✔" : " Is longer than 8 characters ✖";
    document.getElementById("uppercase").textContent = /[A-Z]/.test(password) ? " Has uppercase ✔" : " Has uppercase ✖";
    document.getElementById("lowercase").textContent = /[a-z]/.test(password) ? " Has lowercase ✔" : " Has lowercase ✖";
    document.getElementById("number").textContent = /[0-9]/.test(password) ? " Has number ✔" : " Has number ✖";
    document.getElementById("special").textContent = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? " Has special character ✔" : " Has special character ✖";
});

document.getElementById("submit-btn").addEventListener("click", e => {
    e.preventDefault();

    const debug = true;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    if (!debug) {

        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        let s = 0;
        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[a-z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) s++;

        if (s < 5) {
            alert("Password too weak.");
            return;
        }
    }
    
    const filters = filterController;
    if (filters.length === 0) {
        alert("Please select at least one filter.");
        return;
    }
    
    // Test sending the data to the courses page
    // Change for part 2
    const encodedUser = btoa(JSON.stringify({ username, email, password }));
    const encodedFilters = btoa(JSON.stringify(filters));
    window.location.href = `courses.html?user=${encodedUser}&filters=${encodedFilters}`;
});


window.onload = () => {
    createFilterSection(filterManagers);

    filterController.populateManager(FilterLookup.DIFFICULTY, Object.values(difficulty_t));
    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));
}