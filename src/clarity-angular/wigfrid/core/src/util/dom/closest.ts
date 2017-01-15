/**
 * Finds the closest ancestor that satisfies a selector.
 *
 * @param e Element where the search should start.
 * @param selector A string containing a selector expression to match elements against.
 * @return The nearest ancestor that satisfies the selector (including the original element), or null if not found.
 */
export function closest(e: any, selector: string): Node {

    // simpler/faster implementation with 'matches' method
    // http://davidwalsh.name/element-matches-selector
    const matches = e ? (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector) : null;
    if (matches) {
        for (; e; e = e.parentNode) {
            if (e instanceof HTMLElement && matches.call(e, selector)) {
                return e;
            }
        }
    }

    // original implementation using querySelectorAll (no 'matches')
    //var start = e;
    //for (e = e.parentNode; e; e = e.parentNode) {
    //    var qs = e.querySelectorAll && e.querySelectorAll(selector);
    //    if (qs && qs.length) {
    //
    //        // return original element if it is a match
    //        for (var i = 0; i < qs.length; i++) {
    //            if (qs[i] == start) {
    //                return start;
    //            }
    //        }
    //
    //        // look for a match that contains the original element
    //        for (var i = 0; i < qs.length; i++) {
    //            if (contains(qs[i], start)) {
    //                return qs[i];
    //            }
    //        }
    //
    //        // not found
    //        return null;
    //    }
    //}

    // not found
    return null;
}
