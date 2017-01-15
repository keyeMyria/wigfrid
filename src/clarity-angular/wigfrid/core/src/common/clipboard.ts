

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
export class Clipboard {

    /**
     * Copies a string to the clipboard.
     *
     * This method only works if invoked immediately after the user
     * pressed a clipboard copy command (such as ctrl+c).
     *
     * @param text Text to copy to the clipboard.
     */
    static copy(text: string) {
        Clipboard._copyPasteInternal(text);
    }
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
    static paste(callback: Function) {
        Clipboard._copyPasteInternal(callback);
    }

    // ** implementation

    private static _copyPasteInternal(textOrCallback: any) {

        // get active element to restore later
        const activeElement = <HTMLElement>document.activeElement;
                // find parent for temporary input element (so it works with jQuery dialogs...)
                let parent  = activeElement;
                for (; parent; parent = parent.parentElement) {
                    if (parent == document.body || parent.getAttribute('aria-describedby') == 'dialog') {
                        break;
                    }
                }

        // create hidden input element, append it to document
        const el = document.createElement('textarea');
        el.style.position = 'fixed';
        el.style.opacity = '0';
                parent.appendChild(el);

        // initialize text and give element the focus
        if (typeof (textOrCallback) == 'string') {
            el.value = textOrCallback;
        }
        el.select();

        // when the clipboard operation is done, remove element, restore focus
        // and invoke the paste callback
        setTimeout(function () {
            const text = el.value;
                        parent.removeChild(el);
            activeElement.focus();
            if (typeof (textOrCallback) == 'function') {
                textOrCallback(text);
            }
        }, 100); // Apple needs extra timeOut
    }
}
