chessApp.controller("sacCityController", function ($scope) {

	$(document).ready(function () {

		var board = ChessBoard("board", { 
			draggable: true,
			dropOffBoard: "snapback",
			position: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR" 
		});

		var obj = {
			position1: board.position(),
		};

		var fen1 = board.fen();

		$("#submitMove").click(function () {

			obj.position2 = board.position();

			if(fen1 == board.fen()){
				console.log("no move made!");
				return;
			}

			getUsersMove(obj);

			//if shape of move is incorrect, slide piece back
			//also update board in case piece was taken
			//to-do: get onDrop to work w/o duplicate animation
			if(!checkMove(obj)){
				board.move(obj.sqTo + "-" + obj.sqFrom);
				board = ChessBoard("board", {
					position: obj.position1,
					draggable: true,
					dropOffBoard: "snapback"					
				});
				return;
			}

			getBlacksPieces(obj);
			getWhitesPieces(obj);
			getProtectedBy(obj);
			var capturesArrBlack = getAllCaptures(obj, "blacks");
			var capturesArrWhite = getAllCaptures(obj, "whites");
			
			// if(capturesArr.length === 1 && capturesArr[0].captures.length === 1){
			// 	board.move(capturesArr[0].sq + "-" + capturesArr[0].captures[0]);
			// } else {
			// 	//getPiecesToCapture(capturesArr, obj);
			// }
			console.log(obj);
			
			getPiecesToCapture(capturesArrBlack, obj);
			getPiecesToCapture(capturesArrWhite, obj);
			obj.position1 = board.position();
		});

	});

});