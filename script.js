const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let moveHistory = [];

function handleClick(index) {
  if (!gameOver && board[index] === '') {
    moveHistory.push({ index, player: currentPlayer });
    board[index] = currentPlayer;
    render();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById('status-message').textContent = `${currentPlayer} wins!`;
      gameOver = true;
      winningCells.forEach(cellId => {
        document.getElementById(cellId).classList.add('winner');
      });
      
      return;
    }
  }

  if (!board.includes('')) {
    document.getElementById('status-message').textContent = 'It\'s a tie!';
    gameOver = true;
  }
}

function resetGame() {
  board.fill('');
  currentPlayer = 'X';
  gameOver = false;
  moveHistory = [];
  render();
  document.getElementById('status-message').textContent = '';
}

function undoMove() {
  if (moveHistory.length > 0 && !gameOver) {
    const lastMove = moveHistory.pop();
    board[lastMove.index] = '';
    currentPlayer = lastMove.player;
    render();
    document.getElementById('status-message').textContent = '';
  }
}

function replyGame() {
  resetGame();
  moveHistory.forEach(({ index }) => handleClick(index));
}

function announceWinner(winner, winningCells) {
  document.getElementById("status-message").innerText = `${winner} wins!`;
  winningCells.forEach(cellIndex => {
    document.getElementById(`cell-${cellIndex}`).classList.add("winner");
  });
}
