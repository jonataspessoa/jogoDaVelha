//datas
let square = {
	a1: '', a2: '', a3: '',
	b1: '', b2: '', b3: '',
	c1: '', c2: '', c3: ''
};


//events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach((item)=>{
	item.addEventListener('click', itemClick);
});

let player = '';
let warning = '';
let playing = 'false';


reset();
// functions

function itemClick(event) {
	let item = event.target.getAttribute('data-item');
	if(playing && square[item] === '') {
		square[item] = player;
		renderSquare()
		togglePlayer()
	}
}

function reset() {
	let random = Math.floor(Math.random() * 2)
	player = (random === 0) ? 'X' : 'O';

	for (let i in square) {
		square[i] = '';
	}

	playing = true;

	renderSquare();
	renderInfo();
}


function renderSquare() {
	for ( let n in square) {
		let item = document.querySelector(`div[data-item=${n}`);
			item.innerHTML = square[n];
	}
	checkGame()
}


function renderInfo() {
	document.querySelector('.vez').innerHTML = player;
	document.querySelector('.resultado').innerHTML = warning;
};

function togglePlayer() {
	player = (player === 'X') ? 'O' : 'X';
	renderInfo();
}


function checkGame() {
	if(checkWinnerFor('X')) {
		warning = '"X" venceu!';
		playing = false;
	} else if (checkWinnerFor('O')) {
		warning = '"O" venceu!';
		playing = false;
	} else if (isFull()) {
		warning = 'Empate!'
		playing = false;
	}
}


function checkWinnerFor(player) {
	let endGame = [
		'a1,a2,a3',
		'b1,b2,b3',
		'c1,c2,c3',

		'a1,b1,c1',
		'a2,b2,c2',
		'a3,b3,c3',

		'a1,b2,c3',
		'a3,b2,c1'
		];

		for(let k in endGame) {
		let posEnd = endGame[k].split(',');
		let win = posEnd.every(option => square[option] === player);
			if(win) {
			return true;
		}
	}	
	return false;
}

function isFull() {
	for(let i in square) {
		if(square[i] === '') {
			return false;
		}
	}
	return true;
}