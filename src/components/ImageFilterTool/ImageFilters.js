export const handleBlurFilter = (ctx, image, width, height, rangeValue) => {
    ctx.filter = `blur(${rangeValue / 4}px)`;
    ctx.drawImage(image, width, height);
};

export const handleBrightnessFilter = (ctx, image, width, height, rangeValue) => {
    if (rangeValue < 0) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'black';
        ctx.globalAlpha = -rangeValue / 100;
        ctx.fillRect(0, 0, width, height);

    } else if (rangeValue > 0) {
        ctx.fillStyle = 'white';
        ctx.globalCompositeOperation = 'lighten';
        ctx.globalAlpha = 1;
        ctx.drawImage(image, 0, 0);
        ctx.globalAlpha = rangeValue / 100;
        ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
};

export const handleGrayscaleFilter = (ctx, width, height, rangeValue) => {
    if (rangeValue <= 100) {
        ctx.globalCompositeOperation = 'color';
        ctx.fillStyle = 'black';
        ctx.globalAlpha = rangeValue / 100;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
};

export const handleColorChangeFilter = (ctx, width, height, rangeValue, lineColor) => {
    if (lineColor === '#000000') {
        ctx.globalCompositeOperation = 'multiply';
    } else {
        ctx.globalCompositeOperation = 'lighten';
    }
    ctx.fillStyle = lineColor;
    ctx.globalAlpha = rangeValue / 100;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
};

export const handleSaturationFilter = (ctx, width, height, rangeValue) => {
    ctx.globalCompositeOperation = 'saturation';
    ctx.fillStyle = 'red';
    ctx.globalAlpha = rangeValue / 100;  // alpha 0 = no effect 1 = full effect
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
};

export const handleContrastFilter = (ctx, image, width, height, rangeValue) => {
    ctx.filter = `contrast(${rangeValue / 4})`;
    ctx.drawImage(image, width, height);
};