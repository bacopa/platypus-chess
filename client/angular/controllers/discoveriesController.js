chessApp.controller("discoveriesController", function ($scope, PuzzleFactory) {

	$scope.discoveries = [];
	$scope.puzzles = [];

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;

		for(i in $scope.puzzles){
			if($scope.puzzles[i].tactic == "discovered"){

				$scope.discoveries.push($scope.puzzles[i]);

			}
		}

		$(document).ready(function () {

			//intially set first puzzle to index 0
			$scope.index = 0;

			var board = ChessBoard("board", { 
				position: $scope.discoveries[$scope.index].fen,
				draggable: true,
				dropOffBoard: "snapback"
			})


			getDiscoveryIndex = function () {

				return $("#discoveryIndex").val();
			}


			getUserFen = function () {

				return board.fen();
			}

			$("#discoveryIndex").change(getDiscoveryIndex, function () {

				$(".correct").addClass("hidden");
				$(".wrong").addClass("hidden");

				$scope.index = getDiscoveryIndex();
				
				board = ChessBoard("board", { 
					position: $scope.discoveries[$scope.index].fen,
					draggable: true,
					dropOffBoard: 'snapback'
				})
			})


			$("#checkAnswer").on("click", function(){

				console.log("solution", $scope.discoveries[$scope.index].solution)
				console.log("users answer", getUserFen())

				if (getUserFen() == $scope.discoveries[$scope.index].solution){

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