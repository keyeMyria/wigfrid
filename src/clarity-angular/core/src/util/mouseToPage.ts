import {Point} from "../common/ui/point";
import {isNumber} from "./lang/is-number";

/**
 * Converts mouse or touch event arguments into a @see:Point in page coordinates.
 */
export function mouseToPage(e: any): Point {

    // accept Point objects
    if (e instanceof Point) {
        return e;
    }

    // accept touch events
    if (e.touches && e.touches.length > 0) {
        e = e.touches[0];
    }

    // accept mouse events
    // NOTE: we should be able to use pageX/Y properties, but those may return
    // wrong values (e.g. Android with zoomed screens); so we get the client
    // coordinates and apply the page offset ourselves instead...
    if (isNumber(e.clientX) && isNumber(e.clientY)) {
        return new Point(e.clientX + pageXOffset, e.clientY + pageYOffset);
    }

    // wrong parameter type...
    throw 'Mouse or touch event expected.';
}
