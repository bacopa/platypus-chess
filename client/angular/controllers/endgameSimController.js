chessApp.controller("endgameSimController", function ($scope){


	$(document).ready(function () {


		var obj = {};

		$("#submitMove").click(function () {

		// var goKing = function (){
			obj.fen2 = board.fen();

			//chessObject.js for getNotation to find illegal move
			findMovedPiece(obj);

			//queenCheckmate.js
			//if illegal shape or king moves next to king, move piece back and end function
			getAttackedSquares(obj);

			if(obj.illegal){
				board.move( obj.fileTo + obj.rankTo + "-" + obj.fileFrom + obj.rankFrom);
				obj.illegal = false;
				return;
			} else {
				board.move(obj.blackKingSq + "-" + obj.blackKingMoveTo);
			}

			
			obj.fen1 = board.fen(); 
			obj.blackKingMoveTo = null;
		// };
		});

		var config = { 
			draggable: true,
			dropOffBoard: "snapback",
			position: "8/8/8/4k3/8/8/8/KQ6"
			// onDrop: goKing
		};

		var board = ChessBoard("board", config);

		obj.fen1 = board.fen();
		// var onDrop = function () {
		// 	goKing();
		// };

	});
});
//logic flaw that allows black king to move to edge