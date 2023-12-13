class Coordinate {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class BoxData {
	constructor(centerPoint, rectParams, gridCoordinates) {
		this.centerPoint = centerPoint;
		this.rectParams = rectParams;
		this.gridCoordinates = gridCoordinates;
	}
}

class GameGridDisplay {
	constructor(
		startPoint,
		columns,
		rows,
		borderWidth=5,
		bufferWidth=3,
		gridBoxSize=10,
		gridSpacing=3,
	) {
		this.startPoint = startPoint;
		this.columns = columns;
		this.rows = rows;
		this.borderWidth = borderWidth;
		this.bufferWidth = bufferWidth;
		this.gridBoxSize = gridBoxSize;
		this.gridSpacing = gridSpacing;


		this.pixelWidth = borderWidth*2 + bufferWidth*2 + columns*gridBoxSize + (columns*gridSpacing - 1);
		this.pixelDepth = borderWidth*2 + gridSpacing*2 + rows*gridBoxSize + (rows*gridSpacing - 1);
	}

	drawBorder(canvasContext) {
		canvasContext.lineWidth = this.borderWidth;
		canvasContext.rect(
			this.startPoint.x,
			this.startPoint.y,
			this.pixelWidth,
			this.pixelDepth
		);
		canvasContext.stroke();
	}

	drawGrid(canvasContext) {
		let gridDataArray = this.createGridDataArray();
		canvasContext.lineWidth = 3;

		gridDataArray.forEach((box) => {
			let rectX, rectY, rectWidth, rectDepth;
			[rectX, rectY, rectWidth, rectDepth] = box.rectParams;
			canvasContext.rect(rectX, rectY, rectWidth, rectDepth);
			canvasContext.stroke();
		})
	}

	drawContents(canvasContext, contentArray) {
		contentArray.forEach((contentData) => {
			contentData.gridCoordinate
		})
	}

	createGridDataArray() {
		let gridDataArray = new Array();

		// start pixel for the actual grid. takes into account buffer from border
		let gridStartPixelX = this.startPoint.x + this.borderWidth + this.gridSpacing;
		let gridStartPixelY = this.startPoint.y + this.borderWidth + this.gridSpacing;

		// gets the middle pixel (or one below if the side length is even)
		let s = this.gridBoxSize;
		function getMidpoint(startPixel) {return startPixel + Math.floor(s / 2)}

		let xCorner = gridStartPixelX;
		let gridCoordX = 0;

		for (let i=0; i<this.columns; i++) {

			let yCorner = gridStartPixelY;
			let gridCoordY = this.rows - 1;

			for (let j=0; j<this.rows; j++) {
				
				let currentBox = new BoxData(
					new Coordinate(getMidpoint(xCorner), getMidpoint(yCorner)),
					[xCorner, yCorner, this.gridBoxSize, this.gridBoxSize],
					new Coordinate(gridCoordX, gridCoordY)
				);

				gridDataArray.push(currentBox);

				yCorner += this.gridBoxSize + this.gridSpacing;
				gridCoordY -= 1;
			}

			xCorner += this.gridBoxSize + this.gridSpacing;
			gridCoordX += 1;

		}

		return gridDataArray
	}
}

const canvas = document.getElementById("c");

if (canvas.getContext) {
	let context = canvas.getContext("2d");

    let gameGridDisplay = new GameGridDisplay(
		startPoint=new Coordinate(30, 30),
		columns=25,
		rows=25,
		borderWidth=5,
		gridBoxSize=20,
		gridSpacing=3,
	);

    gameGridDisplay.drawBorder(context);
	gameGridDisplay.drawGrid(context);

} else {
	console.log("something wrong");
}