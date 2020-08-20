const cards_colors = ["red", "red", "green", "green", "blue", "blue", "brown",
"brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet",
"violet", "lightgreen", "lightgreen"]; // tablica kolorów

let cards = document.querySelectorAll("div"); //powstaje lista divów
cards = [...cards];//zamiana listy na tablice
const start_time = new Date().getTime();// rozpoczyna liczenie czasu

let active_card= "";  //karta kliknięta
const active_cards = []; //tablica która zapisuje kliniete karty
const game_pairs = cards.length/2; //oblicza ilosc par
let game_result= 0; //ilosc par znalezionych

const click_card = function () 
{
active_card = this;
if (active_card== active_cards[0])
{
    return;//czy to nie ten sam obrazek
}
active_card.classList.remove("hidden"); //zabiera ukrycie z karty
//pierwszy obrazek
if (active_cards == 0)
{
    console.log("1");
    active_cards[0] =active_card;
    return;
}
//drugi obrazek
else
{
    console.log("2");
    cards.forEach(card=>card.removeEventListener("click", click_card))
    active_cards[1] = active_card;
    console.log(active_cards)
    //zwyciestwo/porazka mini gry
    setTimeout(function()
    {
    if(active_cards[0].className === active_cards[1].className)
    {
        active_cards.forEach(card=> card.classList.add("off"))
        game_result++;
        cards= cards.filter(card=> !card.classList.contains("off"))
        // ostateczne zwyciestwo
        if(game_result== game_pairs)
        {
            const end_time= new Date().getTime();
            const game_time = (end_time - start_time)/1000;
            alert(`Udało się! Twój wynik to: ${game_time} sek`);
            location.reload();
        }
    }
    else
    {
        active_cards.forEach(card=> card.classList.add("hidden"))
    }
    // kolejny start minigry 
    active_card ="";
    active_cards.length=0;
    cards.forEach(card=>card.addEventListener("click",click_card))
    },250)
}
};
const init = function () //funkcja startowa
{
    cards.forEach(card=> //funkcja strzałkowa uzywana gdy nie mamy nazwy funkcji
    {
    const position =Math.floor(Math.random() * cards_colors.length);//losuje diva
    card.classList.add(cards_colors[position]);//przypisuje divovi klase/kolor
    cards_colors.splice(position, 1);// usuwa z tablicy wartość
    })
    setTimeout(function() 
    {
    cards.forEach(card=>
    {
    card.classList.add("hidden") // nadaje klase schowany
    card.addEventListener("click", click_card) //włącza nasłuchiwanie
    })
    },2000)
};
init();