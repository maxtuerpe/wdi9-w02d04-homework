const cards = [
    {
      name: "Bulbasaur",
      damage: 60
    }, {
      name: "Caterpie",
      damage: 40
    }, {
      name: "Charmander",
      damage: 60
    }, {
      name: "Clefairy",
      damage: 50
    }, {
      name: "Jigglypuff",
      damage: 60
    }, {
      name: "Mankey",
      damage: 30
    }, {
      name: "Meowth",
      damage: 60
    }, {
      name: "Nidoran - female",
      damage: 60
    }, {
      name: "Nidoran - male",
      damage: 50
    }, {
      name: "Oddish",
      damage: 40
    }, {
      name: "Pidgey",
      damage: 50
    }, {
      name: "Pikachu",
      damage: 50
    }, {
      name: "Poliwag",
      damage: 50
    }, {
      name: "Psyduck",
      damage: 60
    }, {
      name: "Rattata",
      damage: 30
    }, {
      name: "Squirtle",
      damage: 60
    }, {
      name: "Vulpix",
      damage: 50
    }, {
      name: "Weedle", 
      damage: 40
    }
]
const cardsInPlay = []; 
let handSize;
let rounds = 0;

class Player  {
    constructor(name){
    this.name = name;
    this.hand = [];
    this.points = 0;
    this.roundsWon = 0;
    }
    playCard(index){
     return this.hand[index]
    };
}
const eggbert = new Player('Eggbert')
const computer = new Player('Computer')

let fighter1;
let fighter2;
let winner;
const drawCard = (arr) => {
    let cardsIndex = Math.floor(Math.random() *(cards.length));
    arr.push(cards[cardsIndex]);
    cardsInPlay.push(cards[cardsIndex]);
    cards.splice(cardsIndex, 1);
    return arr;
}
const gameInitiate = (handSize, player1, player2) => {
    for (let i = 0; i < handSize; i++) {
        drawCard(player1.hand);   
        drawCard(player2.hand);   
    }
    fighter1 = player1;
    fighter2 = player2;
    return 'Ready';
}
const resetPoints = (player) => {
  player.points = 0;
}

const attacks = (f1, f2) => {
  let attack1 = f1.hand[rounds].damage;
  let attack2 = f2.hand[rounds].damage;
  if (attack1 > attack2){
      f1.points++;
  }
  if (attack2 > attack1){
      f2.points++;
  }
}
const determineRoundWinner = (f1,f2) => {
    if (f1.points > f2.points){
        f1.roundsWon++;
        winner = f1['name'];
    }f1
    if (f2.points > f1.points){
        f2.roundsWon++;
        winner = f2['name'];
    }
    rounds++;
}
const battle = () => {
    attacks(fighter1, fighter2);
    determineRoundWinner(fighter1,fighter2);
}

function showChoices(){
  $('body').append("<h1>WELCOME TO THE POKEMON BATTLE</h1>");
  $('body').append("<input id='handSize' type='number' value= '0'>how many cards? (1-9)");
  $('body').append('<button id="initilize">INITILIZE</button>');
  
}
const setHandSize = () =>{
  handSize = $('#handSize').val();
}

showChoices();

$('#initilize').on('click', () => {setHandSize(); gameInitiate(handSize, eggbert, computer);
  $('body').append("<button id='start'>start</button>").on('click', startButtonClick);
  $('body').append('<button id="round">next round</button>').on('click',roundButtonClick)})

  
const startButtonClick = () =>{
  if (fighter1.hand.length === 0){
    gameEnd();
  };
  resetPoints(eggbert);
  resetPoints(computer);
}

const roundButtonClick = () =>{
  battle();
  $('body').append(`<p> your score:${eggbert.roundsWon}</p>`);
  $('body').append(`<p> computer score:${computer.roundsWon}</p>`);
}
  
const gameEnd = () => {
  cards.concat(cardsInPlay);
  $('#round').remove()
  $('#start').remove()
}


