const cards_colors = ["red", "red", "green", "green", "blue", "blue", "brown",
    "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet",
    "violet", "lightgreen", "lightgreen"
]; //colors array

let cards = document.querySelectorAll("div"); //powstaje lista divów
cards = [...cards]; //zamiana listy na tablice
const start_time = new Date().getTime(); //start 

let active_card = ""; //clicked card
const active_cards = [];
const game_pairs = cards.length / 2; //quantity of pairs
let game_result = 0;

const click_card = function () {
    active_card = this;
    if (active_card == active_cards[0]) {
        return;
    }
    active_card.classList.remove("hidden");
    //first card
    if (active_cards == 0) {
        console.log("1");
        active_cards[0] = active_card;
        return;
    }
    //second card
    else {
        cards.forEach(card => card.removeEventListener("click", click_card))
        active_cards[1] = active_card;

        setTimeout(function () {
            if (active_cards[0].className === active_cards[1].className) {
                active_cards.forEach(card => card.classList.add("off"))
                game_result++;
                cards = cards.filter(card => !card.classList.contains("off"))

                if (game_result == game_pairs) {
                    const end_time = new Date().getTime();
                    const game_time = (end_time - start_time) / 1000;
                    alert(`Udało się! Twój wynik to: ${game_time} sek`);
                    location.reload();
                }
            } else {
                active_cards.forEach(card => card.classList.add("hidden"))
            }
            active_card = "";
            active_cards.length = 0;
            cards.forEach(card => card.addEventListener("click", click_card))
        }, 250)
    }
};
const init = function () {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cards_colors.length);
        card.classList.add(cards_colors[position]);
        cards_colors.splice(position, 1);
    })
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", click_card)
        })
    }, 2000)
};
init();