import { initCourses } from '../courses/courses-helper.js'; 
import { renderFooter } from '../../components/footer.js';
import {
  FilterInputType,
  FilterLookup,
  FilterSectionManager,
  FiltersController,
  createFilterSection
} from "../../modules/filter-section.js";
// import { category_t, difficulty_t } from "../../modules/category-utils.js";

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
  initCourses();
  renderFooter();
  setupUpdateProfileButton();
  setupFieldUpdateButtons();
  setupLogoutButton();
}

function getProfileInfo() {
  fetch('/api/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch profile info');
    }
    return response.json();
  }).then((data) => {
    document.getElementById('username').textContent = data.username;
    document.getElementById('email').textContent = data.email;
  }).catch((error) => {
    console.error('Error fetching profile info:', error);
  });
}

function getPreferences() {
  let filterController;
  const filterManagers = [
    new FilterSectionManager(
      FilterLookup.DIFFICULTY,
      "difficulty",
      FilterInputType.CHECKBOX,
      (itemInfo, checkmarkElem) => {
        checkmarkElem.style.setProperty("--box-color", itemInfo.baseColor);
      }
    ),
    new FilterSectionManager(
      FilterLookup.CATEGORY,
      "category",
      FilterInputType.CHECKBOX
    )
  ];

  filterController = new FiltersController(filterManagers);

  createFilterSection(filterManagers);

  filterController.populateManager(
    FilterLookup.DIFFICULTY,
    Object.values(difficulty_t)
  );

  filterController.populateManager(
    FilterLookup.CATEGORY,
    Object.values(category_t)
  );
  const categories = filterController.managersMap[FilterLookup.CATEGORY].getFiltersList();
  const difficulties = filterController.managersMap[FilterLookup.DIFFICULTY].getFiltersList();
  return {
    categories,
    difficulties
  };
}

function setupUpdateProfileButton() {
  const updateBtn = document.getElementById('update-profile-btn');
  updateBtn.addEventListener('click', () => {
    const newUsername = document.getElementById('username').textContent;
    const newEmail = document.getElementById('email').textContent;
    const preferences = getPreferences();
    fetch('/api/users/me', {  
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        preferences: preferences,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      return response.json();
    }).then((data) => {
      alert('Profile updated successfully');
      getProfileInfo();
    }).catch((error) => {
      console.error('Error updating profile:', error);
    }); 
  });   
}

function setupFieldUpdateButtons() {
  const updateUsernameBtn = document.getElementById('update-username-btn');
  updateUsernameBtn.addEventListener('click', () => {
    const currentUsername = document.getElementById('username').textContent;
    const newUsername = prompt('Enter new username:', currentUsername);
    if (newUsername) {
      document.getElementById('username').textContent = newUsername;
    }
  });
  const updateEmailBtn = document.getElementById('update-email-btn');
  updateEmailBtn.addEventListener('click', () => {
    const currentEmail = document.getElementById('email').textContent;
    const newEmail = prompt('Enter new email:', currentEmail);
    if (newEmail && newEmail.includes('@')) {
      document.getElementById('email').textContent = newEmail;
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', () => {
    fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      return response.json();
    }).then((data) => {
      window.history.pushState({}, '', '/home');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  });
}
