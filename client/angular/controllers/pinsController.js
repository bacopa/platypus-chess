chessApp.controller("pinsController", function ($scope, PuzzleFactory){

	$scope.pins = [];
	$scope.puzzles = [];
	

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;

		for(i in $scope.puzzles){
			if($scope.puzzles[i].tactic == "pin"){

				$scope.pins.push($scope.puzzles[i]);

			}
		}
	
		$(document).ready(function () {

			$scope.index = 0;

			var board = ChessBoard("board", {position: $scope.pins[0].fen})

			var board = ChessBoard("board", { 
				position: $scope.pins[$scope.index].fen,
				draggable: true,
				dropOffBoard: "snapback"
			})


			getPinIndex = function () {

				return $("#skewerIndex").val()
			}

			getUserFen = function () {

				return board.fen();
			}

			$("#skewerIndex").change(getPinIndex, function () {

				var index = getPinIndex();
				board = ChessBoard("board", {position: $scope.pins[index].fen});
			})

			$("#skewerIndex").change(getPinIndex, function () {

				$(".correct").addClass("hidden");
				$(".wrong").addClass("hidden");

				$scope.index = getPinIndex();
				
				board = ChessBoard("board", { 
					position: $scope.pins[$scope.index].fen,
					draggable: true,
					dropOffBoard: 'snapback'
				})
			})



			$("#checkAnswer").on("click", function(){

				console.log("solution", $scope.pins[$scope.index].solution)
				console.log("users answer", getUserFen())

				if (getUserFen() == $scope.pins[$scope.index].solution){

					$(".correct").removeClass("hidden");
					$(".wrong").addClass("hidden");
				} else {
					$(".wrong").removeClass("hidden");
					$(".correct").addClass("hidden");
				}
			})
		})
	})//closes PuzzleFactory.index
})//closee PinsController
