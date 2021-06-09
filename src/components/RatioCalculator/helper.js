import $ from 'jquery';

export function isInteger(value) { return /^[0-9]+$/.test(value) };

export function solve(width, height, numerator, denominator) {
    var value;
    // solve for width
    if ('undefined' !== typeof width) {
        value = Math.round(width / (numerator / denominator));
    }
    // solve for height
    else if ('undefined' !== typeof height) {
        value = Math.round(height * (numerator / denominator));
    }
    return value;
}

export function ratio2css(numerator, denominator) {
    var width, height;
    if (+numerator > +denominator) {
        width = 200;
        height = solve(width, undefined, numerator, denominator);
    }
    else {
        height = 200;
        width = solve(undefined, height, numerator, denominator);
    }
    return {
        width: width + 'px',
        height: height + 'px',
        lineHeight: height + 'px'
    };
}

export function resizeSampleImage(selector) {
    var img, imgRatio, width, height, boxRatio;
    if (!selector) { return; }
    img = $('#visual-ratio img');
    imgRatio = img.width() / img.height();
    width = $('#visual-ratio').width();
    height = $('#visual-ratio').height();
    boxRatio = width / height;
    function cropToWidth() {
        img.css({ width: width + 'px', height: 'auto' });
        img.css({ top: 0 - Math.round((img.height() - height) / 2) + 'px', left: 0 });
    }
    function cropToHeight() {
        img.css({ width: 'auto', height: height + 'px' });
        img.css({ top: 0, left: 0 - Math.round((img.width() - width) / 2) + 'px' });
    }
    function boxToWidth() {
        img.css({ width: width + 'px', height: 'auto' });
        img.css({ top: Math.round((height - img.height()) / 2) + 'px', left: 0 });
    }
    function boxToHeight() {
        img.css({ width: 'auto', height: height + 'px' });
        img.css({ top: 0, left: Math.round((width - img.width()) / 2) + 'px' });
    }
    if ('crop' === selector) {
        if (imgRatio > boxRatio) {
            cropToHeight();
        }
        else {
            cropToWidth();
        }
    }
    else { // box
        if (imgRatio > boxRatio) {
            boxToWidth();
        }
        else {
            boxToHeight();
        }
    }
}

export function ratio(w, h) {
    if (!w || !h) return;
    function mdc(w, h) {
        let resto;
        do {
            resto = w % h;

            w = h;
            h = resto;

        } while (resto !== 0);

        return w;
    }

    let MDC = mdc(w, h);


    let width = w / MDC;
    let height = h / MDC;

    return `${width} : ${height}`
}