/**
 * Modifies the style of an element by applying the properties specified in an object.
 *
 * @param e Element whose style will be modified.
 * @param css Object containing the style properties to apply to the element.
 */
export function setCss(e: HTMLElement, css: any) {
    const s = e.style;
    for (let p in css) {

        // add pixel units to numeric geometric properties
        let val = css[p];
        if (typeof (val) == 'number' &&
            p.match(/width|height|left|top|right|bottom|size|padding|margin'/i)) {
            val += 'px';
        }

        // set the attribute if it changed
        if (s[p] != val) {
            s[p] = val.toString();
        }
    }
}
