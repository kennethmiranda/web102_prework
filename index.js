/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  /* while loop*/ while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  // create a new div element, which will become the game card
  // add the class game-card to the list
  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
  // append the game to the games-container
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;
    gamesContainer.appendChild(gameCard);
  }
}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");

// use reduce() to count the number of total contributions by summing the backers

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((acc) => {
  return acc + 1;
}, 0);

gamesCard.innerHTML = totalGames.toLocaleString("en-US");

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  // use filter() to get a list of games that have not yet met their goal
  addGamesToPage(unfundedGames);
  console.log(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  // use filter() to get a list of games that have met or exceeded their goal
  addGamesToPage(fundedGames);
  console.log(fundedGames);
  // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.reduce((acc, game) => {
  return acc + (game.pledged < game.goal);
}, 0);
const fundedGames = GAMES_JSON.reduce((acc, game) => {
  return acc + (game.pledged >= game.goal);
}, 0);

const fundedGamesFilter = GAMES_JSON.filter((game) => {
  return game.pledged >= game.goal;
});

const totalFundedRaised = fundedGamesFilter.reduce((acc, fundedGame) => {
  return acc + fundedGame.pledged;
}, 0);

const displayStr = `A total of $${totalFundedRaised.toLocaleString()} has been raised for ${fundedGames} funded games. 
Currently, ${unfundedGames} ${
  unfundedGames < 2 > 0 ? "game remains" : "games remain"
} unfunded. 
We need your help to fund these amazing games!`;

const displayCard = document.createElement("div");
displayCard.classList.add("display-card");
displayCard.innerHTML = `<p>${displayStr}</p>`;

descriptionContainer.appendChild(displayCard);
// use filter or reduce to count the number of unfunded games

// create a string that explains the number of unfunded games using the ternary operator

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame] = sortedGames;
/* console.log(firstGame);
console.log(secondGame); */
const names = [firstGame.name, secondGame.name];
/* console.log(names);
console.log(names[0]);
console.log(names[1]); */

// top funded game
const firstDisplay = document.createElement("div");
firstDisplay.innerHTML = `<p>${names[0]}</p>`;

firstGameContainer.appendChild(firstDisplay);

// runner up
const secondDisplay = document.createElement("div");
secondDisplay.innerHTML = `<p>${names[1]}</p>`;

secondGameContainer.appendChild(secondDisplay);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
