function getMove(obj) {
	
	//move wK once bK is on edge
	if(obj.blackKingSq[0] == "a" || obj.blackKingSq[0] == "h" || obj.blackKingSq[1] == 8 || obj.blackKingSq[1] == "1"){
		return obj.whiteKingSq + "-" + moveWhiteKing(obj);
	}

	obj.kingArea = queensRectangle(obj.blackKingSq, obj.queenSquare);

	//remove sqs King can capture Queen
	removeSqsBlackCanCapture(obj);

	qObj = {
		bK: obj.blackKingSq,
		wK: obj.whiteKingSq,
		queenMoves: obj.queensPossibleMoves
	};

	var queenObjsArr = getQObjArray(qObj);

	//find if Queen can reduce king's area 
	var tempObject = findQueensMove(queenObjsArr);

	return obj.queenSquare + "-" + tempObject.queenSquare;	 
}

function removeSqsBlackCanCapture(obj) {
	obj.queensPossibleMoves = obj.sqsAttackedByQ.filter(function (sq){
		if(!obj.blackKingSquares.includes(sq)){
			return sq;
		}
		if(obj.blackKingSquares.includes(sq) && obj.whiteKingSquares.includes(sq)){
			return sq;
		}
	});
}

function getSquaresToCheck(char, idx, obj) {

	var arr = obj.sqsAttackedByQ.filter(function(sq){
		if(sq[idx] == char && obj.queensPossibleMoves.indexOf(sq) < 0){
			return sq;
		}
	});
	return arr;
}

function getSqsAttackedByBothKings(obj) {
	var arr = [];
	
	for(var i = 0; i < obj.whiteKingSquares.length; i++){
			if(obj.blackKingSquares.includes(obj.whiteKingSquares[i])){
				arr.push(obj.whiteKingSquares[i]);
			}
	}
	return arr;
}

function getClose(obj) {

	//check if kings attacking same sq
	var bothKings = getSqsAttackedByBothKings(obj);

	var possibleMoves = [];


	//?~?~
	//check if Q's sq included in bothKings
	for(var i = 0; i < obj.sqsAttackedByQ.length; i++){
		if(bothKings.includes(obj.sqsAttackedByQ[i])){
			possibleMoves.push(obj.sqsAttackedByQ[i]);
		}
	}

	//for each obj.sqsAttackedByQ, find king's best move
	for(var i = 0; i < obj.sqsAttackedByQ.length; i++){

	}
	return possibleMoves;
}


function getQObjArray(qObj) {
	
	var queenObjsArr = [];

	//each Q move will have an array of king's moves
	for(var i = 0; i < qObj.queenMoves.length; i++){
		
		//make a new obj for each Q move
		var qSq = qObj.queenMoves[i];
		var tempObj = {
			queenSquare: qSq,
			queenRank: qSq[1],
			whiteKingSq: qObj.wK,
			blackKingSq: qObj.bK
		};

		getSquaresAttackedByQueen(tempObj);
		tempObj.whiteKingSquares = getKingSqs(tempObj.whiteKingSq);
		tempObj.blackKingSquares = getKingSqs(tempObj.blackKingSq);
		tempObj.attackedSqs = tempObj.sqsAttackedByQ.concat(tempObj.whiteKingSquares);
		getBlacksLegalMoves(tempObj);

		tempObj.blacksBestMove = findMoveClosestToCenter(tempObj);

		queenObjsArr.push(tempObj);
	}

	return queenObjsArr;
}

function findQueensMove(arr) {

	var bestObj = arr[0];
	var area = queensRectangle(arr[0].blacksBestMove, arr[0].queenSquare);

	//loop over Queen's moves
	for(var i = 1; i < arr.length; i++){
		
		//get bK's moves √
		//get sqsAttackedByQueen
		getBlacksLegalMoves(arr[i]);

		var tempArea = queensRectangle(arr[i].blacksBestMove, arr[i].queenSquare);
		if( tempArea < area ){
			area = tempArea;
			bestObj = arr[i];
		}
	}

	bestObj.kingArea = area;
	return(bestObj);
}

function queensRectangle(kSq, qSq){
	var width = 0;
	var height = 0;
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var qFile  = letters.indexOf(qSq[0]);
	var kFile  = letters.indexOf(kSq[0]);
	var qRank = qSq[1];
	var kRank = kSq[1];

	if(kFile > qFile){
		while(qFile !== 9){
			qFile++;
			width++;
		}
	} else {
		while(qFile !== 0){
			qFile--;
			width++;
		}
	}

	if(kRank > qRank){
		while(qRank !== 9){
			qRank++;
			height++;
		}
	} else {
		while(qRank !== 0){
			qRank--;
			height++;
		}
	}

	return width*height;
}

function moveWhiteKing(obj) {
	var bSq = obj.blackKingSq;
	var theSq = obj.whiteKingSquares[0];
	var area = areaBetweenKings(bSq, obj.whiteKingSquares[0]);
	
	obj.whiteKingSquares.forEach(function (sq) {
		var tempArea = areaBetweenKings(bSq, sq);
		if(tempArea < area){
			area = tempArea;
			theSq = sq;
		}
	});

	return theSq;

}

function areaBetweenKings(bSq, wSq) {
	var width = 1;
	var height = 1;
	var letters = [0,"a","b","c","d","e","f","g","h"];
	var bFile  = letters.indexOf(bSq[0]);
	var wFile  = letters.indexOf(wSq[0]);
	var bRank = bSq[1];
	var wRank = wSq[1];

	if(bFile < wFile){
		while(bFile != wFile){
			width++;
			bFile++;
		}
	} else {
		while(bFile != wFile){
			width++;
			bFile--;
		}
	}
	if(bRank < wRank){
		while(bRank != wRank){
			height++;
			bRank++;
		}
	} else {
		while(bRank != wRank){
			height++;
			bRank--;
		}
	}
	return height*width;
}


function update3Pieces(obj, psnObj){

	for(sq in psnObj){
		if(psnObj[sq] == "wQ"){
			obj.queenSquare = sq;
			obj.queenRank = sq[1];
		} else if(psnObj[sq] == "wK"){
			obj.whiteKingSq == sq;
		} else {
			obj.blackKingSq == sq;
		}
	}
}






