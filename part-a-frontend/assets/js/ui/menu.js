class codeMenuCard{
    constructor(langName, desc){
        this.name = langName;
        this.description = desc;
    }
}

let cardsList = [
    new codeMenuCard("C++", "Perfect language"),
    new codeMenuCard("Python", "Meh"),
    new codeMenuCard("Javascript", "JSON slander"),
    new codeMenuCard("Rust", "Compiler show compassion plz")
];

function createCardElem(cardInfo){
    let cardElem = document.createElement("div");
    cardElem.classList.add("lesson_card");

    let title = document.createElement("h2");
    title.classList.add("card_title");
    title.textContent = cardInfo.name;

    let description = document.createElement("p");
    description.classList.add("card_desc");
    description.textContent = cardInfo.description;

    cardElem.appendChild(title);
    cardElem.appendChild(description);

    let learn_button = document.createElement("button");
    learn_button.classList.add("card_learn_btn");
    learn_button.textContent = "Learn " + cardInfo.name

    cardElem.appendChild(learn_button);

    return cardElem;
}

function populateCards(cardsListInfo){
    let cardContainer = document.getElementById("card_container");

    cardsListInfo.forEach(card => {
        cardContainer.appendChild(createCardElem(card));
    });
}

window.onload = () => {
    populateCards(cardsList);
};