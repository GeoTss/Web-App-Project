// import { initCourseDetails } from '../ui/course-details.js';

export function renderCourseDetails(courseId) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-course-details">
      <div class="course-screen-wrapper">
        <div id="menu-wrap">
          <div id="sections-menu"></div>
        </div>

        <div class="content-wrapper">
          <div id="header">
            <div id="menu-icon"></div>
            <div id="topic-title"></div>
            <div id="close-menu-icon"></div>
          </div>
          <div id="lesson-content"></div>
        </div>
      </div>
    </div>
  `;

//   initCourseDetails(courseId);
}
