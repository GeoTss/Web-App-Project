import { renderMenu } from '../../components/menu.js';
// import { initBooksVideos } from '../ui/books-videos.js';

export function renderBooksVideos() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-books">
      <div class="navbar-container"></div>
      <div id="show-filter-btn-wrap"></div>
      <div id="filters-wrapper"></div>
      <div id="content-wrapper" class="card-container"></div>
    </div>
  `;

  renderMenu();
//   initBooks();
//   renderFooter();
}
