

var mongoose = require("mongoose");
var Puzzle = mongoose.model("Puzzle");

module.exports = (function () {
	return {
		
		index: function (req, res) {
			console.log("controller server side index")

			Puzzle.find({}, function (err, results) {
				if(err) {
					console.log(err)
				} else {
					console.log(results)
					res.json(results)
				}
			})
		 },

		 create: function (req, res) {
		 	console.log("controller server side create")
		 	console.log(" body:",req.body)
		 	// console.log(" req:",req)
		 	// console.log(" req.data:",req.data)
		 	var puzzle = new Puzzle({

		 		fen: req.body.fen,
		 		tactic: req.body.tactic,
		 		turn: req.body.turn,
		 		solution: req.body.solution

		 	});

		 	puzzle.save(function (err, results) {
		 		if(err){
		 			console.log(err)
		 		} else {
		 			console.log("Successfully saved puzzle! =)")
		 			console.log("")
		 			res.end()
		 		}
		 	})
		 }

	}
})();