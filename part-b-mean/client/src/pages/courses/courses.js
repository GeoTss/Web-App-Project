import { renderFooter } from '../../components/footer.js';
import { initCourses } from './courses-helper.js';

export function renderCourses() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-courses">
      <div id="show-filter-btn-wrap"></div>
      <div id="filters-wrapper"></div>
      <div id="content-wrapper"></div>
      <div id="container-wrapper"></div>
    </div>
  `;

  initCourses();
  renderFooter();
}
