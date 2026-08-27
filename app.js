const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('.reset-btn');
const newGame = document.querySelector('.new-game');
let winnerMsg = document.querySelector('#winnerMsg');
let msgContainer = document.querySelector('.msg')

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const resetGame = () => {
    turnX = true;
    count = 0;
    enableBtns();
    msgContainer.classList.add('hide');
    resetBtn.classList.remove('hide');
}
const enableBtns = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
        box.classList.remove('winner');
    }
}

for (let box of boxes) {
    box.addEventListener('click', () => {
        if (turnX) {
            box.innerText = 'X';
            turnX = false;
        } else {
            box.innerText = 'O';
            turnX = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            Draw();
        }
    })
}

const showWinner = winner => {
    winnerMsg.innerText = `Boom! Player ${winner} gets the win. Well played!`;
    msgContainer.classList.remove('hide');
    resetBtn.classList.add('hide');
    for (let box of boxes) {
        box.disabled = true;
    }

}
const Draw = () => {
    winnerMsg.innerText = `It's a tie! Great minds think alike.🤜🤛`;
    msgContainer.classList.remove('hide');
    resetBtn.classList.add('hide');
    for (let box of boxes) {
        box.disabled = true;
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let place1Val = boxes[pattern[0]].innerText;
        let place2Val = boxes[pattern[1]].innerText;
        let place3Val = boxes[pattern[2]].innerText;

        if (place1Val !== '' && place2Val !== '' && place3Val !== '') {
            if (place1Val === place2Val && place2Val === place3Val) {
                boxes[pattern[0]].classList.add('winner');
                boxes[pattern[1]].classList.add('winner');
                boxes[pattern[2]].classList.add('winner');
                showWinner(place1Val);
                return true;
            }
        }
    } return false;
}

resetBtn.addEventListener('click', resetGame)
newGame.addEventListener('click', resetGame)

