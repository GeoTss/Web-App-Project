import {
  FilterInputType,
  FilterLookup,
  FilterSectionManager,
  FiltersController,
  createFilterSection
} from "../../modules/filter-section.js";
import { category_t, difficulty_t } from "../../modules/category-utils.js";

let preferableCategories = [];
let preferableDifficulties = [];

let anchorProfileInfo = false;

export function getProfileInfo() {
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

    preferableCategories = data.preferences.categories;
    preferableDifficulties = data.preferences.difficulties;
    
    if (!anchorProfileInfo) {
      initializeFilters();
      anchorProfileInfo = true;
    }

  }).catch((error) => {
    console.error('Error fetching profile info:', error);
  });
}

let filterController;

export function initializeFilters() {
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
    Object.values(difficulty_t),
    preferableDifficulties
  );

  filterController.populateManager(
    FilterLookup.CATEGORY,
    Object.values(category_t),
    preferableCategories
  );
  // console.log('Filters initialized');
}

// Just get the current filter values
export function getPreferences() {
  if (!filterController || !filterController.managersMap) {
    return {
      categories: [],
      difficulties: []
    };
  }

  const categoryManager = filterController.managersMap[FilterLookup.CATEGORY];
  const difficultyManager = filterController.managersMap[FilterLookup.DIFFICULTY];

  const categories = categoryManager ? categoryManager.getFiltersList() : [];
  const difficulties = difficultyManager ? difficultyManager.getFiltersList() : [];

  return {
    categories,
    difficulties
  };
}


export function setupUpdateProfileButton() {
  const updateBtn = document.getElementById('update-profile-btn');
  updateBtn.addEventListener('click', e => {
    const newUsername = document.getElementById('username').textContent;
    const newEmail = document.getElementById('email').textContent;
    console.log('Updating profile with:', newUsername, newEmail, getPreferences());
    fetch('/api/users/me', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        preferences: getPreferences(),
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

export function setupFieldUpdateButtons() {
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

export function setupLogoutButton() {
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
      window.dispatchEvent(new Event('auth-change'));
      return response.json();
    }).then((data) => {
      window.history.pushState({}, '', '/home');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  });
}

export function setUpDeleteAccountButton() {
  const deleteAccountBtn = document.getElementById('delete-account-btn');
  deleteAccountBtn.addEventListener('click', () => {
    const confirmation = prompt('Type DELETE to confirm account deletion:');
    if (confirmation === 'DELETE') {
      fetch('/api/users/me', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete account');
        }
        window.dispatchEvent(new Event('auth-change'));
        window.history.pushState({}, '', '/home');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }).catch((error) => {
        console.error('Error deleting account:', error);
      });
    } else {
      alert('Account deletion cancelled.');
    }
  });
}