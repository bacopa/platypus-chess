function getBlacksMove(obj){

	canBlackCapture(obj); 
}

function getBlacksPieces(obj){
	
	obj.blacksPieces = [];

	for(sq in obj.position2){
		if(obj.position2[sq][0] == "b"){
			var pieceObj = {
				piece: obj.position2[sq],
				sq: sq,
			}
			getMoves(pieceObj, obj);
			obj.blacksPieces.push(pieceObj);

		}
	}
}
function getWhitesPieces(obj){
	
	obj.whitesPieces = [];

	for(sq in obj.position2){
		if(obj.position2[sq][0] == "w"){
			var pieceObj = {
				piece: obj.position2[sq],
				sq: sq,
			}
			getMoves(pieceObj, obj);
			obj.whitesPieces.push(pieceObj);

		}
	}
}

function getMoves(pieceObj, obj){
	var color = pieceObj.piece[0];

	switch(pieceObj.piece[1]){

		case "P":
			pawnMoves(pieceObj, color, obj);
			break;

		case "N":
			knightMoves(pieceObj, color, obj);
			break;

		case "R":
			rookMoves(pieceObj, color, obj);
			break;

		case "B":
			bishopMoves(pieceObj, color, obj);
			break;

		case "K":
			kingMoves(pieceObj, color, obj);
			break;

		case "Q":
			queenMoves(pieceObj, color, obj);
			break;

		default:
			return;
	}
}

function getUsersMove(obj){

	for(sq in obj.position1){
		if(!obj.position2.hasOwnProperty(sq)){
			obj.sqFrom = sq;
			obj.piece = obj.position1[sq];
		}
	}
	for(sq in obj.position2){
		
		if(obj.position1.hasOwnProperty(sq) && obj.position1[sq] !== obj.position2[sq]){
			obj.sqTo = sq;
			obj.capturedPiece = obj.position1[sq];
			return;
		} else if (!obj.position1.hasOwnProperty(sq)){
			obj.sqTo = sq;
			return;
		}
	}
}

function checkMove(obj){

	obj.rankTo = Number(obj.sqTo[1]);
	obj.rankFrom = Number(obj.sqFrom[1]);
	obj.fileTo = [0,"a","b","c","d","e","f","g","h"].indexOf(obj.sqTo[0]);
	obj.fileFrom = [0,"a","b","c","d","e","f","g","h"].indexOf(obj.sqFrom[0]);
	obj.rankDif = obj.rankTo - obj.rankFrom;
	obj.fileDif = obj.fileTo - obj.fileFrom;

	return legalShape(obj);

}


function rookMoves(pieceObj, color, obj) {

	var rookSq = pieceObj.sq;
	var moves = [];
	var protects = [];
	var captures = [];
	var rank = Number(rookSq[1]);
	var file = [0,"a","b","c","d","e","f","g","h"].indexOf(rookSq[0]);

	//up
	for(var i = 1; i + rank < 9; i++){
		var sq = rookSq[0] + (rank + i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//right
	for(var i = 1; i + file < 9; i++){
		var sq = [0,"a","b","c","d","e","f","g","h"][file + i] + rank;
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//down
	for(var i = 1; rank - i > 0; i++){
		var sq = rookSq[0] + (rank - i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//left
	for(var i = 1; file - i > 0; i++){
		var sq = [0,"a","b","c","d","e","f","g","h"][file - i] + rank;
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}
	pieceObj.moves = moves;	
	pieceObj.captures = captures;	
	pieceObj.protects = protects;
	return pieceObj;	
}

function knightMoves(pieceObj, color, obj){

	var knightSq = pieceObj.sq;
	var moves = [];
	var captures = [];
	var protects = [];
	var rank = Number(knightSq[1]);
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var file = letters.indexOf(knightSq[0]);

	//upper right
	if(rank < 7 && file < 8){
		var sq = letters[file + 1] + (rank + 2);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}
	}

	//up right
	if(rank < 8 && file < 7){
		var sq = letters[file + 2] + (rank + 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}		
	}

	//low right
	if(rank > 1 && file < 7){
		var sq = letters[file + 2] + (rank - 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}		
	}

	//lower right
	if(rank > 2 && file < 8){
		var sq = letters[file + 1] + (rank - 2);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}		
	}

	//lower left
	if(rank > 2 && file > 1){
		var sq = letters[file - 1] + (rank - 2);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}		
	}

	//low left
	if(rank > 1 && file > 2){
		var sq = letters[file - 2] + (rank - 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}		
	}

	//up left
	if(rank < 8 && file > 2){
		var sq = letters[file - 2] + (rank + 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}
	}

	//upper left
	if(rank < 7 && file > 1){
		var sq = letters[file - 1] + (rank + 2);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);		
		}
	}
	pieceObj.moves = moves;
	pieceObj.captures = captures;
	pieceObj.protects = protects;
}

function bishopMoves(pieceObj, color, obj){

	var bishopSq = pieceObj.sq
	var moves = [];
	var captures = [];
	var protects = [];
	var rank = Number(bishopSq[1]);
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var file = letters.indexOf(bishopSq[0]);

	//up right
	for(var i = 1; rank + i < 9 && file + i < 9; i++){
		var sq = letters[file + i] + (rank + i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//down right
	for(var i = 1; rank - i > 0 && file + i < 9; i++){
		var sq = letters[file + i] + (rank - i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//down left
	for(var i = 1; rank - i > 0 && file - i > 0; i++){
		var sq = letters[file - i] + (rank - i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}

	//up left
	for(var i = 1; rank + i < 9 && file - i > 0; i++){
		var sq = letters[file - i] + (rank + i);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
			break;
		}
		moves.push(sq);
	}
	if(pieceObj.moves && pieceObj.captures && pieceObj.protects){
		pieceObj.moves = pieceObj.moves.concat(moves);
		pieceObj.captures = pieceObj.captures.concat(captures);
		pieceObj.protects = pieceObj.protects.concat(protects);
		
	} else {
		pieceObj.moves = moves;	
		pieceObj.captures = captures;	
		pieceObj.protects = protects;	
	}

}

function kingMoves(pieceObj, color, obj){

	var kingSq = pieceObj.sq;
	var moves = [];
	var captures = [];
	var protects = [];
	var rank = Number(kingSq[1]);
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var file = letters.indexOf(kingSq[0]);
	var sq;

	//up
	if(rank != 8){
		sq = letters[file] + (rank + 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);
		}

		//up right
		if(file != 8){
			sq = letters[file + 1] + (rank + 1);
			if(obj.position2.hasOwnProperty(sq)){
				if(obj.position2[sq][0] !== color){
					captures.push(sq);
				} else {
				protects.push(sq);
			}	
			} else {
				moves.push(sq);
			}
		}

		//up left
		if(file != 1){
			sq = letters[file - 1] + (rank + 1);
			if(obj.position2.hasOwnProperty(sq)){
				if(obj.position2[sq][0] !== color){
					captures.push(sq);
				} else {
				protects.push(sq);
			}	
			} else {
				moves.push(sq);			
			}
		}		
	}

	//right
	if(file != 8){
		sq = letters[file + 1] + rank;
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
					captures.push(sq);
			} else {
				protects.push(sq);
			}	
		} else {
				moves.push(sq);			
		}
	}

	//left
	if(file != 1){
		sq = letters[file - 1] + rank;
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
					captures.push(sq);
			} else {
				protects.push(sq);
			}

		} else {
			moves.push(sq);			
		}
	}	

	//down
	if(rank != 1){
		sq = letters[file] + (rank - 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] !== color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		} else {
			moves.push(sq);
		}

		//down right
		if(file != 8){
			sq = letters[file + 1] + (rank - 1);
			if(obj.position2.hasOwnProperty(sq)){
				if(obj.position2[sq][0] !== color){
					captures.push(sq);
				} else {
					protects.push(sq);
				}

			} else {
				moves.push(sq);
			}
		}

		//down left
		if(file != 1){
			sq = letters[file - 1] + (rank - 1);
			if(obj.position2.hasOwnProperty(sq)){
				if(obj.position2[sq][0] !== color){
					captures.push(sq);
				} else {
					protects.push(sq);
				}
			} else {
				moves.push(sq);
			}
		}		
	}

	pieceObj.moves = moves;	
	pieceObj.captures = captures;	
	pieceObj.protects = protects;	
}

function pawnMoves(pieceObj, color, obj){

	var pawnSq = pieceObj.sq;
	var moves = [];
	var captures = [];
	var protects = [];
	var rank = Number(pawnSq[1]);
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var file = letters.indexOf(pawnSq[0]);
	var sq;

	if(color == "b"){
		sq = pawnSq[0] + (rank - 1);
		if(!obj.position2.hasOwnProperty(sq)){
			moves.push(sq);
			if(rank == 7){
				sq = pawnSq[0] + (rank - 2);
				if(!obj.position2.hasOwnProperty(sq)){
					moves.push(sq);
				}
			}
		} 

		//diagonal right
		sq = letters[file + 1] + (rank - 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] != color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
		}		

		//diagonal left
		sq = letters[file - 1] + (rank - 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] != color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
				
		} 
	}

	if(color == "w"){
		sq = pawnSq[0] + (rank + 1);
		if(!obj.position2.hasOwnProperty(sq)){
			moves.push(sq);
			if(rank == 2){
				sq = pawnSq[0] + (rank + 2);
				if(!obj.position2.hasOwnProperty(sq)){
					moves.push(sq);
				}
			}
		}

		//diagonal right
		sq = letters[file + 1] + (rank + 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] != color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}		
		}
		//diagonal left
		sq = letters[file - 1] + (rank + 1);
		if(obj.position2.hasOwnProperty(sq)){
			if(obj.position2[sq][0] != color){
				captures.push(sq);
			} else {
				protects.push(sq);
			}
				
		} 
	}
	pieceObj.moves = moves;
	pieceObj.captures = captures;
	pieceObj.protects = protects;
}

function queenMoves(pieceObj, color, obj){
	
	bishopMoves(rookMoves(pieceObj, color, obj), color, obj);
}

function getAllCaptures(obj, color){

	var capturesArr = [];
	for(var i = 0; i < obj[color + "Pieces"].length; i++){

		if(obj[color + "Pieces"][i].captures.length){
			capturesArr.push(obj[color + "Pieces"][i]);
		}
	}

	return capturesArr;
}


// NEED TO DETERMINE TO KEEP "whites"
function getProtectedBy(obj){

	for(var i = 0; i < obj.whitesPieces.length; i++){
		obj.whitesPieces[i].protectedBy = [];
		var sq = obj.whitesPieces[i].sq;

		for(var j = 0; j < obj.whitesPieces.length; j++){
		
			if(obj.whitesPieces[j].protects.includes(sq)){
				obj.whitesPieces[i].protectedBy.push(obj.whitesPieces[j].piece);
			}
		}
	}
}

function getPiecesToCapture(arr, obj){

	var piecesToCapture = [];
	console.log("arr:", arr);

	for(var i = 0; i < arr.length; i++){
		
		var pieceObj = {};
		for(var k = 0; k < obj.whitesPieces.length; k++){

			if(obj.whitesPieces[k].sq == arr[i]){
				pieceObj.piece = obj.whitesPieces[k].piece;
				pieceObj.sq = obj.whitesPieces[k].sq;
				pieceObj.protectedBy = obj.whitesPieces[k].protectedBy;

			}
		}
		piecesToCapture.push(pieceObj);
	}
	console.log("piecesToCapture", piecesToCapture);

}