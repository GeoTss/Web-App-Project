import { initCourses } from '../courses/courses-helper.js'; 
import { renderFooter } from '../../components/footer.js';
import {
  getProfileInfo,
  initializeFilters,
  setupFieldUpdateButtons,
  setupLogoutButton,
  setupUpdateProfileButton
} from './profile-helper.js';

export function renderProfile() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="profile-container">
      <h1>User Profile</h1>

      <div id="profile-info">
        <div id="credentials" style="display: flex; align-items: center; gap: 10px;">
          <!-- flexbox row with space between -->
          <strong>Username:</strong> <span id="username"></span>
          <button id="update-username-btn">✏️</button>
        </div>
        <div id="credentials" style="display: flex; align-items: center; gap: 10px;">
          <strong>Email:</strong> <span id="email"></span>
          <button id="update-email-btn">✏️</button>
        </div>
      </div>
      <div id="filters-wrapper"></div>
      <button id="update-profile-btn">Save</button>
      <button id="logout-btn">Logout</button>
    </div>
  `;

  getProfileInfo();
  setupUpdateProfileButton();
  setupFieldUpdateButtons();
  setupLogoutButton();
  renderFooter();
  initCourses();
}


