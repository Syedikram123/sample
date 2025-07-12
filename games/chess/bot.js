function getBotMove(difficulty, gameInstance) {
  const possibleMoves = gameInstance.moves();

  if (gameInstance.game_over() || possibleMoves.length === 0) return null;

  if (difficulty === 'easy') {
    return randomMove(possibleMoves);
  }

  if (difficulty === 'medium') {
    return bestCaptureMove(gameInstance) || randomMove(possibleMoves);
  }

  if (difficulty === 'hard') {
    return minimaxRoot(2, gameInstance, true);
  }

  return randomMove(possibleMoves);
}

function randomMove(moves) {
  const index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

function bestCaptureMove(game) {
  const moves = game.moves({ verbose: true });
  const captureMoves = moves.filter(move => move.captured);
  return captureMoves.length > 0 ? captureMoves[Math.floor(Math.random() * captureMoves.length)].san : null;
}

// Basic Minimax for 'hard' mode
function minimaxRoot(depth, game, isMaximizing) {
  const moves = game.moves();
  let bestMove = null;
  let bestValue = -9999;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    game.move(move);
    const value = minimax(depth - 1, game, -10000, 10000, !isMaximizing);
    game.undo();

    if (value >= bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}

function minimax(depth, game, alpha, beta, isMaximizingPlayer) {
  if (depth === 0) return -evaluateBoard(game);

  const moves = game.moves();

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (let move of moves) {
      game.move(move);
      const evalScore = minimax(depth - 1, game, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of moves) {
      game.move(move);
      const evalScore = minimax(depth - 1, game, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function evaluateBoard(game) {
  const fen = game.fen();
  const board = fen.split(' ')[0];
  const pieceValues = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0
  };

  let score = 0;
  for (let char of board) {
    if (char >= '1' && char <= '8') continue;
    const isUpper = char === char.toUpperCase();
    const piece = char.toLowerCase();
    const value = pieceValues[piece] || 0;
    score += isUpper ? value : -value;
  }

  return score;
}
