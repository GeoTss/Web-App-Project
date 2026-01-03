export function renderError(params) {
  const code = params.code || 500;

  const messages = {
    401: 'You must be logged in',
    403: 'You are not allowed to view this content',
    404: 'Page not found',
    500: 'Internal server error',
  };

  document.getElementById('app').innerHTML = `
    <h1>Error ${code}</h1>
    <p>${messages[code] || 'Something went wrong'}</p>
  `;
}