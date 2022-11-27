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

reset()

// functions

function itemClick(event) {
	let item = event.target.getAttribute('data-item');
	if(square[item] === '') {
		square[item] = player;

		renderSquare()
		togglePlayer()
	}
}

function reset() {
	warning = '';

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
}


function renderInfo() {
	document.querySelector('.vez').innerHTML = player;
	document.querySelector('.resultado').innerHTML = warning;
};

function togglePlayer() {
	player = (player === 'X') ? 'O' : 'X';
	renderInfo();
}
