
import {Controller} from "@hotwired/stimulus";
import {Chess } from "chess.js";

const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

export default class extends Controller {
  static targets = ["board"];

  connect() {
    console.log('connected')
    this.highlightStyles = document.createElement("style");
    document.head.append(this.highlightStyles);
    this.addEventsToBoard(this.boardTarget);

    this.updateMoves();
  }

  updateMoves() {
    const fen = this.boardTarget.getAttribute('position');

    this.game = new Chess(fen);
  }

  addEventsToBoard(board) {
    this.addDragToBoard(board);
  }

  addDragToBoard(board) {
    board.addEventListener("drag-start", (e) => {
      const { source, piece, position, orientation } = e.detail;

      if (this.game.game_over()) {
        // do not pick up pieces if the game is over
        e.preventDefault();
        return;
      }

      if (
        // only pick up pieces for the side to move
        (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (this.game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        e.preventDefault();
        return;
      }
    });

    board.addEventListener("drop", (e) => {
      this.removeGreySquares();
      const { source, target, setAction } = e.detail;

      const move = this.game.move({
        from: source,
        to: target,
        promotion: "q",
      });

      if (move === null) {
        // illegal move
        setAction("snapback");
      }

      this.updateStatus();
    });

    board.addEventListener("snap-end", (e) => {
      // for castling, en passant, pawn promotion
      this.boardTarget.setPosition(this.game.fen());
    });

    board.addEventListener("mouseover-square", (e) => {
      const { square, piece } = e.detail;

      const moves = this.game.moves({
        square: square,
        verbose: true,
      });

      if (moves.length === 0) {
        return;
      }

      this.greySquare(square);

      for (const move of moves) {
        this.greySquare(move.to);
      }
    });

    board.addEventListener("mouseout-square", (e) => {
      this.removeGreySquares();
    });
  }

  removeGreySquares() {
    this.highlightStyles.textContent = "";
  }

  greySquare(square) {
    const highlightColor =
      square.charCodeAt(0) % 2 ^ square.charCodeAt(1) % 2
        ? whiteSquareGrey
        : blackSquareGrey;

    this.highlightStyles.textContent += `
      chess-board::part(${square}) {
        background-color: ${highlightColor};
      }
    `;
  }

  updateStatus() {
    let status = "";

    let moveColor = "White";
    if (this.game.turn() === "b") {
      moveColor = "Black";
    }

    if (this.game.in_checkmate()) {
      status = `Game over, ${moveColor} is in checkmate.`;
    } else if (this.game.in_draw()) {
      status = "Game over, drawn position";
    } else {
      status = `${moveColor} to move`;

      if (this.game.in_check()) {
        status += `, ${moveColor} is in check`;
      }
    }
  }
}
