import { FilterInputType, FilterLookup, FilterSectionManager, FiltersController, createFilterSection } from "../modules/filter-section.js"
import { category_t, difficulty_t } from "../modules/category-utils.js"

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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.getElementById("submit-btn").addEventListener("click", e => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    // let debug = true;

    // if (!debug) {
    if (!username || username.length === 0) {
        alert("Username is not provided.");
        return;
    }

    if (!email || email.length === 0) {
        alert("Email is not provided.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Email is not in a correct format.");
        return;
    }

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

    if (filterController.length() === 0) {
        alert("Please select at least one filter.");
        return;
    }
    // }

    // Test sending the data to the courses page
    // Change for part 2

    let confUsernameElem = document.getElementById("confirmation-username");
    // console.log(confUsernameElem);
    confUsernameElem.textContent = "Your username will be: " + username;

    let confEmail = document.getElementById("confirmation-email");
    confEmail.textContent = "The email you gave is: " + email;

    let confPasswordElem = document.getElementById("confirmation-password");
    confPasswordElem.textContent = "Your password will be: " + password;

    let confDifficultyFilters = document.getElementById("confirmation-difficulty-filters");

    let difMan = filterController.getManagerById(FilterLookup.DIFFICULTY);
    let difStr = difMan.getFiltersList().map((value) => difficulty_t[value].name).join(", ");

    confDifficultyFilters.textContent = "You want courses with these difficulties: " + difStr;

    let confCategoryFilters = document.getElementById("confirmation-categories-filters");

    let catMan = filterController.getManagerById(FilterLookup.CATEGORY);
    let catStr = catMan.getFiltersList().map((value) => category_t[value].name).join(", ");

    confCategoryFilters.textContent = "You are interested in these categories: " + catStr;

    let confirmationElem = document.getElementById("confirmation-popup");
    confirmationElem.classList.add("visible");


    let goBackBtn = document.getElementById("btn-go-back");
    goBackBtn.addEventListener("click", () => {
        confirmationElem.classList.remove("visible");
    });

    let confirmBtn = document.getElementById("btn-confirm");
    confirmBtn.addEventListener("click", async() => {
        try {
            const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                message.textContent = data.message;
            return;
            }

            message.textContent = 'Register successful';

        } catch (err) {
            message.textContent = 'Server error';
        }
    })
});


window.onload = () => {
    createFilterSection(filterManagers);

    filterController.populateManager(FilterLookup.DIFFICULTY, Object.values(difficulty_t));
    filterController.populateManager(FilterLookup.CATEGORY, Object.values(category_t));
}