export async function renderMenu() {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  container.innerHTML = '';

  const navbar = document.createElement('nav');
  const bar = document.createElement('div');
  const toggleBtn = document.createElement('button');
  const logo = document.createElement('div');
  const linksList = document.createElement('ul');
  const accountBtn = document.createElement('button');

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Books & Videos', href: '/books-videos' },
    { text: 'Courses', href: '/courses' },
  ];

  const optionalLinks = [
    { text: 'Register', href: '/register' },
    { text: 'Login', href: '/login' }
  ];

  function renderNavLinks(links) {
    linksList.innerHTML = '';
    links.forEach(({ text, href }) => {
    
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = href;
      a.textContent = text;
      a.setAttribute('data-link', '');

      li.appendChild(a);
      linksList.appendChild(li);
    });
  }

  function buildLinks(user) {
    let links = [...navLinks];

    if (!user) {
      links = links.concat(optionalLinks);
    }

    if (user?.role === 'admin') {
      links = links.concat(superLinks);
    }

    return links;
  }

  navbar.id = 'nav';
  bar.classList.add('bar');

  toggleBtn.id = 'toggle-btn';
  toggleBtn.innerHTML = '&#9650;';

  logo.classList.add('logo');
  logo.textContent = 'Clueless Code Learning';

  linksList.id = 'nav-links-list';
  linksList.classList.add('links');

  accountBtn.id = 'account-btn';
  accountBtn.textContent = 'Account';

  bar.appendChild(toggleBtn);
  bar.appendChild(logo);
  bar.appendChild(accountBtn);

  navbar.appendChild(bar);
  navbar.appendChild(linksList);
  container.appendChild(navbar);

  const user = await getCurrentUser();

  accountBtn.textContent = user ? user.username : 'Account';
  renderNavLinks(buildLinks(user));

  accountBtn.addEventListener('click', () => {
    const target = user ? '/profile' : '/login';
    window.history.pushState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  toggleBtn.addEventListener('click', () => {
    linksList.classList.toggle('collapsed');
    const isCollapsed = linksList.classList.contains('collapsed');
    toggleBtn.innerHTML = isCollapsed ? '&#9660;' : '&#9650;';
  });
  window.addEventListener('auth-change', async () => {
    const user = await getCurrentUser();
    accountBtn.textContent = user ? user.username : 'Account';
    renderNavLinks(buildLinks(user));
  });
}
  
async function getCurrentUser() {
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return null;
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}