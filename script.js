let board = {
	a1:'', a2:'',a3:'',
	b1:'', b2:'', b3:'',
	c1:'', c2:'', c3:''
};


let player = '';
let warning = '';
let playing = 'false';

reset()

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach((item) =>{
	item.addEventListener('click', itemSelector);
})

function itemSelector(event) {
	let item = event.target.getAttribute('data-item');
	if(playing && board[item] === '') {
		board[item] = player;
	}
	renderBoard();
	changePlayer();
}


function reset() {
	warning = '';

	let random = Math.floor(Math.random() * 2);
	player = (random === 0) ? 'X' : 'O';

	for(let i in board) {
		board[i] = '';
	}

	playing = true;

	renderInfo();
	renderBoard();
}


function renderInfo() {
	document.querySelector('.vez').innerHTML = player;
	document.querySelector('.resultado').innerHTML = warning;
}


function renderBoard() {
	for(let i in board) {
		let item = document.querySelector(`div[data-item=${i}`);
		item.innerHTML = board[i];
	}
	checkEnd()
}

function changePlayer() {
	player = (player === 'X') ? 'O' : 'X';
	renderInfo();
}

function checkEnd() {
	if(checkEndGame('X')) {
		warning = '"X" venceu!';
		playing = false;
	} else if (checkEndGame('O')) {
		warning = '"O" venceu!';
		playing = false;
	} else if (isFull()) {
		warning = 'Empate!';
		playing = false;
	}
}


function checkEndGame(player) {
	let end = [
		'a1,a2,a3',
		'b1,b2,b3',
		'c1,c2,c3',

		'a1,b1,c1',
		'a2,b2,c2',
		'a3,b3,c3',

		'a1,b2,c3',
		'a3,b2,c1'	
		];

	for(let k in end) {
		let endGame = end[k].split(',');
		let win = endGame.every(options => board[options] === player);
			if(win) {
				return true;
			}
		}
		return false;
}

function isFull() {
	for (let i in board) {
		if(board[i] === '') {
			return false;
		}
	}
	return true;
}

