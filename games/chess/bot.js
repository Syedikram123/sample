function getBotMove(difficulty, game) {
  const moves = game.moves({ verbose: true });

  if (difficulty === 'easy') {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (difficulty === 'medium') {
    // Capture if available
    const captures = moves.filter(m => m.captured);
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (difficulty === 'hard') {
    return minimaxRoot(2, game, true); // depth 2
  }

  return null;
}

// Hard bot logic – simple minimax
function minimaxRoot(depth, game, isMaximizingPlayer) {
  const moves = game.moves({ verbose: true });
  let bestMove = null;
  let bestValue = -Infinity;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    game.move(move);
    const value = minimax(depth - 1, game, -Infinity, Infinity, false);
    game.undo();
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(depth, game, alpha, beta, isMax) {
  if (depth === 0) {
    return evaluateBoard(game.board());
  }

  const moves = game.moves({ verbose: true });

  if (isMax) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(move);
      best = Math.max(best, minimax(depth - 1, game, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      game.move(move);
      best = Math.min(best, minimax(depth - 1, game, alpha, beta, true));
      game.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function evaluateBoard(board) {
  const pieceValue = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0,
  };

  let total = 0;
  for (let row of board) {
    for (let piece of row) {
      if (piece) {
        const val = pieceValue[piece.type];
        total += piece.color === 'w' ? val : -val;
      }
    }
  }
  return total;
}
