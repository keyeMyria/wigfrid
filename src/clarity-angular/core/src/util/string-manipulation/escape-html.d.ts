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
export declare function escapeHtml(text: string): string;
