
class Coordinate {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class GridBox {
	constructor(centerPoint, gridCoordinates) {
		this.centerPoint = centerPoint;
		this.gridCoordinates = gridCoordinates;
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

	createGridDataArray(canvasContext) {
		let gridDataArray = new Array();

		for (let i=0; i<this.columns; i++) {
			for (let j=0; j<this.columns; j++) {
				
				let gridCenter = new Coordinate(
					this.startPoint.x + Math.floor(this.gridSpaceSize*.5) + i*this.gridSpaceSize,
					this.startPoint.y + Math.floor(this.gridSpaceSize*.5) + j*this.gridSpaceSize
				);

				gridDataArray.push(
					new GridBox(gridCenter, new Coordinate(i, j))
				);
			}
		}

		return gridDataArray
	}
}

const canvas = document.getElementById("c");

if (canvas.getContext) {
	let context = canvas.getContext("2d");

    let gameGridDisplay = new GameGridDisplay(
		startPoint=new Coordinate(10, 10),
		columns=20,
		rows=20,
		gridSpaceSize=25,
	);

	gameGridDisplay.drawGrid(context);
	console.log(
		gameGridDisplay.createGridDataArray(context)
	);

} else {
	console.log("something wrong");
}