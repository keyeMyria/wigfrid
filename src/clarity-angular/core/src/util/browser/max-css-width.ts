
export function maxCssWidth(){
    let maxWidth         = 1e6;
    const testUpTo = 60e6,
        div        = document.createElement('div');
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    for (let test = maxWidth; test <= testUpTo; test += 500000) {
        div.style.width = test + 'px';
        if (div.offsetWidth != test) {
            break;
        }
        maxWidth = test;
    }
    document.body.removeChild(div);
    return maxWidth;
}
