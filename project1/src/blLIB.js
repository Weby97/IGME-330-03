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

        getDistance(x1, y1, x2, y2) {
            return Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));
        },

        drawRectangle(ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") {
            ctx.save();
            ctx.fillStyle = fillStyle;
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
        },

        drawCircle(ctx, x, y, radius, fillStyle = "gray", startAngle = 0, endAngle = Math.PI * 2, anticlockwise = false) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.closePath();
            ctx.fillStyle = fillStyle;
            ctx.globalAlpha = 1;
            ctx.fill();
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
