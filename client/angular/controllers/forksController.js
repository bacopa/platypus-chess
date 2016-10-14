chessApp.controller("forksController", function ($scope, PuzzleFactory) {

	$scope.forks = [];
	$scope.puzzles = [];

	

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;

		for(i in $scope.puzzles){
			if($scope.puzzles[i].tactic == "fork"){

				$scope.forks.push($scope.puzzles[i]);

			}
		}

		$(document).ready(function () {
			

			getForkIndex = function (){

				return $("#forkIndex").val();

			}
 
			$("#forkIndex").change(getForkIndex, function (){

				//removes div result from submiting answer
				$(".correct").addClass("hidden")
				$(".wrong").addClass("hidden")

				$scope.index = getForkIndex();

			
				board = ChessBoard("board", {

				
					draggable: true,
					position: $scope.forks[getForkIndex()].fen

				});


				getUserFen = function (){

					return board.fen();
					
				}

				$("#checkAnswer").click(getUserFen, function () {
					

					$(".correct").addClass("hidden")
					$(".wrong").addClass("hidden")

					
					if(getUserFen() == $scope.forks[$scope.index].solution){
						
						$(".correct").removeClass("hidden");
					} else {
						
						$(".wrong").removeClass("hidden");
					}
				});
				
			});
		}); 
	}) 
}) 
	