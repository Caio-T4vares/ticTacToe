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
  const displayTurn = (roundResult) => {
    const turnElement = document.querySelector(".current-turn");
    turnElement.textContent =
      roundResult === "Not win" ? `${players[currentPlayer].name} turn!` : "";
  };
  const displayResult = (roundResult) => {
    if (roundResult === "Win") {
      const resultEl = document.querySelector(".result");
      resultEl.textContent = `${players[currentPlayer].name} won!`;
      //
      disableBoard();
    } else if (roundResult === "Tie") {
      const resultEl = document.querySelector(".result");
      resultEl.textContent = `That's a tie!`;
      disableBoard();
    }
  };
  displayTurn("Not win");
  const playRound = (row, column) => {
    let roundResult = "";
    if (board[row][column] === 0) {
      board[row][column] = players[currentPlayer].boardId;
      validMove = true;
      roundResult = verifyWin(row, column, players[currentPlayer].boardId);
      if (roundResult === "Win") {
        console.log(`${players[currentPlayer].name} won!`);
        // se ganhar, o jogo acaba.
      } else if (roundResult === "Tie") {
        console.log("That's a tie");
      }
      displayTurn(roundResult);
      displayResult(roundResult);
      currentPlayer = (currentPlayer + 1) % 2; // alternar entre os players
    }
    return roundResult;
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
    let cont = 0;
    board.map((row) =>
      row.map((slot) => {
        if (slot === 0) cont++;
      })
    );

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
      if (cont === 0) return "Tie"; // if the board don't have empty slots
    }
    return "Not win";
  };
  const slots = document.querySelectorAll(".slot");
  const clickedArr = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  const disableBoard = () => {
    slots.forEach((slot) => {
      slot.setAttribute("disabled", true);
    });
  };
  slots.forEach((slot) => {
    slot.addEventListener("click", (e) => {
      const row = e.target.classList.item(1).slice(0, 1);
      const column = e.target.classList.item(1).slice(2);
      let roundResult = playRound(row, column);
      if (roundResult) {
        e.target.classList.remove("onmouse");
        let real = (currentPlayer + 1) % 2;
        e.target.textContent = players[real].boardId === 1 ? "X" : "O";
        clickedArr[row][column] = true;
      } else {
        clickedArr[row][column] = false;
      }
    });
    slot.addEventListener("mouseover", (e) => {
      if (e.target.textContent == "") {
        e.target.textContent = players[currentPlayer].boardId === 1 ? "X" : "O";
        e.target.classList.add("onmouse");
      }
    });
    slot.addEventListener("mouseout", (e) => {
      const row = e.target.classList.item(1).slice(0, 1);
      const column = e.target.classList.item(1).slice(2);
      if (!clickedArr[row][column]) {
        e.target.textContent = "";
        e.target.classList.remove("onmouse");
      }
    });
  });
  const resetBoard = () => {
    slots.forEach((slot) => {
      currentPlayer = 0;
      slot.textContent = "";
      slot.removeAttribute("disabled");
    });
    board.forEach((row) => {
      row[0] = 0;
      row[1] = 0;
      row[2] = 0;
    });
    clickedArr.forEach((val) => {
      val[0] = false;
      val[1] = false;
      val[2] = false;
    });
    const resultEl = document.querySelector(".result");
    resultEl.textContent = "";
  };
  const restartBtn = document.querySelector(".restart-btn");
  restartBtn.addEventListener("click", resetBoard);
  return { playRound, getBoard, printBoard, clickedArr };
})();
