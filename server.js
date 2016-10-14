var express = require("express")
var path = require("path")
var app = express();					


app.use(express.static(path.join(__dirname, "./client")));

var bodyParser = require("body-parser");
app.use(bodyParser.json());

//urlencoded is needed because i'm making an $.ajax request
app.use(bodyParser.urlencoded({extended: true}));
require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);

var server = app.listen(3000, function () {
	console.log("~~ Chessing it up on port 3000 ~~")
})