
class Coordinate {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class GridBox {
	constructor(
		centerPoint,
		gridCoordinates
	) {
		this.centerPoint = centerPoint;
		this.gridCoordinates = gridCoordinates;
		this.content = undefined;
	}

	setContent(content) {
		this.content = content
	}
}

class GameGridDisplay {
	constructor(
		startPoint,
		columns,
		rows,
		gridSpaceSize=30,
		lineWeight=2,
	) {
		this.startPoint = startPoint;
		this.columns = columns;
		this.rows = rows;
		this.gridSpaceSize = gridSpaceSize;
		this.lineWeight = lineWeight;
	}

	drawGrid(canvasContext) {

		canvasContext.lineWidth = this.lineWeight;

		let verticalLineLength = this.rows*this.gridSpaceSize;
		let horizontalLineLength = this.columns*this.gridSpaceSize;

		for (let i=0; i<=this.columns; i++) {
			let xPixel = this.startPoint.x + i*this.gridSpaceSize;

			canvasContext.moveTo(xPixel, this.startPoint.y);
			canvasContext.lineTo(xPixel, this.startPoint.y + verticalLineLength);
		}
		
		for (let i=0; i<=this.rows; i++) {
			let yPixel = this.startPoint.y + i*this.gridSpaceSize;

			canvasContext.moveTo(this.startPoint.x, yPixel);
			canvasContext.lineTo(this.startPoint.x + horizontalLineLength, yPixel);
		}

		canvasContext.stroke();
	}
}

class snakeHead {
	constructor() {}

	moveHead(direction, gridData) {
		let directionMap = {
			'l': (c) => {
				c.x -= 1;
				return c
			},
			'u': (c) => {
				c.y -= 1;
				return c
			},
			'r': (c) => {
				c.x += 1;
				return c
			},
			'd': (c) => {
				c.y += 1;
				return c
			},
		};

		let moveToCoordinate = directionMap[direction];
	}
}

class SnakeChain extends Array {
	constructor(segmentSize=5) {
		this.segmentSize = segmentSize;
		this.length = 1;
		this.headGridPosition = new Coordinate(1, 1);
	}

	addSegment() {
		this.unshift(this.headGridPosition);
	}
}

class GameState {
	onGoing = true;
}


function createGridDataArray(gameGridDisplay) {
	let gridDataArray = new Array();

	for (let i=0; i<gameGridDisplay.columns; i++) {
		for (let j=0; j<gameGridDisplay.columns; j++) {
			
			let gridCenter = new Coordinate(
				gameGridDisplay.startPoint.x + Math.floor(gameGridDisplay.gridSpaceSize*.5) + i*gameGridDisplay.gridSpaceSize,
				gameGridDisplay.startPoint.y + Math.floor(gameGridDisplay.gridSpaceSize*.5) + j*gameGridDisplay.gridSpaceSize
			);

			gridDataArray.push(
				new GridBox(gridCenter, new Coordinate(i, j))
			);
		}
	}

	return gridDataArray
}



const canvas = document.getElementById("c");

const gameParameters = {
	'columnNumber': 20,
	'rowNumber': 20,
	
};

const gameState = new GameState();
const gridData = {};

const chain = undefined;
const head = undefined;

// events
const passToConsole = {};

if (canvas.getContext) {

	// Initializing Game

	// creating context to draw to canvas
	let context = canvas.getContext("2d");

	// creating grid with passed-in parameters
    let gameGridDisplay = new GameGridDisplay(
		startPoint=new Coordinate(10, 10),
		columns=20,
		rows=20,
		gridSpaceSize=25,
	);

	// initializing the grid data variable
	createGridDataArray(context).forEach(
		(gridBox) => {gridData[gridBox.gridCoordinates] = gridBox}
	)

	// draw the grid
	gameGridDisplay.drawGrid(context);

	// on game-start
	while (gameState.onGoing) {
		let loopStartTime = Date.now();


		console.log(gridData);
		gameState.onGoing = false;


		let loopEndTime = Date.now();
		let loopDiff = loopEndTime - loopStartTime;
		if (!loopDiff < 1000) {
			await new Promise(r => setTimeout(r, loopDiff));
		}
	}

} else {
	console.log("something wrong");
}