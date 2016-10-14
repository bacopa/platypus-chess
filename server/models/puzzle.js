var mongoose = require("mongoose");

var PuzzleSchema = new mongoose.Schema({

	fen: String,
	turn: String,
	tactic: String,
	solution: String

})

mongoose.model("Puzzle", PuzzleSchema)