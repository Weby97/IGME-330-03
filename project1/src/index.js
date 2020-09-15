console.log("index.js loaded");
(function () {
    "use strict";
	const canvasWidth = 640, canvasHeight = 480;
	let ctx;

	window.onload = init;

	function init() {
		let canvas = document.querySelector('canvas');
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		loop();
	}

	function loop() {
		
	}
})();
