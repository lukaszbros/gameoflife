$(document).ready(function() {
	var board = [];
	var boardSize = 25;
	var currentAnimation = null;
	
	// Initialize board
	var initialize = function (){
	var patternBoard = $('#pattern-board');
		var content = '';
		for (var i = 0; i <boardSize*boardSize; i++) {
			content += '<div class="cell"></div>';	
		}  	
		patternBoard.html(content);
	};

	// Clear board presentation	
	var reset = function () {
		$('.cell-selected').removeClass('cell-selected');
		board  = [];
	};
	
	// Draw current board into divs
	var paint = function () {
		for (var i = 0; i <boardSize*boardSize; i++) {
			if (board[i] == 1) {
				if (!$('.cell:eq('+ i + ')').hasClass('cell-selected')) {
					$('.cell:eq('+ i + ')').addClass('cell-selected');	
				}  			
			} else {
				if ($('.cell:eq('+ i + ')').hasClass('cell-selected')) {
					$('.cell:eq('+ i + ')').removeClass('cell-selected');	
				}
			}
			 		
		}
	};
	
	// Count next step
	var run = function () {
		var nextBoard = [];
		var cellCount = 0;
		for (var i = 0; i <boardSize*boardSize; i++) {
			cellCount = 0;
			
			if ((i-1 >= 0) && (i % boardSize != 0) && (board[i-1] == 1)) {
				cellCount++;
			}
			if ((i-boardSize-1 >= 0) && (i % boardSize != 0) && (i >= boardSize) && (board[i-boardSize-1] == 1)) {
				cellCount++;
			}
			if ((i+boardSize-1 < boardSize*boardSize) && (i % boardSize != 0) && (i < (boardSize-1)*boardSize) && (board[i+boardSize-1] == 1)) {
				cellCount++;
			}
			
			if ((i+1 < boardSize*boardSize) && (i % boardSize != boardSize -1) && (board[i+1] == 1)) {
				cellCount++;
			}  		
			if ((i-boardSize+1 >= 0) && (i % boardSize != boardSize -1) && (i >= boardSize) && (board[i-boardSize+1] == 1)) {
				cellCount++;
			}
			if ((i+boardSize+1 < boardSize*boardSize) && (i % boardSize != boardSize -1) && (i < (boardSize-1)*boardSize) && (board[i+boardSize+1] == 1)) {
				cellCount++;
			}
			
			if ((i-boardSize >= 0) && (i >= boardSize) && (board[i-boardSize] == 1)) {
				cellCount++;
			}  		
			if ((i+boardSize < boardSize*boardSize) && (i < (boardSize-1)*boardSize) && (board[i+boardSize] == 1)) {
				cellCount++;
			}
			
			
			if (board[i] == 1) {
				nextBoard[i] = 1;
			} else {
				nextBoard[i] = 0;
			}
			
			if (cellCount < 2) {
				nextBoard[i] = 0;
			} else if (cellCount == 3) {
				nextBoard[i] = 1;
			} else if (cellCount > 3) {
				nextBoard[i] = 0;
			}   		
		}
		board = nextBoard;
	}
	
	// Patterns
	// Random pattern
	var patternRandom = function() {
		for (var i = 0; i <boardSize*boardSize; i++) {
			board[i] = Math.round(Math.random());
		} 
	};
	
	// The Queen Bee Shuttle pattern
	var patternBee = function() {
		for (var i = 0; i <boardSize*boardSize; i++) {
			if ((i==9*boardSize+11) || (i==9*boardSize+12) || (i==10*boardSize+13) || (i==11*boardSize+14) || (i==12*boardSize+14)|| (i==13*boardSize+14) || (i==14*boardSize+13) || (i==15*boardSize+12) || (i==15*boardSize+11)) {
				board[i] = 1;
			} else {
				board[i] = 0;
			} 
			
		}
	};
	
	// Tumbler pattern
	var patternThumbler = function() {
	for (var i = 0; i <boardSize*boardSize; i++) {
			if ((i==5*boardSize+10) || (i==5*boardSize+11) || (i==5*boardSize+13) || (i==5*boardSize+14) || 
				(i==6*boardSize+10)|| (i==6*boardSize+11) || (i==6*boardSize+13) || (i==6*boardSize+14) || 
				(i==7*boardSize+11) || (i==7*boardSize+13) || 
				(i==8*boardSize+9) || (i==8*boardSize+11) || (i==8*boardSize+13) || (i==8*boardSize+15) || 
				(i==9*boardSize+9) || (i==9*boardSize+11) || (i==9*boardSize+13) || (i==9*boardSize+15) || 
				(i==10*boardSize+9) || (i==10*boardSize+10) || (i==10*boardSize+14) || (i==10*boardSize+15)) {
				board[i] = 1;
			} else {
				board[i] = 0;
			} 
		}
	};
	
	
	// Initialize board
	initialize();
	
	// Attach event handler for pattern change
	$('#starting-pattern').change(function(){
		var selectedPattern = $('#starting-pattern option:selected').val();
		reset();
		clearInterval(currentAnimation);
		if (selectedPattern == "random") {
			patternRandom();
		} else if (selectedPattern == "bee") {
			patternBee();
		} else if (selectedPattern == "thumbler") {
			patternThumbler();
		}
		paint();
		
		// Program loop  	
		currentAnimation = setInterval(function(){
			run();
			paint();
		},100);
	});
});