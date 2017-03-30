import { Rectangle } from "../../common/ui/Rectangle";
import { CancelEventArgs } from "../../eventArgs/CancelEventArgs";
import { Event } from "../../event/Event";
/**
 * Provides a pop-up window that displays additional information about elements on the page.
 *
 * The @see:Tooltip class can be used in two modes:
 *
 * <b>Automatic Mode:</b> Use the @see:setTooltip method to connect the @see:Tooltip to
 * one or more elements on the page. The @see:Tooltip will automatically monitor events
 * and display the tooltips when the user performs actions that trigger the tooltip.
 * For example:
 *
 * <pre>var tt = new wijmo.Tooltip();
 * tt.setTooltip('#menu', 'Select commands.');
 * tt.setTooltip('#tree', 'Explore the hierarchy.');
 * tt.setTooltip('#chart', '#idChartTooltip');</pre>
 *
 * <b>Manual Mode:</b> The caller is responsible for showing and hiding the tooltip
 * using the @see:show and @see:hide methods. For example:
 *
 * <pre>var tt = new wijmo.Tooltip();
 * element.addEventListener('click', function () {
     *   if (tt.isVisible) {
     *     tt.hide();
     *   } else {
     *     tt.show(element, 'This is an important element!');
     *   }
     * });</pre>
 */
export declare class Tooltip {
    private static _eTip;
    private _toShow;
    private _toHide;
    private _showAutoTipBnd;
    private _hideAutoTipBnd;
    private _html;
    private _gap;
    private _showDelay;
    private _hideDelay;
    private _tips;
    /**
     * Initializes a new instance of a @see:Tooltip object.
     */
    constructor();
    /**
     * Assigns tooltip content to a given element on the page.
     *
     * The same tooltip may be used to display information for any number
     * of elements on the page. To remove the tooltip from an element,
     * call @see:setTooltip and specify null for the content.
     *
     * @param element Element, element ID, or control that the tooltip explains.
     * @param content Tooltip content or ID of the element that contains the tooltip content.
     */
    setTooltip(element: any, content: string): void;
    /**
     * Shows the tooltip with the specified content, next to the specified element.
     *
     * @param element Element, element ID, or control that the tooltip explains.
     * @param content Tooltip content or ID of the element that contains the tooltip content.
     * @param bounds Optional element that defines the bounds of the area that the tooltip
     * targets. If not provided, the bounds of the element are used (as reported by the
     * <b>getBoundingClientRect</b> method).
     */
    show(element: any, content: string, bounds?: Rectangle): void;
    /**
     * Hides the tooltip if it is currently visible.
     */
    hide(): void;
    /**
     * Gets whether the tooltip is currently visible.
     */
    readonly isVisible: boolean;
    /**
     * Gets or sets whether the tooltip contents should be displayed as plain text or as HTML.
     */
    isContentHtml: boolean;
    /**
     * Gets or sets the distance between the tooltip and the target element.
     */
    gap: number;
    /**
     * Gets or sets the delay, in milliseconds, before showing the tooltip after the
     * mouse enters the target element.
     */
    showDelay: number;
    /**
     * Gets or sets the delay, in milliseconds, before hiding the tooltip after the
     * mouse leaves the target element.
     */
    hideDelay: number;
    /**
     * Occurs before the tooltip content is displayed.
     *
     * The event handler may customize the tooltip content or suppress the
     * tooltip display by changing the event parameters.
     */
    popup: Event;
    /**
     * Raises the @see:popup event.
     *
     * @param e @see:TooltipEventArgs that contains the event data.
     */
    onPopup(e: TooltipEventArgs): void;
    private _indexOf(e);
    private _attach(e);
    private _detach(e);
    private _showAutoTip(evt);
    private _hideAutoTip();
    private _clearTimeouts();
    private _getContent(content);
    private _setContent(content);
}
/**
 * Provides arguments for the @see:popup event.
 */
export declare class TooltipEventArgs extends CancelEventArgs {
    private _content;
    /**
     * Initializes a new instance of a @see:TooltipEventArgs.
     *
     * @param content String to show in the tooltip.
     */
    constructor(content: string);
    /**
     * Gets or sets the content to show in the tooltip.
     *
     * This parameter can be used while handling the @see:popup event to modify the content
     * of the tooltip.
     */
    content: string;
}
