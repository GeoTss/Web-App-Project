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
    { text: 'Register', href: '/register' },
    { text: 'Login', href: '/login' }
  ];

  navLinks.forEach(({ text, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = href;
    a.textContent = text;
    a.setAttribute('data-link', '');

    li.appendChild(a);
    linksList.appendChild(li);
  });

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

  toggleBtn.addEventListener('click', () => {
    linksList.classList.toggle('collapsed');
    const isCollapsed = linksList.classList.contains('collapsed');
    toggleBtn.innerHTML = isCollapsed ? '&#9660;' : '&#9650;';
  });

  accountBtn.addEventListener('click', () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  const currentPath = window.location.pathname;
  const linkItems = linksList.querySelectorAll('a');

  linkItems.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
