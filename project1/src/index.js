console.log("index.js loaded");
(function () {
    "use strict";
	const canvasWidth = 400, canvasHeight = 300;
	let ctx;

	window.onload = init;

	function init() {
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		loop();
	}

	function loop() {
		
	}
})();
