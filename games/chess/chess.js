let board = null;
let game = new Chess();
let currentMode = '2p'; // 'easy', 'medium', 'hard', '2p'

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
    makeBotMove();
  }
}

function onDragStart(source, piece) {
  if (game.game_over()) return false;

  // Only allow white to move in bot mode
  if (currentMode !== '2p' && game.turn() === 'b') return false;

  if (currentMode !== '2p' && piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });

  if (move === null) return 'snapback';

  board.position(game.fen());

  if (currentMode !== '2p') {
    setTimeout(makeBotMove, 400);
  }
}

function makeBotMove() {
  const move = getBotMove(currentMode, game);
  if (move) {
    game.move(move);
    board.position(game.fen());
  }
}

board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
});
