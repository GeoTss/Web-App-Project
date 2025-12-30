export async function initProfile() {
  try {
    const res = await fetch('/api/users/profile', {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    const data = await res.json();

    document.getElementById('username').textContent = data.username;
    document.getElementById('email').textContent = data.email;

    const courseList = document.getElementById('course-list');
    courseList.replaceChildren();

    data.enrolledCourses?.forEach(course => {
      const li = document.createElement('li');
      li.textContent = course.title;
      courseList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
  }
}
