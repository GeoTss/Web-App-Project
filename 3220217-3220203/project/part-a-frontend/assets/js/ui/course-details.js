import { courseMap } from "../data/courses-details.js";

var courseName = null;
var courseContent = null;
var currentSelectedElem = null;

function writeLessonContent(section, topic) {
    let topicText = courseContent.sections[section.id].topics[topic.id].content;
    let lessonContent = document.getElementById("lesson-content");
    lessonContent.innerHTML = topicText;

    let topicTitleElem = document.getElementById("topic-title");
    topicTitleElem.textContent = `${topic.id}. ${topic.name}`;
}

function createTopic(section, topic) {
    let topicElem = document.createElement("div");
    topicElem.classList.add("topic");

    let topicText = document.createElement("div");
    topicText.classList.add("topic-content");

    topicElem.addEventListener("click", () => {
        currentSelectedElem.classList.toggle("selected");
        topicElem.classList.toggle("selected");
        currentSelectedElem = topicElem;
        writeLessonContent(section, topic)
    });

    topicElem.appendChild(topicText);

    topicText.textContent = `${section.id}.${topic.id} ${topic.name}`;

    return topicElem;
}

function createSection(section, topics) {
    let sectionElem = document.createElement("div");
    sectionElem.classList.add("section");

    sectionElem.textContent = `${section.id} ${section.title}`;

    let topicWrapperElem = document.createElement("div");
    topicWrapperElem.classList.add("topic-wrapper");

    for (let topic of topics) {
        let topicElem = createTopic(section, topic);
        topicWrapperElem.appendChild(topicElem);
    }
    sectionElem.appendChild(topicWrapperElem);

    return sectionElem;
}

function populateCourseContent() {

    let sectionsContent = document.getElementById("sections-menu");

    for (const section of courseContent.sections) {
        let sectionElem = createSection(section, section.topics);

        sectionsContent.appendChild(sectionElem);
    }

    currentSelectedElem = sectionsContent.firstElementChild.firstElementChild.firstChild;
    currentSelectedElem.classList.toggle("selected");

    writeLessonContent(courseContent.sections[0], courseContent.sections[0].topics[0]);
}

function menuClick() {
    let menuBtn = document.getElementById("menu-icon");

    if (window.innerWidth < 700) {
        let closeMenuBtn = document.getElementById("close-menu-icon");

        menuBtn.addEventListener("click", () => {
            let sectionMenu = document.getElementById("menu-wrap");
            sectionMenu.classList.toggle("visible");
            menuBtn.classList.toggle("menu-visible");
            closeMenuBtn.classList.add("menu-visible");
        });

        closeMenuBtn.addEventListener("click", () => {
            let sectionMenu = document.getElementById("menu-wrap");
            sectionMenu.classList.toggle("visible");
            menuBtn.classList.toggle("menu-visible");
            closeMenuBtn.classList.remove("menu-visible");
        });
    } else {
        menuBtn.addEventListener("click", () => {
            let sectionMenu = document.getElementById("menu-wrap");
            sectionMenu.classList.toggle("visible");
            menuBtn.classList.toggle("menu-visible");
        });
    }
}

window.onload = () => {

    const params = new URLSearchParams(window.location.search);
    courseName = params.get("course");

    courseContent = courseMap.get(courseName);

    populateCourseContent(courseName)
    menuClick();
};