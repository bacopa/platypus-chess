chessApp.controller("queenAIController", function ($scope, PuzzleFactory) {

	$(document).ready(function () {

		var board = ChessBoard("board", { 
			draggable: true,
			dropOffBoard: "snapback",
			position: "1QK5/8/8/3k4/8/8/8/8" 
		});

		var obj = {};
		obj.fen1 = board.fen();

		$("#submitMove").click(function () {


			obj.fen2 = board.fen();

			//calls getNotation in chessObject.js to find illegal move
			findMovedPiece(obj);

			//queenCheckmate.js
			//if illegal shape or king moves next to king, move piece back and end function
			getAttackedSquares(obj);
			
			//queenAI.js
			var move = getMove(obj);

			if(obj.illegal){
				board.move(obj.fileTo + obj.rankTo + "-" + obj.fileFrom + obj.rankFrom);
				obj.illegal = false;
				return;
			} else {
				board.move(move);
			}


			obj.fen1 = board.fen();

			//update positions
			update3Pieces(obj, board.position());
			getSquaresAttackedByQueen(obj);


			obj.blackKingMoveTo = null;


		})

	});
	
})