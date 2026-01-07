import { generateErrorNotification } from "../../modules/notification.js";

var courseName = null;
var courseContent = null;
var currentSelectedElem = null;
var courseId = null;

function writeLessonContent(section, topic) {
    let topicText = courseContent.sections[section.id].topics[topic.id].content;
    let lessonContent = document.getElementById("lesson-content");
    lessonContent.innerHTML = topicText;

    let topicTitleElem = document.getElementById("topic-title");
    topicTitleElem.textContent = `${topic.id}. ${topic.name}`;
}

function createTopic(section, topic, topicChecklist) {

    let topicElem = document.createElement("div");
    topicElem.classList.add("topic");

    let topicCheckbox = document.createElement("div");

    topicCheckbox.classList.add("checkbox-wrapper");

    let inputElem = document.createElement("input");

    inputElem.id = `${section.id}.${topic.id}`;
    inputElem.name = "check";
    inputElem.value = "";
    inputElem.type = "checkbox";

    for (let elem of topicChecklist) {
        if (elem.topicId === topic._id) {
            inputElem.checked = elem.checked;
            break;
        }
    }

    inputElem.addEventListener("change", () => {

        console.log(`checked ${topic.name}-${topic._id}`);
        let prevState = false;
        if (inputElem.checked) {
            prevState = false;
            console.log("checked")
        }
        else {
            prevState = true;
            console.log("unchecked")
        }

        fetch("/api/enrollments/progress", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                courseId: courseId,
                topicId: topic._id,
                check: inputElem.checked
            })
        }).then((response) => {
            if (!response.ok)
                throw new Error("Couldn't check this topic.");
        }).catch((err) => {
            inputElem.checked = prevState;
            console.error("Error: " + err);
            generateErrorNotification(err);
        });
    });

    topicCheckbox.appendChild(inputElem);

    let topicLabel = document.createElement("label");
    topicLabel.htmlFor = `${section.id}.${topic.id}`
    let checkmarkElem = document.createElement("span");

    topicLabel.addEventListener("click", () => {
        currentSelectedElem.classList.toggle("selected");
        topicElem.classList.toggle("selected");
        currentSelectedElem = topicElem;
        writeLessonContent(section, topic)
    });

    topicLabel.textContent = `${section.id}.${topic.id} ${topic.name}`;

    topicLabel.appendChild(checkmarkElem);
    topicCheckbox.appendChild(topicLabel);

    topicElem.appendChild(topicCheckbox)

    return topicElem;
}

function createSection(section, topics, topicChecklist) {
    let sectionElem = document.createElement("div");
    sectionElem.classList.add("section");

    sectionElem.textContent = `${section.id} ${section.title}`;

    let topicWrapperElem = document.createElement("div");
    topicWrapperElem.classList.add("topic-wrapper");

    for (let topic of topics) {
        let topicElem = createTopic(section, topic, topicChecklist);
        topicWrapperElem.appendChild(topicElem);
    }
    sectionElem.appendChild(topicWrapperElem);

    return sectionElem;
}

function populateCourseContent() {

    fetch(`/api/enrollments/${courseId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        if (!response.ok)
            throw new Error("Couldn't fetch the enrollment information for this course.");
        return response.json();
    }).then((data) => {

        console.log(data);
        if (!data)
            return;

        const { enrollment } = data;

        let sectionsContent = document.getElementById("sections-menu");

        for (const section of courseContent.sections) {
            let sectionElem = createSection(section, section.topics, enrollment.topics);

            sectionsContent.appendChild(sectionElem);
        }

        currentSelectedElem = sectionsContent.firstElementChild.firstElementChild.firstChild;
        currentSelectedElem.classList.toggle("selected");

        writeLessonContent(courseContent.sections[0], courseContent.sections[0].topics[0]);
    }).catch((err) => {
        console.error("Error: " + err);
        generateErrorNotification(err);
    });

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

export function initCourseDetails() {
    const stateData = history.state;

    console.log(stateData);

    courseId = stateData.course._id;

    courseName = stateData.title;
    courseContent = stateData;

    menuClick();
    populateCourseContent();
}