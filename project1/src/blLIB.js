console.log("blLIB loaded");
(function () {
    "use strict";
    let blLIB = {
        getRandomColor() {
            const getByte = _ => 55 + Math.round(Math.random() * 200);
            return `rgba(${getByte()},${getByte()},${getByte()},.9)`;
        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Helper for saying yes or no to being infected
        // Keep them in place function

        drawRectangle(ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") {
            ctx.fillStyle = fillStyle;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();
            if (lineWidth > 0) {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.restore();
        }
    };

    if (window) {
        window["blLIB"] = blLIB
    }
    else {
        throw "'window' is not defined!";
    }
})();
