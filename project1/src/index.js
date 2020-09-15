(function () {
    "use strict";
	const canvasWidth = 750, canvasHeight = 500;
	let ctx;

	window.onload = init;

	function init() {
		let canvas = document.querySelector('canvas');
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		// House Rectangles
		blLIB.drawRectangle(ctx, 50, 50, 150, 100, "white", 0, "white");
		blLIB.drawCircle(ctx, 125, 180, 15);
		blLIB.drawRectangle(ctx, 300, 50, 150, 100, "white", 0, "white");
		blLIB.drawCircle(ctx, 375, 180, 15);
		blLIB.drawRectangle(ctx, 550, 50, 150, 100, "white", 0, "white");
		blLIB.drawCircle(ctx, 625, 180, 15);

		// Stores
		blLIB.drawRectangle(ctx, 50, 350, 150, 100, "blue", 0, "white");
		blLIB.drawCircle(ctx, 125, 320, 15);
		blLIB.drawRectangle(ctx, 300, 350, 150, 100, "blue", 0, "white");
		blLIB.drawCircle(ctx, 375, 320, 15);
		blLIB.drawRectangle(ctx, 550, 350, 150, 100, "blue", 0, "white");
		blLIB.drawCircle(ctx, 625, 320, 15);
		loop();
	}

	function loop() {
		
	}
})();
