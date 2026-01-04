import { renderHome } from './pages/home/home.js';
import { renderAbout } from './pages/about/about.js';
import { renderCourses } from './pages/courses/courses.js';
import { renderCourseDetails } from './pages/course-details/course-details.js';
import { renderBooksVideos } from './pages/books-videos/books-videos.js';
import { renderRegister } from './pages/register/register.js';
import { renderLogin } from './pages/login/login.js';
import { renderProfile } from './pages/profile/profile.js';

import './styles/about.css';
import './styles/books-videos.css';
import './styles/checkbox.css';
import './styles/components.css'
import './styles/course-details.css';
import './styles/home.css';
import './styles/layout.css';
import './styles/login.css';
import './styles/menu.css';
import './styles/register.css';
import './styles/profile.css';

import { renderMenu } from './components/menu.js';

const routes = {
  '/': renderHome,
  '/about': renderAbout,
  '/login': renderLogin,
  '/register': renderRegister,
  '/courses': renderCourses,
  '/course-details': renderCourseDetails,
  '/books-videos': renderBooksVideos,
  '/profile': renderProfile,
};

function router() {
  const path = window.location.pathname;
  const page = routes[path];
  if (page) {
    page();
  } else {
    window.history.replaceState({}, '', '/');
    renderHome();
  }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (!link) return;

  e.preventDefault();
  const href = link.getAttribute('href');
  if (!href) return;

  window.history.pushState({}, '', href);
  router();
});

document.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);
renderMenu();
