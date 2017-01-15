/**
 * Sets the text content of an element.
 *
 * @param e Element that will have its content updated.
 * @param text Plain text to be assigned to the element.
 */
export function setText(e: HTMLElement, text: string) {

    // clear
    if (text == null) {
        if (e.hasChildNodes()) {

            // this causes serious/weird problems in IE, so DON'T DO IT!!!
            //e.innerHTML = '';

            // this works, but seems inefficient/convoluted
            //var dr = document.createRange();
            //dr.setStart(e, 0);
            //dr.setEnd(e, e.childNodes.length);
            //dr.deleteContents();

            // seems like the best option (simple and works)
            e.textContent = '';
        }
        return;
    }

    // set text
    const fc = e.firstChild;
    if (e.childNodes.length == 1 && fc.nodeType == 3) {
        if (fc.nodeValue != text) {
            fc.nodeValue = text; // update text directly in the text node
        }
    } else if (fc || text) {
        e.textContent = text; // something else, set the textContent
    }
}
