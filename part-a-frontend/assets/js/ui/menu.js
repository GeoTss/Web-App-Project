const navbar = document.createElement("nav");
const bar = document.createElement("div");
const toggleBtn = document.createElement("button");
const logo = document.createElement("div");
const linksList = document.createElement("ul");
const accountBtn = document.createElement("button");

const navLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "about" },
    { text: "Books & Videos", href: "books-videos" },
    { text: "Courses", href: "courses" },
    { text: "Register", href: "register" },
    { text: "Login", href: "login" }
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
accountBtn.id = "account-btn";
accountBtn.textContent = "Account";

bar.appendChild(toggleBtn);
bar.appendChild(logo);
bar.appendChild(accountBtn);
navbar.appendChild(bar);
navbar.appendChild(linksList);

document.getElementById("navbar-container").appendChild(navbar);

toggleBtn.addEventListener("click", () => {
    linksList.classList.toggle("collapsed");
    const isCollapsed = linksList.classList.contains("collapsed");
    toggleBtn.innerHTML = isCollapsed ? "&#9660;" : "&#9650;";
});

accountBtn.addEventListener("click", () => {
    window.location.href = "/login";
});

const currentPath = window.location.pathname;

for (const linkElem of linkItems) {
  if (linkElem.getAttribute("href") === currentPath) {
    linkElem.classList.add("active");
  } else {
    linkElem.classList.remove("active");
  }
}


for (const linkElem of linkItems) {
    if (linkElem.getAttribute("href") === page) {
        linkElem.classList.add("active");
    } else {
        linkElem.classList.remove("active");
    }
}