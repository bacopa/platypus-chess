chessApp.controller("practiceController", function ($scope, PuzzleFactory){

	$scope.puzzles = [];
	var randomNum = Math.floor(Math.random() * $scope.puzzles.length);

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;
	
		$(document).ready(function () {

			getRandomNum();
			function getRandomNum() {

				randomNum = Math.floor(Math.random() * $scope.puzzles.length);
			} 

			var board = ChessBoard("board", { 
				draggable: true,
				dropOffBoard: "snapback",
				legalShape: true,
				legalShapeDrag: "snapback",
				position: $scope.puzzles[randomNum].fen 
			});

			var chessObj = {

				fen1: $scope.puzzles[randomNum].fen,
			}


			$("#changePuzzle").click(function () {
				
				getRandomNum();
				
				board = ChessBoard("board", { 
					draggable: true,
					dropOffBoard: "snapback",
					legalShape: true,
					legalShapeDrag: "snapback",
					position: $scope.puzzles[randomNum].fen, 

				});

				chessObj.fen1 = $scope.puzzles[randomNum].fen;
				console.log(chessObj);

			})
			
			$("#getNotation").click(function () {
				chessObj.fen2 = board.fen();
				console.log(findMovedPiece(chessObj));
				console.log("legalShape:", legalShape(chessObj));
				
				if(!chessObj.legalShape){
					board.legalShape = false;
					$("#illegalMoveImg").slideUp();

				}
					console.log(board.legalShape)

				//console.log("squares moved across:", chessObj.squares);

				// console.log(jumpedOverPiece(getSquares(chessObj)))
			})




		})

	});

})