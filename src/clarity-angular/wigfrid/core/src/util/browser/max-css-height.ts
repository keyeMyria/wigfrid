

export function maxCssHeight(){
    let maxHeight        = 1e6;
    const testUpTo = 60e6,
        div        = document.createElement('div');
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    for (let test = maxHeight; test <= testUpTo; test += 500000) {
        div.style.height = test + 'px';
        if (div.offsetHeight != test) {
            break;
        }
        maxHeight = test;
    }
    document.body.removeChild(div);
    return maxHeight;
}
