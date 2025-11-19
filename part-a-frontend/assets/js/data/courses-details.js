const cppCourseContent = {
    title: "C++ Fundamentals: The Core Language",
    description: "An introduction to the power and efficiency of C++, covering basic syntax, memory management, and fundamental data structures.",
    sections: [
        {
            id: 0,
            title: "Getting Started and Basic Syntax",
            topics: [
                {
                    id: 0,
                    name: "Hello World and I/O",
                    content: `The essential first program. C++ uses streams for input/output.
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
* **std::cout**: Standard character output stream.
* **std::endl**: Inserts a newline character and flushes the output buffer.
`
                },
                {
                    id: 1,
                    name: "Variables and Data Types",
                    content: `C++ is strongly typed. Common types include:
* **int**: Integers (e.g., 5, -10).
* **double/float**: Floating-point numbers (e.g., 3.14).
* **bool**: Boolean values (true or false).
* **char**: Single characters (e.g., 'A').
* **string**: Text (requires the <string> header).
`
                }
            ]
        },
        {
            id: 1,
            title: "Control Flow and Functions",
            topics: [
                {
                    id: 0,
                    name: "If/Else and Switch Statements",
                    content: `Controls the flow of execution.
if (condition) {
    // code runs if true
} else {
    // code runs if false
}
The 'switch' statement is used for multiple branch options based on an integer or enumeration value.`
                },
                {
                    id: 1,
                    name: "Loops: For and While",
                    content: `Used for repetitive execution.
for (int i = 0; i < 5; ++i) {
    // runs 5 times
}
while (condition) {
    // runs as long as condition is true
}`
                },
                {
                    id: 2,
                    name: "Defining and Calling Functions",
                    content: `Functions group code for reuse.
int add(int a, int b) {
    return a + b;
}
To use: int result = add(10, 5);`
                }
            ]
        },
        {
            id: 2, // Changed from 3 to 2
            title: "Introduction to Pointers and Memory",
            topics: [
                {
                    id: 0,
                    name: "What are Pointers?",
                    content: `Pointers are variables that store the memory address of another variable. They are the core feature that gives C++ its power and performance control.
* **& (Address-of operator)**: Gives the memory address of a variable.
* **\* (Dereference operator)**: Accesses the value stored at the memory address.`
                },
                {
                    id: 1,
                    name: "Dynamic Memory Allocation",
                    content: `Used to allocate memory at runtime on the heap.
int* ptr = new int; // Allocate a single integer
delete ptr; // Must be manually freed!
Failure to use 'delete' leads to memory leaks.`
                }
            ]
        }
    ]
};

const pythonCourseContent = {
    title: "Python Fundamentals: Dynamic Scripting",
    description: "An introduction to Python's concise syntax, dynamic typing, and key data structures, essential for data science and web development.",
    sections: [
        {
            id: 0,
            title: "Syntax and Data Structures",
            topics: [
                {
                    id: 0,
                    name: "Variables and Indentation",
                    content: `Python uses **dynamic typing** (no explicit type declaration). **Indentation** (whitespace) defines code blocks, replacing curly braces {}.
my_var = 42  # int
name = "Alice"  # str`
                },
                {
                    id: 1,
                    name: "Lists and Tuples",
                    content: `**Lists** are mutable (changeable) arrays: list = [1, 2, 3].
**Tuples** are immutable (unchangeable) arrays: tuple = (1, 2, 3).`
                },
                {
                    id: 2,
                    name: "Dictionaries",
                    content: `Key-value pairs (like JS objects/Maps).
d = {'key': 'value', 'count': 5}
print(d['key']) # Access by key`
                }
            ]
        },
        {
            id: 1,
            title: "Control Flow and Functions",
            topics: [
                {
                    id: 0,
                    name: "If/Elif/Else",
                    content: `Conditional logic, defined by indentation.
if x > 10:
    print("Large")
elif x > 5:
    print("Medium")
else:
    print("Small")`
                },
                {
                    id: 1,
                    name: "Loops: For and While",
                    content: `The 'for' loop often iterates over an iterable (like a list) using 'in'.
for item in [1, 2, 3]:
    print(item)
# While loop is used when the number of iterations is unknown.`
                },
                {
                    id: 2,
                    name: "Defining Functions",
                    content: `Functions are defined using the 'def' keyword.
def greet(name):
    return f"Hello, {name}"`
                }
            ]
        }
    ]
};

const javascriptCourseContent = {
    title: "JavaScript Fundamentals: The Language of the Web",
    description: "Learn the core concepts of client-side programming, including asynchronous operations and prototypal inheritance.",
    sections: [
        {
            id: 0,
            title: "Basics and Variables (ES6+)",
            topics: [
                {
                    id: 0,
                    name: "Scope: let, const, and var",
                    content: `Use **const** for variables that won't be reassigned. Use **let** for variables that will change. **var** is legacy and should be avoided due to global/function scope issues.`
                },
                {
                    id: 1,
                    name: "Objects and JSON",
                    content: `Objects are key-value collections. **JSON** (JavaScript Object Notation) is the standard data exchange format.
const user = { name: "Max", age: 30 };
console.log(user.name);`
                },
                {
                    id: 2,
                    name: "Arrays and Methods",
                    content: `Arrays are dynamic lists. Key array methods include **map()**, **filter()**, and **reduce()** for functional programming.`
                }
            ]
        },
        {
            id: 1,
            title: "Asynchronous JavaScript",
            topics: [
                {
                    id: 0,
                    name: "Promises",
                    content: `An object representing the eventual completion (or failure) of an asynchronous operation. They manage eventual success (.then) or failure (.catch).`
                },
                {
                    id: 1,
                    name: "Async/Await",
                    content: `Syntax sugar built on top of Promises to make asynchronous code look and behave more like synchronous code, improving readability.`
                },
                {
                    id: 2,
                    name: "Fetch API",
                    content: `The modern standard for making HTTP requests (e.g., getting JSON data).
async function getData() {
    const response = await fetch('/api/data');
    const data = await response.json();
}`
                }
            ]
        }
    ]
};

const rustCourseContent = {
    title: "Rust Fundamentals: Safety and Performance",
    description: "A deep dive into Rust's core philosophy, focusing on ownership, borrowing, and the memory safety guarantees that distinguish it.",
    sections: [
        {
            id: 0,
            title: "Basic Syntax and Tooling",
            topics: [
                {
                    id: 0,
                    name: "Cargo and Crates",
                    content: `**Cargo** is Rust's build system and package manager. A **Crate** is a compilation unit (either a binary executable or a library).
To build: 'cargo build'
To run: 'cargo run'`
                },
                {
                    id: 1,
                    name: "Variables and Mutability",
                    content: `Variables are **immutable** by default (like 'const' in JS). To make a variable changeable, you must explicitly use the **mut** keyword.
let x = 5;      // Immutable
let mut y = 5;  // Mutable`
                }
            ]
        },
        {
            id: 1,
            title: "The Ownership System",
            topics: [
                {
                    id: 0,
                    name: "Ownership Rules",
                    content: `1. Each value has a variable that is its owner.
2. There can only be **one owner** at a time.
3. When the owner goes out of scope, the value is dropped (memory is freed).`
                },
                {
                    id: 1,
                    name: "Borrowing",
                    content: `Allows a function to use a value without taking ownership. Done using references (&).
let x = String::from("hello");
// Pass a reference (&x), not the value itself
fn calculate_len(s: &String) { ... }`
                }
            ]
        }
    ]
};

var courseName = null;
var courseContent = null;
var currentSelectedElem = null;

const courseMap = new Map([
    ["cpp", cppCourseContent],
    ["python", pythonCourseContent],
    ["javascript", javascriptCourseContent],
    ["rust", rustCourseContent]
]);

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

    topicElem.addEventListener("click", () => {
        currentSelectedElem.classList.toggle("selected");
        topicElem.classList.toggle("selected");
        currentSelectedElem = topicElem;
        writeLessonContent(section, topic)
    });

    topicElem.textContent = `${section.id}.${topic.id} ${topic.name}`;

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

    menuBtn.addEventListener("click", () => {
        let sectionMenu = document.getElementById("sections-menu");
        sectionMenu.classList.toggle("visible");
        menuBtn.classList.toggle("menu-visible");
    });
}

window.onload = () => {

    const params = new URLSearchParams(window.location.search);
    courseName = params.get("course");

    courseContent = courseMap.get(courseName);

    populateCourseContent(courseName)
    menuClick();
};