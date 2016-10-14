chessApp.controller("skewersController", function ($scope, PuzzleFactory) {

	$scope.skewers = [];
	$scope.puzzles = [];

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;

		for(i in $scope.puzzles){
			if($scope.puzzles[i].tactic == "skewer"){

				$scope.skewers.push($scope.puzzles[i]);

			}
		}

		$(document).ready(function () {

			$scope.index = 0;

			var board = ChessBoard("board", {position: $scope.skewers[0].fen})

			var board = ChessBoard("board", { 
				position: $scope.skewers[$scope.index].fen,
				draggable: true,
				dropOffBoard: "snapback"
			})


			getSkewerIndex = function () {

				return $("#skewerIndex").val()
			}

			getUserFen = function () {

				return board.fen();
			}

			$("#skewerIndex").change(getSkewerIndex, function () {

				var index = getSkewerIndex();
				board = ChessBoard("board", {position: $scope.skewers[index].fen});
			})

			$("#skewerIndex").change(getSkewerIndex, function () {

				$(".correct").addClass("hidden");
				$(".wrong").addClass("hidden");

				$scope.index = getSkewerIndex();
				
				board = ChessBoard("board", { 
					position: $scope.skewers[$scope.index].fen,
					draggable: true,
					dropOffBoard: 'snapback'
				})
			})



			$("#checkAnswer").on("click", function(){

				console.log("solution", $scope.skewers[$scope.index].solution)
				console.log("users answer", getUserFen())

				if (getUserFen() == $scope.skewers[$scope.index].solution){

					$(".correct").removeClass("hidden");
					$(".wrong").addClass("hidden");
				} else {
					$(".wrong").removeClass("hidden");
					$(".correct").addClass("hidden");
				}
			})			
		})
	})
})
