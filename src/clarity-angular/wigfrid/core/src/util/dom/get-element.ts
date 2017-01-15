import {isString} from "../lang/is-string";


/**
 * Gets an element from a jQuery-style selector.
 *
 * @param selector An element, a query selector string, or a jQuery object.
 */
export function getElement(selector: any): HTMLElement {
    if (selector instanceof HTMLElement) return selector;
    if (isString(selector)) return <HTMLElement>document.querySelector(selector);
    if (selector && selector.jquery) return <HTMLElement>selector[0];
    return null;
}
