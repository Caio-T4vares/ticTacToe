const game = (function () {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const player1 = { name: "Player 1", boardId: 1 }; // 1 === "X"
  const player2 = { name: "Player 2", boardId: 2 }; // 2 === "0"
  let players = [player1, player2];
  let currentPlayer = 0;

  const playRound = (row, column) => {
    let validMove = false;
    if (board[row][column] === 0) {
      board[row][column] = players[currentPlayer].boardId;
      validMove = true;
      const roundResult = verifyWin(
        row,
        column,
        players[currentPlayer].boardId
      );
      if (roundResult === "Win") {
        console.log(`${players[currentPlayer].name} won!`);
        // se ganhar, o jogo acaba.
      } else if (roundResult === "Tie") {
        console.log("That's a tie");
      }
    }
    if (validMove) currentPlayer = (currentPlayer + 1) % 2; // alternar entre os players
  };
  const getBoard = () => board;
  const printBoard = () => {
    let boardStr = "";
    let cont = 0;
    board.map((row) =>
      row.map((el) => {
        boardStr += ` ${el} `;
        cont++;
        if (cont === 3) {
          boardStr += "\n";
          cont = 0;
        }
      })
    );
    console.log(boardStr);
  };
  const verifyWin = (row, column, boardId) => {
    const emptySlots = board.filter((row) => row.filter((slot) => slot === 0));
    if (emptySlots.length === 0) return "Tie"; // if the board don't have empty slots
    let sequenceRow = 0;
    let sequenceColumn = 0;
    let firstDiagonal = 0;
    let secondDiagonal = 0;
    for (let i = 0; i < 3; i++) {
      if (board[row][i] === boardId) sequenceRow++;
      if (board[i][column] === boardId) sequenceColumn++;
      if (board[i][i] === boardId) firstDiagonal++;
      if (board[i][2 - i] === boardId) secondDiagonal++;
      // se for vertical ou horizontal
      if (
        sequenceRow === 3 ||
        sequenceColumn === 3 ||
        firstDiagonal === 3 ||
        secondDiagonal === 3
      )
        return "Win";
    }
    return "Not win";
  };

  return { playRound, getBoard, printBoard };
})();
