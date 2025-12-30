import { initBooksVideos } from './books-videos-helper.js';
import { renderFooter } from '../../components/footer.js';

export function renderBooksVideos() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-books">
      <div id="show-filter-btn-wrap"></div>
      <div id="filters-wrapper"></div>
      <div id="content-wrapper" class="card-container"></div>
    </div>
  `;

  initBooksVideos();
  renderFooter();
}
