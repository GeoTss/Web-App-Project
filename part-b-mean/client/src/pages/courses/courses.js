import { renderMenu } from '../../components/menu.js';
// import { initCourses } from '../ui/courses.js';
// import { initFilters } from '../modules/filter-section.js';

export function renderCourses() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-courses">
      <div id="navbar-container"></div>
      <div id="show-filter-btn-wrap"></div>
      <div id="filters-wrapper"></div>
      <div id="content-wrapper"></div>
    </div>
  `;

  renderMenu();
//   initFilters();
//   initCourses();
}
