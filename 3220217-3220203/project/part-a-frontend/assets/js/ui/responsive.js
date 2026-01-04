document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth < 768) {

        const showBtnWrap = document.getElementById("show-filter-btn-wrap");
        const filtersContainer = document.getElementById("filters-wrapper");

        if (showBtnWrap && filtersContainer) {
            const showFiltersButton = document.createElement("button");
            showFiltersButton.classList.add("show-filters-btn");

            showFiltersButton.addEventListener("click", () => {
                filtersContainer.classList.toggle("visible");
            });

            showBtnWrap.appendChild(showFiltersButton);
        }

        let linksList = document.getElementById("nav-links-list");
        let toggleBtn = document.getElementById("toggle-btn");
        if (linksList && toggleBtn) {
            linksList.classList.add("collapsed");
            const isCollapsed = linksList.classList.contains("collapsed");
            toggleBtn.innerHTML = isCollapsed ? "&#9660;" : "&#9650;";
        }
    }
});