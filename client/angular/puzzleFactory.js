	//the PuzzleFactory handles the chess boards saved by user
	chessApp.factory("PuzzleFactory", function ($http) {
		
		var factory = {};
		
		var puzzles = [];

		factory.index = function(callback) {
			$http.get("/puzzles").success(function (output) {
				// console.log("factory: index")
				// console.log( output)
				puzzles = output;
				callback(puzzles);
			})
		}
		//not being used
		factory.create = function(callback) {
			//add "data" parameter?
			$http.post("/puzzles").success(function (output) {
				console.log("factory:create puzzle");
			})
			callback();
		}

		return factory;
	})