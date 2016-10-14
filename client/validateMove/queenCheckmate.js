function findMoveClosestToCenter (obj) {

	var area = openRectangle(obj.blacksPossibleMoves[0])
	var move;
	
	for(var i = 0; i < obj.blacksPossibleMoves.length; i++){
		var areaTemp = openRectangle(obj.blacksPossibleMoves[i]);
		if(areaTemp <= area){
			area = areaTemp;
			move = obj.blacksPossibleMoves[i];
		}
	}
	return move;	
}

function openRectangle (sq) {

	var width;
	var height;
	var kRank = sq[1];
	var kFile  = [0,"a","b","c","d","e","f","g","h"].indexOf(sq[0]);

	if(kFile > 4){
		width = kFile;
	} else {
		width = 9 - kFile;
	}
	if(kRank > 4){
		height = kRank;
	} else {
		height = 9 - kRank;
	}
	return width*height;
}

//calls getKrectangle
function removeCornerMoves (obj) {

	// var moves = obj.blacksPossibleMoves.map(function (sq) {
	// })
	var area = getKRectangle(obj, obj.blacksPossibleMoves[0]);
	var move;
	
	for(var i = 0; i < obj.blacksPossibleMoves.length; i++){
		var areaTemp = getKRectangle(obj, obj.blacksPossibleMoves[i]);
		if(areaTemp >= area){
			area = areaTemp;
			move = obj.blacksPossibleMoves[i];
		}
	}

	console.log("best move per krect:", move);
}

function getKRectangle(obj, sq) {
	var width = 0;
	var height = 0;
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var qFile  = letters.indexOf(obj.queenSquare[0]);
	var kFile  = letters.indexOf(sq[0]);
	var qRank = obj.queenSquare[1];
	var kRank = sq[1];

	if(kFile < qFile){
		while(kFile !== 0){
			kFile--;
			width++;
		}
	} else {
		while(kFile !== 9){
			kFile++;
			width++;
		}
	}
	if(kRank < qRank){
		while(kRank !== 0){
			kRank--;
			height++;
		} 
	} else {
		while(kRank !== 9){
			kRank++;
			height++;
		}
	}
	
	return width*height;
}




function checkIfBlackCanCaptureQueen (obj) {
	obj.blacksPossibleMoves.forEach(function (sq){
		if(sq === obj.queenSquare){
			obj.blackKingMoveTo = sq;
			return;
		} 
	});
	return(null);
}

function getBlacksLegalMoves (obj) {
	
	obj.blacksPossibleMoves = [];
	for(var i = 0; i < obj.blackKingSquares.length; i++){
		if(!obj.attackedSqs.includes(obj.blackKingSquares[i])){
			obj.blacksPossibleMoves.push(obj.blackKingSquares[i]);
		}
	}
}

function getKingSqs(sq){

	var kingSqs = [];
	var letters = ["a","b","c","d","e","f","g","h"];
	var letterIdx = letters.indexOf(sq[0]);

	//up
	if(sq[1] !== "8"){
		kingSqs.push(sq[0] + (Number(sq[1]) + 1));
	}
	//up-right-diag
	if(sq[1] !== "8" && sq[0] !== "h"){
		kingSqs.push(letters[letterIdx + 1] + (Number(sq[1]) + 1));
	}
	//right
	if(sq[0] !== "h"){
		kingSqs.push(letters[letterIdx + 1] + sq[1]);
	}	
	//down-right-diag
	if(sq[1] !== "1" && sq[0] !== "h"){
		kingSqs.push(letters[letterIdx + 1] + (Number(sq[1]) - 1));
	}
	//down
	if(sq[1] !== "1"){
		kingSqs.push(sq[0] + (Number(sq[1]) - 1));
	}
	//down-left-diag
	if(sq[1] !== "1" && sq[0] !== "a"){
		kingSqs.push(letters[letterIdx - 1] + (Number(sq[1]) - 1));
	}
	//left
	if(sq[0] !== "a"){
		kingSqs.push(letters[letterIdx - 1] + sq[1]);
	}
	//up-left-diag
	if(sq[1] !== "8" && sq[0] !== "a"){
		kingSqs.push(letters[letterIdx - 1] + (Number(sq[1]) + 1));
	}
	return kingSqs;
}

function getSquaresAttackedByQueen(obj) {

	var letters = ["a","b","c","d","e","f","g","h"];
	var letterIdx = letters.indexOf(obj.queenSquare[0]);
	var squares = [];
	
	// up
	for(var i = 1; obj.queenRank + i <= 8; i++){

		var sq = obj.queenSquare[0] + (obj.queenRank + i);
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}
	//up right diag
	for(var j = 1; letterIdx + j < 8 && obj.queenRank + j <= 8; j++){
		
		var sq = letters[letterIdx + j] + (obj.queenRank + j);
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}
	
	//right
	for(var k = 1; letterIdx + k < 8; k++){
		
		var sq = letters[letterIdx + k] + obj.queenRank;
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}

	//down right diag
	for(var n = 1; obj.queenRank - n > 0 && letterIdx + n < 8; n++){

		var sq1 = letters[letterIdx + n] + (obj.queenRank - n);
		if(sq1 === obj.whiteKingSq){
			break;
		}
		squares.push(sq1);
	}

	//down
	for(var i = 1; obj.queenRank - i > 0; i++){
		var sq = obj.queenSquare[0] + (obj.queenRank - i);
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}

	//down left diag
	for(var i = 1; obj.queenRank - i > 0 && letterIdx - i >= 0; i++){
		var sq = letters[letterIdx - i] + (obj.queenRank - i);
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}	

	//left
	for(var i = 1; letterIdx - i >= 0; i++){
		var sq = letters[letterIdx - i] + obj.queenRank;
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);
	}

	//up left diag
	for(var i = 1; obj.queenRank + i <= 8 && letterIdx - i >= 0; i++){
		
		var sq = letters[letterIdx - i] + (obj.queenRank + i);
		if(sq === obj.whiteKingSq){
			break;
		}
		squares.push(sq);		
	}

	obj.sqsAttackedByQ = squares;
}

//only works for unique piece
function getSquareOfPiece(str, rank, piece) {
	var square = "";
	var colNum = 1;
	for(var i = 0; i < str.length; i++){

		if(str[i] === piece){
			break;
		}

		if(str[i].match(/[0-9]/)){
			colNum += Number(str[i]);
		} else{
			colNum++;
		}		
	}

	return [0,"a","b","c","d","e","f","g","h"][colNum] + rank;
}

function getStrOfPiece(arr, piece){
	var str = "";
	for(var i = 0; i < arr.length; i++){
		if(arr[i].includes(piece)){
			str = arr[i];
		}
	}
	return str;
}

function getAttackedSquares(obj) {

	var arr = obj.fen2.split("/");

	if(!legalShape(obj)){
		obj.illegal = true;
		return;
	}

	obj.queenStr = getStrOfPiece(arr, "Q");
	obj.queenRank = 8 - arr.indexOf(obj.queenStr);
	obj.queenSquare = getSquareOfPiece(obj.queenStr, obj.queenRank, "Q")

	obj.whiteKingStr = getStrOfPiece(arr, "K");
	obj.whiteKingRank = 8 - arr.indexOf(obj.whiteKingStr);
	obj.whiteKingSq = getSquareOfPiece(obj.whiteKingStr, obj.whiteKingRank, "K")


	obj.blackKingStr = getStrOfPiece(arr, "k");
	obj.blackKingRank = 8 - arr.indexOf(obj.blackKingStr);
	obj.blackKingSq = getSquareOfPiece(obj.blackKingStr, obj.blackKingRank, "k");

	
	getSquaresAttackedByQueen(obj);
	
	obj.blackKingSquares = getKingSqs(obj.blackKingSq);
	obj.whiteKingSquares = getKingSqs(obj.whiteKingSq);
	obj.attackedSqs = obj.whiteKingSquares.concat(obj.sqsAttackedByQ);

	getBlacksLegalMoves(obj);

	//king can eat king
	if(obj.blacksPossibleMoves.includes(obj.whiteKingSq)){
		console.log("illegal!");
		obj.illegal = true;
		return;
	}

	//stalemate
	if(!obj.blacksPossibleMoves.length && !obj.attackedSqs.includes(obj.blackKingSq)){
		console.log("stalemate");
		return "stalemate"
	}

	//checkmate
	if(!obj.blacksPossibleMoves.length && obj.attackedSqs.includes(obj.blackKingSq)){
		console.log("checkmate");
		return "checkmate";
	}

	//check if black can capture the queen
	checkIfBlackCanCaptureQueen(obj)

	//find move that doesn't allow queen to decrease rectangle
	


	//or find move closest to the center
	if(!obj.blackKingMoveTo){
		obj.blackKingMoveTo = findMoveClosestToCenter(obj);
	}
}























