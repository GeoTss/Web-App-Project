import { initProfile } from './profile-helper.js';

export function renderProfile() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="profile-container">
      <h1>User Profile</h1>

      <div id="profile-info">
        <div id="credentials">
          <strong>Username:</strong> <span id="username"></span>
          <strong>Email:</strong> <span id="email"></span>
        </div>

        <div id="courses">
          <h2>Enrolled Courses</h2>
          <ul id="course-list"></ul>
        </div>

        <div id="progress">
          <h2>Progress</h2>
          <ul id="progress-list"></ul>
        </div>

        <div id="settings">
          <h2>Settings</h2>
        </div>
      </div>
    </div>
  `;

  renderMenu();
  initProfile();
  renderFooter();
}
