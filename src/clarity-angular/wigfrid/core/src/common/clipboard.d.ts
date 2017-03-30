/**
 * Static class that provides utility methods for clipboard operations.
 *
 * The @see:Clipboard class provides static @see:copy and @see:paste methods
 * that can be used by controls to customize the clipboard content during
 * clipboard operations.
 *
 * For example, the code below shows how a control could intercept the
 * clipboard shortcut keys and provide custom clipboard handling:
 *
 * <pre>
 * rootElement.addEventListener('keydown', function(e) {
     *   // copy: ctrl+c or ctrl+Insert
     *   if (e.ctrlKey && (e.keyCode == 67 || e.keyCode == 45)) {
     *     var text = this.getClipString();
     *     Clipboard.copy(text);
     *     return;
     *   }
     *   // paste: ctrl+v or shift+Insert
     *   if ((e.ctrlKey && e.keyCode == 86) || (e.shiftKey && e.keyCode == 45)) {
     *     Clipboard.paste(function (text) {
     *       this.setClipString(text);
     *     });
     *     return;
     *   }
     * });</pre>
 */
export declare class Clipboard {
    /**
     * Copies a string to the clipboard.
     *
     * This method only works if invoked immediately after the user
     * pressed a clipboard copy command (such as ctrl+c).
     *
     * @param text Text to copy to the clipboard.
     */
    static copy(text: string): void;
    /**
     * Gets a string from the clipboard.
     *
     * This method only works if invoked immediately after the user
     * pressed a clipboard paste command (such as ctrl+v).
     *
     * @param callback Function called when the clipboard content
     * has been retrieved. The function receives the clipboard
     * content as a parameter.
     */
    static paste(callback: Function): void;
    private static _copyPasteInternal(textOrCallback);
}
