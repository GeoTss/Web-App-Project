const navbar = document.createElement("nav");
const bar = document.createElement("div");
const toggleBtn = document.createElement("button");
const logo = document.createElement("div");
const linksList = document.createElement("ul");

const navLinks = [
    { text: "Home", href: "index.html" },
    { text: "About", href: "about.html" },
    { text: "Books & Videos", href: "books.html" },
    { text: "Courses", href: "courses.html" },
    { text: "Register", href: "register.html" },
    { text: "Login", href: "login.html" }
];

for (const linkInfo of navLinks) {
    const linkItem = document.createElement("li");
    const linkElem = document.createElement("a");
    linkElem.href = linkInfo.href;
    linkElem.textContent = linkInfo.text;
    linkItem.appendChild(linkElem);
    linksList.appendChild(linkItem);
}

navbar.id = "nav";
bar.classList.add("bar");
toggleBtn.id = "toggle-btn";
toggleBtn.innerHTML = "&#9650;";
logo.classList.add("logo");
logo.textContent = "Clueless Code Learning";
linksList.id = "nav-links-list";
linksList.classList.add("links");

bar.appendChild(toggleBtn);
bar.appendChild(logo);
navbar.appendChild(bar);
navbar.appendChild(linksList);

document.getElementById("navbar-container").appendChild(navbar);

toggleBtn.addEventListener("click", () => {
    linksList.classList.toggle("collapsed");
    const isCollapsed = linksList.classList.contains("collapsed");
    toggleBtn.innerHTML = isCollapsed ? "&#9660;" : "&#9650;";
});

const path = window.location.pathname;
const page = path.split("/").pop();

const linkItems = linksList.getElementsByTagName("a");
for (const linkElem of linkItems) {
    if (linkElem.getAttribute("href") === page) {
        linkElem.classList.add("active");
    } else {
        linkElem.classList.remove("active");
    }
}