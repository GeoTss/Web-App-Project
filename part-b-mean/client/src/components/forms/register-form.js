import {
  FilterInputType,
  FilterLookup,
  FilterSectionManager,
  FiltersController,
  createFilterSection
} from "../../modules/filter-section.js";

import { category_t, difficulty_t } from "../../modules/category-utils.js";

let filterController;

export function initRegisterForm() {
  const filterManagers = [
    new FilterSectionManager(
      FilterLookup.DIFFICULTY,
      "difficulty",
      FilterInputType.CHECKBOX,
      (itemInfo, checkmarkElem) => {
        checkmarkElem.style.setProperty("--box-color", itemInfo.baseColor);
      }
    ),
    new FilterSectionManager(
      FilterLookup.CATEGORY,
      "category",
      FilterInputType.CHECKBOX
    )
  ];

  filterController = new FiltersController(filterManagers);

  createFilterSection(filterManagers);

  filterController.populateManager(
    FilterLookup.DIFFICULTY,
    Object.values(difficulty_t)
  );

  filterController.populateManager(
    FilterLookup.CATEGORY,
    Object.values(category_t)
  );

  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("input", e => {
      const password = e.target.value;
      document.getElementById("longer").textContent =
        password.length >= 8 ? " Is longer than 8 characters ✔" : " Is longer than 8 characters ✖";
      document.getElementById("uppercase").textContent =
        /[A-Z]/.test(password) ? " Has uppercase ✔" : " Has uppercase ✖";
      document.getElementById("lowercase").textContent =
        /[a-z]/.test(password) ? " Has lowercase ✔" : " Has lowercase ✖";
      document.getElementById("number").textContent =
        /[0-9]/.test(password) ? " Has number ✔" : " Has number ✖";
      document.getElementById("special").textContent =
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
          ? " Has special character ✔"
          : " Has special character ✖";
    });
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", async e => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    if (!username) return alert("Username is not provided.");
    if (!email) return alert("Email is not provided.");
    if (!emailRegex.test(email)) return alert("Email format invalid.");
    if (password !== repeatPassword) return alert("Passwords do not match.");

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength < 5) return alert("Password too weak.");
    if (filterController.length() === 0)
      return alert("Please select at least one filter.");

    document.getElementById("confirmation-username").textContent =
      "Your username will be: " + username;

    document.getElementById("confirmation-email").textContent =
      "The email you gave is: " + email;

    document.getElementById("confirmation-password").textContent =
      "Your password will be: " + password;

    const difMan = filterController.getManagerById(FilterLookup.DIFFICULTY);
    document.getElementById("confirmation-difficulty-filters").textContent =
      "You want courses with these difficulties: " +
      difMan.getFiltersList().map(v => difficulty_t[v].name).join(", ");

    const catMan = filterController.getManagerById(FilterLookup.CATEGORY);
    document.getElementById("confirmation-categories-filters").textContent =
      "You are interested in these categories: " +
      catMan.getFiltersList().map(v => category_t[v].name).join(", ");

    const confirmation = document.getElementById("confirmation-popup");
    confirmation.classList.add("visible");

    document.getElementById("btn-go-back").onclick = () =>
      confirmation.classList.remove("visible");

    document.getElementById("btn-confirm").onclick = async () => {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (!res.ok) {
        alert("Register failed");
        return;
      }

      alert("Register successful");
      confirmation.classList.remove("visible");
    };
  });
}
