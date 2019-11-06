let squaresPerSides = 16;
const container     = document.querySelector(".container");

const createGrid = squaresPerSides => {
  let numberOfSquares = squaresPerSides ** 2;

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");

    square.classList.add("grid__square");
    square.classList.add(`grid__square--${i}`);
    container.appendChild(square);
  }

  let squareSize = Math.floor(container.clientWidth / squaresPerSides);
  let squares = document.getElementsByClassName("grid__square");  

  for (square of squares) {
    square.style.width  = squareSize + "px";
    square.style.height = squareSize + "px";
  }
}

const changeSquareColor = () => {
  const target = this.event.target;
  let red      = Math.floor(Math.random() * (255 - 0 + 1));
  let green    = Math.floor(Math.random() * (255 - 0 + 1));
  let blue     = Math.floor(Math.random() * (255 - 0 + 1));

  if (target.classList.contains("grid__square")) {
    if (target.style.background !== '' && ! ("randomColor" in target.dataset)) {
      target.setAttribute("data-random-color", [red, green, blue]);
    }
    target.style.background = `rgb(${red}, ${green}, ${blue})`;
  }
}

const addButton = () => {
  const button = document.createElement("button");
  button.textContent = "Clear Board";

  button.classList.add("button", "button__clear");
  container.before(button);
  button.addEventListener('click', clearBoard);
}

const clearBoard = () => {
  const squares = document.getElementsByClassName("grid__square"); 

  for (square of squares) {
    square.style.background = '';
  }
  
  newRowSize = getUserInput();
  squaresPerSides = newRowSize;

  createGrid(squaresPerSides);
}

const getUserInput = (text = '') => {
  if (text === '') {
    text = "How many squares per side would you like for your new grid?";
  }

  let userInput = parseInt(prompt(text, 16), 10);

  // Checks for the input
  if (typeof userInput !== "number" || isNaN(userInput)) {
    getUserInput("Please enter a number");
  } else if ( userInput <= 0 || userInput >= 100 ) {
    getUserInput("Your number cannot be negative or bigger than 100");
  }

  return Math.floor(userInput);
}
 
createGrid(squaresPerSides);
container.addEventListener("mouseover", changeSquareColor);
addButton();
