import {isString} from "../lang/is-string";
/**
 * Escapes a string by replacing HTML characters as text entities.
 *
 * Strings entered by uses should always be escaped before they are displayed
 * in HTML pages. This ensures page integrity and prevents HTML/javascript
 * injection attacks.
 *
 * @param text Text to escape.
 * @return An HTML-escaped version of the original string.
 */
export function escapeHtml(text: string) {
    if (isString(text)) {
        text = text.replace(/[&<>"'\/]/g, function (s) {
            return _ENTITYMAP[s];
        });
    }
    return text;
}
const _ENTITYMAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
};
