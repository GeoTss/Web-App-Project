export function renderMenu() {
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

  const superLinks = [
    { text: 'Admin Dashboard', href: '/admin' }
  ];

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

  window.addEventListener('popstate', async () => { 
    const response = await fetch('/api/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const userData = await response.json();
      accountBtn.textContent = userData.username;
      renderNavLinks(navLinks);
    } else {
      accountBtn.textContent = 'Account';
      renderNavLinks(navLinks.concat(optionalLinks));
    }
  });

  toggleBtn.addEventListener('click', () => {
    linksList.classList.toggle('collapsed');
    const isCollapsed = linksList.classList.contains('collapsed');
    toggleBtn.innerHTML = isCollapsed ? '&#9660;' : '&#9650;';
  });

  accountBtn.addEventListener('click', () => {
    // if user authenticated send to profile page
    if (accountBtn.textContent !== 'Account') {
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    } else {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  });


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

  renderNavLinks(navLinks.concat(optionalLinks));

}
