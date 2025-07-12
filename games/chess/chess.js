let board = null;
let game = null;
let currentMode = '2p';

document.addEventListener("DOMContentLoaded", () => {
  game = new Chess();

  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
  });
});

function startTwoPlayer() {
  currentMode = '2p';
  game.reset();
  board.position('start');
}

function startBot(difficulty) {
  currentMode = difficulty;
  game.reset();
  board.position('start');

  if (game.turn() === 'b') {
    setTimeout(makeBotMove, 400);
  }
}

function onDragStart(source, piece) {
  if (game.game_over()) return false;
  if (currentMode !== '2p' && game.turn() === 'b') return false;
  if (currentMode !== '2p' && piece.startsWith('b')) return false;
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q',
  });

  if (move === null) return 'snapback';

  board.position(game.fen());

  if (currentMode !== '2p') {
    setTimeout(makeBotMove, 300);
  }
}

function makeBotMove() {
  const move = getBotMove(currentMode, game);
  if (move) {
    game.move(move);
    board.position(game.fen());
  }
}
