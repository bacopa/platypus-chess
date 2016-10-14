chessApp.controller("PuzzleController", function ($scope, PuzzleFactory) {

	newPuzzle = {};
	var fenfen;
	var solutionFen;

	PuzzleFactory.index(function (data) {
		$scope.puzzles = data;
	})


	$(document).ready(function(){

		
	var newPuzzleBoard = ChessBoard('newPuzzleBoard', {
	  draggable: true,
	  dropOffBoard: 'trash',
	  sparePieces: true
	});

	$('#startBtn').on('click', newPuzzleBoard.start);
	$('#clearBtn').on('click', newPuzzleBoard.clear);


	//getPositionBtn should show the starting fen string to the user on new.html
	//getSolutionBtn should show the solution fen string to the user on new.html
	$("#getPositionBtn").on("click", showStartingFen);

	function showStartingFen(){
		$scope.fenfen = newPuzzleBoard.fen();
		$("#showStart").val($scope.fenfen);
	};


	$("#getSolutionBtn").on("click", showSolutionFen);

	function showSolutionFen(){
		$scope.solutionFen = newPuzzleBoard.fen();
		$("#showSolution").val($scope.solutionFen);
	};


	$('#savePuzzleBtn').on('click', clickSavePuzzle);

	function clickSavePuzzle() {

		$scope.solutionFen = $("#solution").val()
		//show user that starting position and solution were saved

		var request = $.ajax({
			url: "/puzzles",
			method: "POST",
			data: {
				fen: $("#showStart").val(),
				tactic: $("#tactic").val(),
				turn: $("#turn").val(),
				solution: $("#showSolution").val()
			},
			datatype: "html"
		});

		// console.log(request.data)
		// console.log(request)

		request.done(function () {
			console.log("Success");
		});

		request.fail(function (jqXHR, textStatus) {
			alert("I'm sorry. Request failed: " + textStatus);
		});
	}//closes clickGetPositionBtn
})//closes document.ready for new.html
})//closes puzzle controller