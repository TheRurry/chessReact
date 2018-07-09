import Chess from 'chess.js'

let observer = null;
let chess = new Chess();
let teams = {
    'w': "white",
    'b': "black"
}

console.log("It is the " + teams[chess.turn()] + " team's turn.")

function emitChange() {
    observer(chess);
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
}

export function convertPosition(pos) {
    let alph = "abcdefgh"
    return alph[pos.x].concat(pos.y + 1)
}

export function movePiece(from, to) {
    let piece = ''
    if (canMovePiece(from, to) > 1 ){
        piece='q';
    }

    let move = {
        "from": convertPosition(from),
        "to": convertPosition(to),
        "promotion": piece
    }

    chess.move(move);
    

    if (chess.game_over()) {
        alert("The " + teams[chess.turn()] + " team has lost!");
        chess.reset();
    }  else {
        console.log("It is the " + teams[chess.turn()] + " team's turn.")
    }

    emitChange();
}

export function canMovePiece(from, to) {
    let moves = chess.moves({
        square: convertPosition(from)
    });
    console.log(moves);
    let canCastle = Math.abs(to.x - from.x) === 2;
    let legalMoves = moves.filter(move => move.includes(convertPosition(to)));
    return legalMoves.length;
}