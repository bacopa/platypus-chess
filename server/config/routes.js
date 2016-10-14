var puzzles = require("./../controllers/puzzles.js")



// we will have to require this in the server.js file and pass it app
module.exports = function(app) {
	
	app.get("/puzzles", function (req, res) {
		console.log("routes: get puzzles")
		puzzles.index(req, res);
	});
	app.post("/puzzles", function (req, res) {
		console.log("routes: post puzzles")
		puzzles.create(req, res)
	})
}